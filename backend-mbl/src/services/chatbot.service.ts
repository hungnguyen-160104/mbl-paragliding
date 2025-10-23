import { ensureEmbeddings, getEmbedding, readFaq } from "./embeddings.service";
import { ChatAnswer } from "../types/chatbot";
import { bestMatch } from "../utils/similarity";
import { normalizeTextVN } from "../utils/text";
import { fuzzyRatio } from "../utils/fuzzy";

const DEFAULT_THRESHOLD = parseFloat(process.env.CHATBOT_MATCH_THRESHOLD ?? "0.45");
const FUZZY_THRESHOLD = 0.50;

// 👇 cờ tắt/bật embeddings (mặc định bật)
const USE_EMBEDDINGS =
  (process.env.USE_EMBEDDINGS ?? "true").toLowerCase() !== "false";

function tokenize(s: string) {
  return normalizeTextVN(s)
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(" ")
    .filter(Boolean);
}
function keywordScore(qTokens: string[], candTokens: string[]) {
  const qSet = new Set(qTokens);
  const cSet = new Set(candTokens);
  const inter = [...qSet].filter((w) => cSet.has(w)).length;
  const uni = new Set([...qSet, ...cSet]).size;
  return uni === 0 ? 0 : inter / uni;
}

export async function answerFromFaq(userQuestion: string): Promise<ChatAnswer> {
  const normalized = normalizeTextVN(userQuestion);
  const tokensQ = tokenize(normalized);
  const faq = await readFaq();

  // 1) RULE-BASED: alias + keyword
  let bestAliasIdx = -1, bestAliasScore = -1;
  for (let i = 0; i < faq.length; i++) {
    const qa = faq[i];

    if (qa.aliases && qa.aliases.length) {
      for (const a of qa.aliases) {
        const an = normalizeTextVN(a);
        if (an === normalized || an.includes(normalized) || normalized.includes(an)) {
          return { answer: qa.answer, matchedQuestion: qa.question, score: 1 };
        }
      }
    }

    const scoreKW = keywordScore(tokensQ, tokenize(qa.question));
    if (scoreKW > bestAliasScore) { bestAliasScore = scoreKW; bestAliasIdx = i; }
  }
  if (bestAliasIdx >= 0 && bestAliasScore >= 0.55) {
    const qa = faq[bestAliasIdx];
    return { answer: qa.answer, matchedQuestion: qa.question, score: bestAliasScore };
  }

  // 2) EMBEDDINGS (chỉ chạy nếu bật)
  if (USE_EMBEDDINGS) {
    try {
      const [cache, vector] = await Promise.all([
        ensureEmbeddings(),
        getEmbedding(normalized),
      ]);
      const { index, score } = bestMatch(vector, cache.items);
      const matched = index >= 0 ? faq.find(q => q.id === cache.items[index].id) : null;

      if (index >= 0 && score! >= DEFAULT_THRESHOLD && matched) {
        return { answer: matched.answer, matchedQuestion: matched.question, score };
      }
    } catch (e) {
      console.warn("[chatbot] embeddings skipped:", (e as Error).message);
      // rơi xuống fuzzy
    }
  }

  // 3) FUZZY fallback
  let bestF = -1, bestIdx = -1;
  faq.forEach((qa, i) => {
    const r = fuzzyRatio(normalized, qa.question);
    if (r > bestF) { bestF = r; bestIdx = i; }
  });
  if (bestF >= FUZZY_THRESHOLD) {
    const qa = faq[bestIdx];
    return { answer: qa.answer, matchedQuestion: qa.question, score: bestF };
  }

  // 4) Fallback cuối
  return {
    answer:
      "Xin lỗi, tôi chưa có thông tin cho câu hỏi này. Vui lòng để lại số điện thoại/email, hoặc xem mục Liên hệ/FAQ để được hỗ trợ nhanh.",
    matchedQuestion: null,
    score: null,
  };
}

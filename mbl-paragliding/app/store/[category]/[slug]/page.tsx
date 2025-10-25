// mbl-paragliding/app/store/[slug]/page.tsx
import { getProductBySlug } from "@/lib/product-api";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const p = await getProductBySlug(params.slug).catch(() => null);
  return {
    title: p ? `${p.title} | Mebayluon Store` : "Sản phẩm | Mebayluon Store",
    description: p?.content?.slice(0, 150) ?? "",
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  return (
    <main
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url(/hinh-nen.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4 max-w-3xl bg-white/15 backdrop-blur-xl rounded-3xl border border-white/20 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {product.title}
          </h1>

          {typeof product.price === "number" && (
            <p className="text-xl font-semibold text-slate-100 mb-6">
              Giá:{" "}
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </p>
          )}

          {/* content HTML */}
          <article
            className="prose prose-invert prose-img:rounded-xl max-w-none"
            dangerouslySetInnerHTML={{ __html: product.content }}
          />

          <div className="mt-8">
            <Link
              href="/#contact"
              className={buttonVariants({
                size: "lg",
                className:
                  "bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto",
              })}
            >
              Liên hệ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

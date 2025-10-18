export interface Pilot {
  slug: string
  name: string
  nickname?: string
  role: string
  experience: string
  flights: string
  hours?: string
  phone: string
  avatar: string
  hero: string
  gallery: string[]
  specialties: string[]
  certificates: string[]
  bio: {
    vi: string
    en: string
    fr: string
    ru: string
  }
  funFacts: {
    vi: string[]
    en: string[]
    fr: string[]
    ru: string[]
  }
  achievements: {
    vi: string[]
    en: string[]
    fr: string[]
    ru: string[]
  }
  flyingStyle: {
    vi: string
    en: string
    fr: string
    ru: string
  }
}

export const pilots: Pilot[] = [
  {
    slug: "judy",
    name: "Judy (Yu Pi)",
    nickname: "Queen of Dù lượn Sapa",
    role: "Quản lý & Điều hành",
    experience: "Nhiều năm",
    flights: "Hàng nghìn chuyến",
    phone: "0386887489",
    avatar: "/pilots/judy.png",
    hero: "/pilots/flying-1.jpeg",
    gallery: ["/pilots/judy.png", "/pilots/flying-1.jpeg", "/pilots/couple.png"],
    specialties: ["Quản lý điểm bay Sapa", "Chăm sóc khách hàng", "Điều hành tour"],
    certificates: ["Training bởi phi công Mỹ", "Quản lý chuyên nghiệp"],
    bio: {
      vi: "Nữ hoàng của Dù lượn Sapa - người phụ nữ quyền lực đứng sau mọi chuyến bay tuyệt vời tại Sapa. Được đào tạo bởi phi công Mỹ, Judy không chỉ quản lý mà còn là linh hồn của đội bay.",
      en: "Queen of Sapa Paragliding - the powerful woman behind every amazing flight in Sapa. Trained by American pilots, Judy is not just a manager but the soul of the flying team.",
      fr: "Reine du parapente de Sapa - la femme puissante derrière chaque vol incroyable à Sapa. Formée par des pilotes américains, Judy n'est pas seulement une gestionnaire mais l'âme de l'équipe de vol.",
      ru: "Королева парапланеризма Сапы - влиятельная женщина за каждым удивительным полетом в Сапе. Обученная американскими пилотами, Джуди не просто менеджер, а душа летной команды.",
    },
    funFacts: {
      vi: [
        "Anh - Việt switch mượt như gió lướt cánh dù",
        "Có thể xử lý 10 cuộc gọi cùng lúc mà vẫn cười tươi",
        "Biết tên tất cả khách hàng từng bay - kể cả từ 5 năm trước",
        "Hotline/Zalo/WhatsApp: 0386.887.489",
      ],
      en: [
        "Switches between English and Vietnamese as smoothly as wind under a paraglider",
        "Can handle 10 calls at once while still smiling",
        "Remembers every customer's name - even from 5 years ago",
        "Hotline/Zalo/WhatsApp: 0386.887.489",
      ],
      fr: [
        "Passe de l'anglais au vietnamien aussi facilement que le vent sous un parapente",
        "Peut gérer 10 appels à la fois tout en souriant",
        "Se souvient du nom de chaque client - même d'il y a 5 ans",
        "Hotline/Zalo/WhatsApp: 0386.887.489",
      ],
      ru: [
        "Переключается между английским и вьетнамским так же плавно, как ветер под парапланом",
        "Может обрабатывать 10 звонков одновременно, продолжая улыбаться",
        "Помнит имя каждого клиента - даже 5-летней давности",
        "Горячая линия/Zalo/WhatsApp: 0386.887.489",
      ],
    },
    achievements: {
      vi: [
        "Quản lý & điều hành điểm bay Sapa",
        "Chăm sóc khách hàng tận răng",
        "Nữ phi công được training bởi phi công Mỹ",
      ],
      en: ["Manages & operates Sapa flying site", "Dedicated customer care", "Female pilot trained by American pilots"],
      fr: [
        "Gère et exploite le site de vol de Sapa",
        "Service client dévoué",
        "Pilote féminine formée par des pilotes américains",
      ],
      ru: [
        "Управляет и эксплуатирует площадку для полетов в Сапе",
        "Преданное обслуживание клиентов",
        "Женщина-пилот, обученная американскими пилотами",
      ],
    },
    flyingStyle: {
      vi: "Không bay nhưng đảm bảo mọi chuyến bay của bạn đều hoàn hảo!",
      en: "Doesn't fly but ensures every flight of yours is perfect!",
      fr: "Ne vole pas mais s'assure que chaque vol est parfait!",
      ru: "Не летает, но гарантирует, что каждый ваш полет будет идеальным!",
    },
  },
  {
    slug: "dang-van-my",
    name: "Đặng Văn Mỹ",
    nickname: "Bí danh: Giáo Sư Mỹ",
    role: "Phi công / Huấn luyện viên",
    experience: "10 năm",
    flights: "5000 đơn + 4000 đôi",
    hours: "2000+ giờ bay",
    phone: "0964073555",
    avatar: "/pilots/dang-van-my.png",
    hero: "/pilots/dang-van-my.png",
    gallery: ["/pilots/dang-van-my.png", "/pilots/flying-1.jpeg", "/pilots/team.png"],
    specialties: ["Bay đường trường", "Huấn luyện", "Ảnh/Video chất lượng cao"],
    certificates: ["IPPI 5", "Tandem Pilot", "Instructor", "SIV"],
    bio: {
      vi: "Phi công dù lượn chuyên nghiệp với 10 năm kinh nghiệm bay dù, hoạt động chuyên nghiệp 7 năm với hơn 2000 giờ bay. Hiện đang là phi công có số giờ bay nhiều nhất Việt Nam.",
      en: "Professional paragliding pilot with 10 years of paragliding experience, 7 years of professional activity with over 2000 flight hours. Currently the pilot with the most flight hours in Vietnam.",
      fr: "Pilote de parapente professionnel avec 10 ans d'expérience en parapente, 7 ans d'activité professionnelle avec plus de 2000 heures de vol. Actuellement le pilote avec le plus d'heures de vol au Vietnam.",
      ru: "Профессиональный пилот парапланеризма с 10-летним опытом парапланеризма, 7 лет профессиональной деятельности с более чем 2000 часами полета. В настоящее время пилот с наибольшим количеством часов полета во Вьетнаме.",
    },
    funFacts: {
      vi: [
        "Dịch hơn 1000 trang sách về dù lượn - nên được gọi là 'Giáo Sư'",
        "Có thể bay 100km tam giác khép kín ở Tây Nguyên",
        "Ảnh/video của anh đẹp đến mức khách cứ tưởng photoshop",
        "Đảm bảo hình ảnh và video màn nhận slogon: 'Cảm giác mạnh miễn phí, view triệu đô thì có tính tiền'",
      ],
      en: [
        "Translated over 1000 pages of paragliding books - hence called 'Professor'",
        "Can fly 100km closed triangle in Central Highlands",
        "His photos/videos are so beautiful customers think they're photoshopped",
        "Guarantees quality images and videos with slogan: 'Free adrenaline, million-dollar views cost extra'",
      ],
      fr: [
        "A traduit plus de 1000 pages de livres sur le parapente - d'où le surnom de 'Professeur'",
        "Peut voler 100 km en triangle fermé dans les Hauts Plateaux du Centre",
        "Ses photos/vidéos sont si belles que les clients pensent qu'elles sont retouchées",
        "Garantit des images et vidéos de qualité avec le slogan: 'Adrénaline gratuite, vues à un million de dollars en supplément'",
      ],
      ru: [
        "Перевел более 1000 страниц книг о парапланеризме - отсюда прозвище 'Профессор'",
        "Может пролететь 100 км замкнутым треугольником в Центральном нагорье",
        "Его фото/видео настолько красивы, что клиенты думают, что они отфотошоплены",
        "Гарантирует качественные изображения и видео со слоганом: 'Адреналин бесплатно, виды на миллион долларов стоят дополнительно'",
      ],
    },
    achievements: {
      vi: [
        "Kỷ lục số 1 VN bay đường trường tam giác khép kín 100km tại Tây Nguyên",
        "Khoảng 5000 chuyến bay đơn và đôi với hơn 4000 chuyến bay đôi an toàn",
        "Chuyên tổ chức các giải thi đấu dù lượn và sự kiện du lượng",
        "Dịch giả 03 đầu sách lớn nhất về dù lượn hiện nay với hơn 1000 trang sách về dù lượn",
      ],
      en: [
        "Vietnam record #1 for 100km closed triangle cross-country flight in Central Highlands",
        "About 5000 solo and tandem flights with over 4000 safe tandem flights",
        "Specializes in organizing paragliding competitions and tourism events",
        "Translator of the 3 largest paragliding books with over 1000 pages",
      ],
      fr: [
        "Record du Vietnam #1 pour un vol de cross-country en triangle fermé de 100 km dans les Hauts Plateaux du Centre",
        "Environ 5000 vols solo et en tandem avec plus de 4000 vols en tandem en toute sécurité",
        "Spécialisé dans l'organisation de compétitions de parapente et d'événements touristiques",
        "Traducteur des 3 plus grands livres de parapente avec plus de 1000 pages",
      ],
      ru: [
        "Рекорд Вьетнама №1 по полету по пересеченной местности замкнутым треугольником 100 км в Центральном нагорье",
        "Около 5000 одиночных и тандемных полетов с более чем 4000 безопасными тандемными полетами",
        "Специализируется на организации соревнований по парапланеризму и туристических мероприятий",
        "Переводчик 3 крупнейших книг по парапланеризму с более чем 1000 страницами",
      ],
    },
    flyingStyle: {
      vi: "Chất lượng chuyến bay: Đảm bảo hình ảnh và video màn nhận. Cảm giác mạnh miễn phí, view triệu đô thì có tính tiền.",
      en: "Flight quality: Guaranteed stunning images and videos. Free adrenaline, million-dollar views cost extra.",
      fr: "Qualité de vol: Images et vidéos époustouflantes garanties. Adrénaline gratuite, vues à un million de dollars en supplément.",
      ru: "Качество полета: Гарантированные потрясающие изображения и видео. Адреналин бесплатно, виды на миллион долларов стоят дополнительно.",
    },
  },
  {
    slug: "nguyen-minh-trung",
    name: "Nguyễn Minh Trung",
    role: "Phi công dù lượn",
    experience: "7 năm",
    flights: "2000+ chuyến đôi",
    hours: "1000+ giờ bay",
    phone: "0964073555",
    avatar: "/pilots/nguyen-minh-trung.png",
    hero: "/pilots/nguyen-minh-trung.png",
    gallery: ["/pilots/nguyen-minh-trung.png", "/pilots/flying-1.jpeg", "/pilots/team.png"],
    specialties: ["Bay đẹp như sao vàng", "Video triệu view", "Chuyên nghiệp"],
    certificates: ["IPPI 4", "Tandem Pilot", "SIV"],
    bio: {
      vi: "Phi công chuyên nghiệp với hơn 2000 những chuyến bay đôi du lượng với 7 năm kinh nghiệm và hơn 1000 giờ bay. Tốt nghiệp khoa học an toàn bay tại Nepal.",
      en: "Professional pilot with over 2000 tandem tourism flights with 7 years of experience and over 1000 flight hours. Graduated in flight safety science in Nepal.",
      fr: "Pilote professionnel avec plus de 2000 vols touristiques en tandem avec 7 ans d'expérience et plus de 1000 heures de vol. Diplômé en sciences de la sécurité aérienne au Népal.",
      ru: "Профессиональный пилот с более чем 2000 тандемными туристическими полетами с 7-летним опытом и более 1000 часами полета. Окончил курс по науке о безопасности полетов в Непале.",
    },
    funFacts: {
      vi: [
        "Phi công chuyên nghiệp, nhưng vẫn bị mẹ gọi về ăn cơm",
        "Hình ảnh và video chất lượng cùng chiếc dù cỡ đỏ sao vàng",
        "Bay cùng anh sẽ được nghe anh chém gió, clip triệu view top top",
      ],
      en: [
        "Professional pilot, but still gets called home by mom for dinner",
        "Quality images and videos with the red and yellow star parachute",
        "Flying with him you'll hear his stories, clips with millions of views",
      ],
      fr: [
        "Pilote professionnel, mais toujours appelé à la maison par maman pour dîner",
        "Images et vidéos de qualité avec le parachute rouge et étoile jaune",
        "Voler avec lui vous entendrez ses histoires, clips avec des millions de vues",
      ],
      ru: [
        "Профессиональный пилот, но все еще мама зовет домой на ужин",
        "Качественные изображения и видео с красным парашютом с желтой звездой",
        "Летая с ним, вы услышите его истории, клипы с миллионами просмотров",
      ],
    },
    achievements: {
      vi: [
        "Hơn 2000 những chuyến bay đôi du lượng với 7 năm kinh nghiệm và hơn 1000 giờ bay",
        "Tốt nghiệp khoa học an toàn bay tại Nepal",
        "Giải 2 XC Fun class",
        "Putaleng XC Open 2022",
      ],
      en: [
        "Over 2000 tandem tourism flights with 7 years of experience and over 1000 flight hours",
        "Graduated in flight safety science in Nepal",
        "2nd place XC Fun class",
        "Putaleng XC Open 2022",
      ],
      fr: [
        "Plus de 2000 vols touristiques en tandem avec 7 ans d'expérience et plus de 1000 heures de vol",
        "Diplômé en sciences de la sécurité aérienne au Népal",
        "2e place XC Fun class",
        "Putaleng XC Open 2022",
      ],
      ru: [
        "Более 2000 тандемных туристических полетов с 7-летним опытом и более 1000 часами полета",
        "Окончил курс по науке о безопасности полетов в Непале",
        "2-е место XC Fun class",
        "Putaleng XC Open 2022",
      ],
    },
    flyingStyle: {
      vi: "Hình ảnh và video chất lượng cùng chiếc dù cỡ đỏ sao vàng. Bay cùng anh sẽ được nghe anh chém gió, clip triệu view top top.",
      en: "Quality images and videos with the red and yellow star parachute. Flying with him you'll hear his stories, clips with millions of views.",
      fr: "Images et vidéos de qualité avec le parachute rouge et étoile jaune. Voler avec lui vous entendrez ses histoires, clips avec des millions de vues.",
      ru: "Качественные изображения и видео с красным парашютом с желтой звездой. Летая с ним, вы услышите его истории, клипы с миллионами просмотров.",
    },
  },
  {
    slug: "vu-chien-thang",
    name: "Vũ Chiến Thắng",
    nickname: "Bí danh: Thắng Béo",
    role: "Phi công dù lượn",
    experience: "7+ năm",
    flights: "1500+ chuyến đôi",
    hours: "1000+ giờ bay",
    phone: "0964073555",
    avatar: "/pilots/vu-chien-thang.png",
    hero: "/pilots/vu-chien-thang.png",
    gallery: ["/pilots/vu-chien-thang.png", "/pilots/team.png", "/pilots/flying-1.jpeg"],
    specialties: ["Bay êm ái nhẹ nhàng", "Ảnh đẹp", "An toàn tuyệt đối"],
    certificates: ["IPPI 4", "Tandem Pilot", "SIV"],
    bio: {
      vi: "Phi công dù lượn trẻ tuổi với hơn 7 năm trở thành phi công dù lượng và dù động cơ. Tham gia các giải thi đấu trên khắp cả nước.",
      en: "Young paragliding pilot with over 7 years as a paragliding and powered paragliding pilot. Participates in competitions across the country.",
      fr: "Jeune pilote de parapente avec plus de 7 ans en tant que pilote de parapente et de parapente motorisé. Participe à des compétitions dans tout le pays.",
      ru: "Молодой пилот парапланеризма с более чем 7-летним опытом работы пилотом парапланеризма и моторного парапланеризма. Участвует в соревнованиях по всей стране.",
    },
    funFacts: {
      vi: [
        "Tên 'Thắng Béo' nhưng bay nhẹ như lông hồng",
        "Có thể kéo dài chuyến bay 9 tiếng rưỡi - kỷ lục #2 Việt Nam",
        "Ảnh đẹp, video mượt, khách nào cũng muốn bay lại lần 2",
        "Một chuyến bay êm ái nhẹ nhàng",
      ],
      en: [
        "Named 'Fat Thang' but flies as light as a feather",
        "Can extend flights to 9.5 hours - Vietnam record #2",
        "Beautiful photos, smooth videos, every customer wants to fly again",
        "A smooth and gentle flight",
      ],
      fr: [
        "Surnommé 'Gros Thang' mais vole aussi léger qu'une plume",
        "Peut prolonger les vols jusqu'à 9,5 heures - record du Vietnam #2",
        "Belles photos, vidéos fluides, chaque client veut voler à nouveau",
        "Un vol doux et agréable",
      ],
      ru: [
        "Прозвище 'Толстый Тханг', но летает легко, как перышко",
        "Может продлить полеты до 9,5 часов - рекорд Вьетнама №2",
        "Красивые фотографии, плавные видео, каждый клиент хочет полететь снова",
        "Плавный и нежный полет",
      ],
    },
    achievements: {
      vi: [
        "Hơn 7 năm trở thành phi công dù lượng và dù động cơ",
        "Hơn 1500 chuyến bay đôi du lượng, gần 1000 giờ bay an toàn",
        "Tham gia các giải thi đấu trên khắp cả nước",
        "Đạt kỷ lục bay đơn lâu thứ 2 Việt Nam - 9 tiếng rưỡi",
      ],
      en: [
        "Over 7 years as a paragliding and powered paragliding pilot",
        "Over 1500 tandem tourism flights, nearly 1000 safe flight hours",
        "Participates in competitions across the country",
        "Achieved Vietnam's 2nd longest solo flight record - 9.5 hours",
      ],
      fr: [
        "Plus de 7 ans en tant que pilote de parapente et de parapente motorisé",
        "Plus de 1500 vols touristiques en tandem, près de 1000 heures de vol en toute sécurité",
        "Participe à des compétitions dans tout le pays",
        "A réalisé le 2e record de vol solo le plus long du Vietnam - 9,5 heures",
      ],
      ru: [
        "Более 7 лет в качестве пилота парапланеризма и моторного парапланеризма",
        "Более 1500 тандемных туристических полетов, почти 1000 часов безопасного полета",
        "Участвует в соревнованиях по всей стране",
        "Достиг 2-го рекорда Вьетнама по самому длинному одиночному полету - 9,5 часов",
      ],
    },
    flyingStyle: {
      vi: "Hình ảnh và video chất lượng cùng phi công trẻ. Giữ vững phong độ và an toàn bay.",
      en: "Quality images and videos with a young pilot. Maintains performance and flight safety.",
      fr: "Images et vidéos de qualité avec un jeune pilote. Maintient les performances et la sécurité du vol.",
      ru: "Качественные изображения и видео с молодым пилотом. Поддерживает производительность и безопасность полета.",
    },
  },
  {
    slug: "ngo-van-doi",
    name: "Ngô Văn Đội",
    role: "Phi công dù lượn",
    experience: "5+ năm",
    flights: "500+ đơn + đôi",
    hours: "300+ giờ bay",
    phone: "0964073555",
    avatar: "/pilots/ngo-doi.png",
    hero: "/pilots/ngo-doi.png",
    gallery: ["/pilots/ngo-doi.png", "/pilots/flying-1.jpeg", "/pilots/team.png"],
    specialties: ["Cảm giác mạnh", "Video đẹp", "Vui vẻ hài hước"],
    certificates: ["IPPI 3", "Tandem Pilot"],
    bio: {
      vi: "Phi công trẻ năng động với hơn 5 năm kinh nghiệm bay đơn và hơn 300 giờ bay. Tốt nghiệp khoa học an toàn bay chuẩn quốc tế được tổ chức bởi Mebayluon Paragliding.",
      en: "Dynamic young pilot with over 5 years of solo flying experience and over 300 flight hours. Graduated from international standard flight safety science organized by Mebayluon Paragliding.",
      fr: "Jeune pilote dynamique avec plus de 5 ans d'expérience de vol solo et plus de 300 heures de vol. Diplômé en sciences de la sécurité aérienne aux normes internationales organisé par Mebayluon Paragliding.",
      ru: "Динамичный молодой пилот с более чем 5-летним опытом одиночных полетов и более 300 часами полета. Окончил курс по науке о безопасности полетов международного стандарта, организованный Mebayluon Paragliding.",
    },
    funFacts: {
      vi: [
        "Phi công trẻ... điểm yếu: chưa có người yêu 😄",
        "Bay 7 tiếng liên tục tại Đồi Bù - kỷ lục tại điểm bay Chương Mỹ",
        "Hình ảnh và video chất lượng cùng phi công trẻ",
        "Một vài cảm giác mạnh không kém phần hồi hộp, gây cấn nếu bạn yêu cầu",
      ],
      en: [
        "Young pilot... weakness: no girlfriend yet 😄",
        "Flew 7 hours continuously at Doi Bu - record at Chuong My flying site",
        "Quality images and videos with a young pilot",
        "Some strong sensations no less thrilling if you request",
      ],
      fr: [
        "Jeune pilote... faiblesse: pas encore de petite amie 😄",
        "A volé 7 heures en continu à Doi Bu - record au site de vol de Chuong My",
        "Images et vidéos de qualité avec un jeune pilote",
        "Quelques sensations fortes tout aussi palpitantes si vous le demandez",
      ],
      ru: [
        "Молодой пилот... слабость: еще нет девушки 😄",
        "Летал 7 часов подряд в Дой Бу - рекорд на площадке для полетов Чыонг Ми",
        "Качественные изображения и видео с молодым пилотом",
        "Некоторые сильные ощущения не менее захватывающие, если вы попросите",
      ],
    },
    achievements: {
      vi: [
        "Hơn 500 chuyến bay đơn + đôi du lượng",
        "5 năm kinh nghiệm bay đơn và hơn 300 giờ bay",
        "Tham gia các giải thi đấu trên khắp cả nước",
        "Kỷ lục bay 7 tiếng tại điểm bay Chương Mỹ - Đồi Bù",
      ],
      en: [
        "Over 500 solo + tandem tourism flights",
        "5 years of solo flying experience and over 300 flight hours",
        "Participates in competitions across the country",
        "Record of 7-hour flight at Chuong My - Doi Bu flying site",
      ],
      fr: [
        "Plus de 500 vols touristiques solo + tandem",
        "5 ans d'expérience de vol solo et plus de 300 heures de vol",
        "Participe à des compétitions dans tout le pays",
        "Record de vol de 7 heures au site de vol de Chuong My - Doi Bu",
      ],
      ru: [
        "Более 500 одиночных + тандемных туристических полетов",
        "5 лет опыта одиночных полетов и более 300 часов полета",
        "Участвует в соревнованиях по всей стране",
        "Рекорд 7-часового полета на площадке для полетов Чыонг Ми - Дой Бу",
      ],
    },
    flyingStyle: {
      vi: "Hình ảnh và video chất lượng cùng phi công trẻ. Một vài cảm giác mạnh không kém phần hồi hộp, gây cấn nếu bạn yêu cầu. Có thể kéo dài chuyến bay với điều kiện cho phép.",
      en: "Quality images and videos with a young pilot. Some strong sensations no less thrilling if you request. Can extend flight with conditions permitting.",
      fr: "Images et vidéos de qualité avec un jeune pilote. Quelques sensations fortes tout aussi palpitantes si vous le demandez. Peut prolonger le vol si les conditions le permettent.",
      ru: "Качественные изображения и видео с молодым пилотом. Некоторые сильные ощущения не менее захватывающие, если вы попросите. Может продлить полет при благоприятных условиях.",
    },
  },
  {
    slug: "vo-hoang-minh",
    name: "Võ Hoàng Minh",
    role: "Phi công dù lượn",
    experience: "14 năm",
    flights: "2000+ chuyến đôi",
    hours: "1000+ giờ bay",
    phone: "0964073555",
    avatar: "/pilots/minh-vo.png",
    hero: "/pilots/minh-vo.png",
    gallery: ["/pilots/minh-vo.png", "/pilots/flying-2.jpeg", "/pilots/team.png"],
    specialties: ["Bay ngon hơn người yêu cũ", "Video vài rõ tốp tốp"],
    certificates: ["IPPI 5", "Tandem Pilot", "Instructor"],
    bio: {
      vi: "Phi công dày dặn kinh nghiệm với 14 năm bay dù lượn, gần 2000 chuyến bay đôi an toàn và hơn 1000 giờ bay an toàn. Top 5 phi công đôi đầu tại Việt Nam.",
      en: "Experienced pilot with 14 years of paragliding, nearly 2000 safe tandem flights and over 1000 safe flight hours. Top 5 tandem pilots in Vietnam.",
      fr: "Pilote expérimenté avec 14 ans de parapente, près de 2000 vols en tandem en toute sécurité et plus de 1000 heures de vol en toute sécurité. Top 5 des pilotes en tandem au Vietnam.",
      ru: "Опытный пилот с 14-летним опытом парапланеризма, почти 2000 безопасных тандемных полетов и более 1000 часов безопасного полета. Топ-5 тандемных пилотов во Вьетнаме.",
    },
    funFacts: {
      vi: [
        "Slogan: 'Bay ngon hơn người yêu cũ của bạn'",
        "Chất giọng miền nam nhẹ nhàng và êm tai anh sẽ tạo cho bạn nhiều câu chuyện thú vị, bất ngờ sẽ không lường trước được",
        "Bay cùng anh đảm bảo bạn sẽ có video vài rõ tốp tốp",
      ],
      en: [
        "Slogan: 'Flies better than your ex'",
        "Gentle southern accent and smooth voice will create many interesting stories for you, unexpected surprises you won't anticipate",
        "Flying with him guarantees you'll have super clear videos",
      ],
      fr: [
        "Slogan: 'Vole mieux que votre ex'",
        "Accent du sud doux et voix douce créeront de nombreuses histoires intéressantes pour vous, des surprises inattendues que vous n'anticipez pas",
        "Voler avec lui vous garantit des vidéos super claires",
      ],
      ru: [
        "Слоган: 'Летает лучше, чем ваш бывший'",
        "Мягкий южный акцент и плавный голос создадут для вас много интересных историй, неожиданные сюрпризы, которые вы не ожидаете",
        "Полет с ним гарантирует вам супер четкие видео",
      ],
    },
    achievements: {
      vi: [
        "Kinh nghiệm bay dù lượng 14 năm, gần 2000 chuyến bay đôi an toàn và hơn 1000 giờ bay an toàn",
        "Top 5 phi công đôi đầu tại Việt Nam",
        "Lớn lên trong gia đình có truyền thống về thể thao cùng nhiều kinh nghiệm đào tạo học viên bay dù",
        "Giải nhất đồng đội về Hạ Cánh Chính Xác tại MCC 2023",
      ],
      en: [
        "14 years of paragliding experience, nearly 2000 safe tandem flights and over 1000 safe flight hours",
        "Top 5 tandem pilots in Vietnam",
        "Grew up in a family with sports tradition and extensive experience training paragliding students",
        "First place team in Precision Landing at MCC 2023",
      ],
      fr: [
        "14 ans d'expérience en parapente, près de 2000 vols en tandem en toute sécurité et plus de 1000 heures de vol en toute sécurité",
        "Top 5 des pilotes en tandem au Vietnam",
        "A grandi dans une famille avec une tradition sportive et une vaste expérience dans la formation d'étudiants en parapente",
        "Première place en équipe en atterrissage de précision au MCC 2023",
      ],
      ru: [
        "14 лет опыта парапланеризма, почти 2000 безопасных тандемных полетов и более 1000 часов безопасного полета",
        "Топ-5 тандемных пилотов во Вьетнаме",
        "Вырос в семье со спортивными традициями и обширным опытом обучения студентов парапланеризму",
        "Первое место в команде по точной посадке на MCC 2023",
      ],
    },
    flyingStyle: {
      vi: "Slogan: 'Bay ngon hơn người yêu cũ của bạn.' Chất giọng miền nam nhẹ nhàng và êm tai anh sẽ tạo cho bạn nhiều câu chuyện thú vị, bất ngờ sẽ không lường trước được. Bay cùng anh đảm bảo bạn sẽ có video vài rõ tốp tốp.",
      en: "Slogan: 'Flies better than your ex.' Gentle southern accent and smooth voice will create many interesting stories for you, unexpected surprises you won't anticipate. Flying with him guarantees super clear videos.",
      fr: "Slogan: 'Vole mieux que votre ex.' Accent du sud doux et voix douce créeront de nombreuses histoires intéressantes pour vous, des surprises inattendues que vous n'anticipez pas. Voler avec lui garantit des vidéos super claires.",
      ru: "Слоган: 'Летает лучше, чем ваш бывший.' Мягкий южный акцент и плавный голос создадут для вас много интересных историй, неожиданные сюрпризы, которые вы не ожидаете. Полет с ним гарантирует супер четкие видео.",
    },
  },
  {
    slug: "nguyen-van-tien-toan",
    name: "Nguyễn Văn Tiến Toàn",
    role: "Phi công dù lượn",
    experience: "10+ năm",
    flights: "5000+ đơn",
    hours: "1000+ giờ bay",
    phone: "0964073555",
    avatar: "/pilots/nguyen-van-tien-toan.png",
    hero: "/pilots/nguyen-van-tien-toan.png",
    gallery: ["/pilots/nguyen-van-tien-toan.png", "/pilots/flying-1.jpeg", "/pilots/team.png"],
    specialties: ["Bay êm ái nhẹ nhàng", "Ảnh đẹp", "An toàn tuyệt đối"],
    certificates: ["IPPI 4", "Tandem Pilot"],
    bio: {
      vi: "Phi công dù lượn với hơn 10 năm trở thành phi công dù lượn. Gần 5000 chuyến bay đơn, đôi du lượng, gần 1000 giờ bay an toàn.",
      en: "Paragliding pilot with over 10 years as a paragliding pilot. Nearly 5000 solo and tandem tourism flights, nearly 1000 safe flight hours.",
      fr: "Pilote de parapente avec plus de 10 ans en tant que pilote de parapente. Près de 5000 vols touristiques solo et en tandem, près de 1000 heures de vol en toute sécurité.",
      ru: "Пилот парапланеризма с более чем 10-летним опытом работы пилотом парапланеризма. Почти 5000 одиночных и тандемных туристических полетов, почти 1000 часов безопасного полета.",
    },
    funFacts: {
      vi: [
        "Một chuyến bay êm ái nhẹ nhàng",
        "Hình ảnh và video đẹp sau chuyến bay",
        "Giữ vững phong độ và an toàn bay",
        "Có thể kéo dài chuyến bay với điều kiện cho phép",
      ],
      en: [
        "A smooth and gentle flight",
        "Beautiful images and videos after the flight",
        "Maintains performance and flight safety",
        "Can extend flight with conditions permitting",
      ],
      fr: [
        "Un vol doux et agréable",
        "Belles images et vidéos après le vol",
        "Maintient les performances et la sécurité du vol",
        "Peut prolonger le vol si les conditions le permettent",
      ],
      ru: [
        "Плавный и нежный полет",
        "Красивые изображения и видео после полета",
        "Поддерживает производительность и безопасность полета",
        "Может продлить полет при благоприятных условиях",
      ],
    },
    achievements: {
      vi: [
        "Hơn 10 năm trở thành phi công dù lượn",
        "Gần 5000 chuyến bay đơn, đôi du lượng, gần 1000 giờ bay an toàn",
        "Tham gia các giải thi đấu trên khắp cả nước: Kon Tum, Dak nông, Nha Trang, Lý Sơn, Điện Biên Phủ",
        "Đoạt giải vô địch dù lượng năm 2022, và giải nhì hạ cánh chính xác",
      ],
      en: [
        "Over 10 years as a paragliding pilot",
        "Nearly 5000 solo and tandem tourism flights, nearly 1000 safe flight hours",
        "Participated in competitions across the country: Kon Tum, Dak Nong, Nha Trang, Ly Son, Dien Bien Phu",
        "Won paragliding championship 2022, and second place in precision landing",
      ],
      fr: [
        "Plus de 10 ans en tant que pilote de parapente",
        "Près de 5000 vols touristiques solo et en tandem, près de 1000 heures de vol en toute sécurité",
        "A participé à des compétitions dans tout le pays: Kon Tum, Dak Nong, Nha Trang, Ly Son, Dien Bien Phu",
        "A remporté le championnat de parapente 2022 et la deuxième place en atterrissage de précision",
      ],
      ru: [
        "Более 10 лет в качестве пилота парапланеризма",
        "Почти 5000 одиночных и тандемных туристических полетов, почти 1000 часов безопасного полета",
        "Участвовал в соревнованиях по всей стране: Кон Тум, Дак Нонг, Нячанг, Ли Сон, Дьен Бьен Фу",
        "Выиграл чемпионат по парапланеризму 2022 года и второе место по точной посадке",
      ],
    },
    flyingStyle: {
      vi: "Một chuyến bay êm ái nhẹ nhàng. Hình ảnh và video đẹp sau chuyến bay. Giữ vững phong độ và an toàn bay.",
      en: "A smooth and gentle flight. Beautiful images and videos after the flight. Maintains performance and flight safety.",
      fr: "Un vol doux et agréable. Belles images et vidéos après le vol. Maintient les performances et la sécurité du vol.",
      ru: "Плавный и нежный полет. Красивые изображения и видео после полета. Поддерживает производительность и безопасность полета.",
    },
  },
  {
    slug: "dinh-the-anh",
    name: "Đinh Thế Anh",
    role: "Phi công dù lượn",
    experience: "Nhiều năm",
    flights: "2000+ chuyến",
    hours: "1000+ giờ bay",
    phone: "0964073555",
    avatar: "/pilots/dinh-the-anh.png",
    hero: "/pilots/dinh-the-anh.png",
    gallery: ["/pilots/dinh-the-anh.png", "/pilots/dinh-the-anh-2.png", "/pilots/team.png"],
    specialties: ["Bay một lần - ảnh xài cả năm", "Nhiếp ảnh chuyên nghiệp"],
    certificates: ["IPPI 5", "Tandem Pilot", "Professional Photographer"],
    bio: {
      vi: "Phi công dù lượn với 2000 chuyến bay gần 1000 giờ lơ lửng trên trời. Phi công đại diện Việt Nam dự thi olympic 2023 tại Hàn Quốc. Đã bay tại các quốc gia: Thụy Sỹ, Hàn Quốc, Thái Lan v.v. 3 lần đoạt giải vô địch hạ cánh chính xác ở các cuộc thi dù lượng trong nước.",
      en: "Paragliding pilot with 2000 flights and nearly 1000 hours floating in the sky. Vietnamese pilot representative at 2023 Olympics in Korea. Has flown in countries: Switzerland, Korea, Thailand, etc. 3-time champion in precision landing at domestic paragliding competitions.",
      fr: "Pilote de parapente avec 2000 vols et près de 1000 heures flottant dans le ciel. Représentant pilote vietnamien aux Jeux olympiques 2023 en Corée. A volé dans des pays: Suisse, Corée, Thaïlande, etc. Champion 3 fois en atterrissage de précision lors de compétitions nationales de parapente.",
      ru: "Пилот парапланеризма с 2000 полетами и почти 1000 часами парения в небе. Представитель вьетнамского пилота на Олимпиаде 2023 года в Корее. Летал в странах: Швейцария, Корея, Таиланд и т.д. 3-кратный чемпион по точной посадке на внутренних соревнованиях по парапланеризму.",
    },
    funFacts: {
      vi: [
        "Slogan: 'Bay một lần – ảnh xài cả năm.'",
        "Sống ảo là sự nghiệp, bay dù là nghệ tay trái.",
        "Được kéo dài thời lượng bay nếu điều kiện gió tốt",
        "Ngoại việc đam mê dù lượng anh còn là vận động viên đua xe đạp địa hình, và kiêm nhiếp ảnh giả đã chụ cho nhiều ca sỹ nổi tiếng như Tuấn Hưng",
      ],
      en: [
        "Slogan: 'Fly once – use photos all year.'",
        "Living for the gram is a career, paragliding is a side hobby.",
        "Can extend flight duration if wind conditions are good",
        "Besides being passionate about paragliding, he's also a mountain bike athlete and photographer who has captured many famous singers like Tuan Hung",
      ],
      fr: [
        "Slogan: 'Volez une fois – utilisez les photos toute l'année.'",
        "Vivre pour Instagram est une carrière, le parapente est un passe-temps.",
        "Peut prolonger la durée du vol si les conditions de vent sont bonnes",
        "En plus d'être passionné de parapente, il est également athlète de VTT et photographe qui a capturé de nombreux chanteurs célèbres comme Tuan Hung",
      ],
      ru: [
        "Слоган: 'Летайте один раз – используйте фотографии весь год.'",
        "Жизнь для Instagram - это карьера, парапланеризм - хобби.",
        "Может продлить продолжительность полета, если условия ветра хорошие",
        "Помимо увлечения парапланеризмом, он также является спортсменом по горному велосипеду и фотографом, который снимал многих известных певцов, таких как Туан Хунг",
      ],
    },
    achievements: {
      vi: [
        "2000 chuyến bay gần 1000 giờ lơ lửng trên trời",
        "Phi công đại diện Việt Nam dự thi olympic 2023 tại Hàn Quốc",
        "Đã bay tại các quốc gia: Thụy Sỹ, Hàn Quốc, Thái Lan v.v",
        "3 lần đoạt giải vô địch hạ cánh chính xác ở các cuộc thi dù lượng trong nước",
      ],
      en: [
        "2000 flights with nearly 1000 hours floating in the sky",
        "Vietnamese pilot representative at 2023 Olympics in Korea",
        "Has flown in countries: Switzerland, Korea, Thailand, etc.",
        "3-time champion in precision landing at domestic paragliding competitions",
      ],
      fr: [
        "2000 vols avec près de 1000 heures flottant dans le ciel",
        "Représentant pilote vietnamien aux Jeux olympiques 2023 en Corée",
        "A volé dans des pays: Suisse, Corée, Thaïlande, etc.",
        "Champion 3 fois en atterrissage de précision lors de compétitions nationales de parapente",
      ],
      ru: [
        "2000 полетов с почти 1000 часами парения в небе",
        "Представитель вьетнамского пилота на Олимпиаде 2023 года в Корее",
        "Летал в странах: Швейцария, Корея, Таиланд и т.д.",
        "3-кратный чемпион по точной посадке на внутренних соревнованиях по парапланеризму",
      ],
    },
    flyingStyle: {
      vi: "Slogan: 'Bay một lần – ảnh xài cả năm.' Sống ảo là sự nghiệp, bay dù là nghệ tay trái. Được kéo dài thời lượng bay nếu điều kiện gió tốt.",
      en: "Slogan: 'Fly once – use photos all year.' Living for the gram is a career, paragliding is a side hobby. Can extend flight duration if wind conditions are good.",
      fr: "Slogan: 'Volez une fois – utilisez les photos toute l'année.' Vivre pour Instagram est une carrière, le parapente est un passe-temps. Peut prolonger la durée du vol si les conditions de vent sont bonnes.",
      ru: "Слоган: 'Летайте один раз – используйте фотографии весь год.' Жизнь для Instagram - это карьера, парапланеризм - хобби. Может продлить продолжительность полета, если условия ветра хорошие.",
    },
  },
]

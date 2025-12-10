import { Product } from "@/types/product";

export const products: Product[] = [
  // =================== ELECTRONICS ===================
  {
    id: "p1",
    slug: "tai-nghe-bluetooth-chong-on-pro",
    name: "Tai nghe Bluetooth Chống Ồn Pro",
    description: "Chống ồn chủ động, pin 30 giờ, hỗ trợ sạc nhanh.",
    basePrice: 1200000,
    salePrice: 899000,
    category: "electronics",
    brand: "Sony",
    thumbnail: "/images/products/headphones.jpg",
    images: [
      { url: "/images/products/headphones.jpg" },
      { url: "/images/products/headphones-2.jpg" },
    ],
    rating: 5,
    reviewsCount: 125,
    stock: 58,
    attributes: {
      bluetooth: "5.2",
      battery_life: 30,
      connector: "USB-C",
    },
    specs: [
      { label: "Bluetooth", value: "5.2" },
      { label: "Thời lượng pin", value: "30 giờ" },
      { label: "Cổng sạc", value: "USB-C" },
    ],
    variants: [
      { id: "v1", color: "Đen", stock: 30 },
      { id: "v2", color: "Trắng", stock: 28 },
    ],
    createdAt: "2024-01-01",
  },

  {
    id: "p2",
    slug: "ban-phim-co-rgb-gaming",
    name: "Bàn phím cơ RGB Gaming",
    description: "Switch gõ siêu phê, RGB sống động 16.8M màu",
    basePrice: 1599000,
    salePrice: 1199000,
    category: "electronics",
    brand: "Keychron",
    thumbnail: "/images/products/keyboard.jpg",
    stock: 80,
    rating: 4.8,
    attributes: {
      switch: "Red",
      connection: "Wireless + USB",
      layout: "75%",
    },
    specs: [
      { label: "Loại switch", value: "Red" },
      { label: "Kết nối", value: "Wireless + USB" },
    ],
  },

  {
    id: "p3",
    slug: "smartwatch-suc-khoe-pro",
    name: "Smartwatch Theo Dõi Sức Khỏe Pro",
    description: "Đo nhịp tim, SPO2, GPS chính xác",
    basePrice: 2990000,
    category: "electronics",
    brand: "Xiaomi",
    thumbnail: "/images/products/watch.jpg",
    stock: 34,
    attributes: {
      waterproof: "IP68",
      battery_life: 14,
    },
  },

  // =================== FASHION ===================
  {
    id: "p4",
    slug: "ao-thun-nam-co-gian",
    name: "Áo Thun Nam Co Giãn",
    description: "Chất liệu cotton thoáng mát",
    basePrice: 199000,
    salePrice: 139000,
    category: "fashion",
    brand: "Routine",
    thumbnail: "/images/products/tshirt.jpg",
    stock: 200,
    attributes: {
      material: "Cotton",
      gender: "Nam",
    },
    variants: [
      { id: "M", size: "M", stock: 80 },
      { id: "L", size: "L", stock: 70 },
      { id: "XL", size: "XL", stock: 50 },
    ],
  },

  {
    id: "p5",
    slug: "giay-chay-bo-ultra",
    name: "Giày Chạy Bộ Ultra",
    description: "Trợ lực hoàn hảo cho mọi bước chạy",
    basePrice: 1799000,
    salePrice: 1499000,
    category: "fashion",
    brand: "Nike",
    thumbnail: "/images/products/shoes.jpg",
    stock: 98,
    attributes: {
      material: "Mesh",
      size_range: "40-44",
    },
  },

  {
    id: "p6",
    slug: "tui-xach-cong-so",
    name: "Túi xách công sở",
    description: "Thiết kế sang trọng, chống nước",
    basePrice: 499000,
    category: "fashion",
    brand: "Vascara",
    thumbnail: "/images/products/bag.jpg",
    stock: 40,
    attributes: {
      waterproof: "Yes",
      compartments: 3,
    },
  },

  // =================== HOME ===================
  {
    id: "p7",
    slug: "robot-hut-bui-thong-minh",
    name: "Robot hút bụi thông minh",
    description: "Lau hút 2in1, quay về dock sạc",
    basePrice: 8990000,
    salePrice: 7590000,
    category: "home",
    brand: "Xiaomi",
    thumbnail: "/images/products/robot.jpg",
    stock: 15,
    attributes: {
      battery: "5200mAh",
      suction: "3000Pa",
    },
  },

  {
    id: "p8",
    slug: "noi-chien-khong-dau-6l",
    name: "Nồi chiên không dầu 6L",
    description: "Công suất 1700W – Hẹn giờ thông minh",
    basePrice: 1290000,
    category: "home",
    brand: "Lock&Lock",
    thumbnail: "/images/products/airfryer.jpg",
    stock: 20,
  },

  {
    id: "p9",
    slug: "quat-hoi-nuoc-lam-mat",
    name: "Quạt hơi nước làm mát",
    description: "Dung tích lớn 45L – cho cả phòng",
    basePrice: 2990000,
    category: "home",
    brand: "Kangaroo",
    thumbnail: "/images/products/fan.jpg",
    stock: 10,
  },

  // =================== BEAUTY ===================
  {
    id: "p10",
    slug: "kem-chong-nang-spf50",
    name: "Kem chống nắng SPF50+",
    description: "Dưỡng ẩm và bảo vệ da",
    basePrice: 299000,
    salePrice: 259000,
    category: "beauty",
    brand: "SunCo",
    thumbnail: "/images/products/sunscreen.jpg",
    stock: 300,
    attributes: {
      skin_type: "All",
      waterproof: "Yes",
    },
  },

  {
    id: "p11",
    slug: "serum-ha-b5-cap-am",
    name: "Serum HA B5 cấp ẩm",
    description: "Phù hợp mọi loại da – phục hồi nhanh",
    basePrice: 499000,
    category: "beauty",
    brand: "La Roche-Posay",
    thumbnail: "/images/products/serum.jpg",
    stock: 60,
  },

  {
    id: "p12",
    slug: "son-duong-moi-xinh",
    name: "Son dưỡng môi xinh",
    description: "Không chứa chì – mềm môi cả ngày",
    basePrice: 99000,
    category: "beauty",
    brand: "Innisfree",
    thumbnail: "/images/products/lipbalm.jpg",
    stock: 200,
  },

  // =================== TOYS ===================
  {
    id: "p13",
    slug: "lego-sang-tao-tre-em",
    name: "Lego sáng tạo trẻ em",
    description: "Giúp phát triển trí tuệ cho bé",
    basePrice: 1099000,
    salePrice: 999000,
    category: "toys",
    brand: "LEGO",
    thumbnail: "/images/products/lego.jpg",
    stock: 45,
  },

  {
    id: "p14",
    slug: "bup-be-cinderella",
    name: "Búp bê Cinderella",
    description: "Cao 30cm – chất liệu cao cấp",
    basePrice: 399000,
    category: "toys",
    brand: "Barbie",
    thumbnail: "/images/products/doll.jpg",
    stock: 90,
  },

  {
    id: "p15",
    slug: "xe-dieu-khien-tu-xa",
    name: "Xe điều khiển từ xa",
    description: "Bền + tốc độ cao cho bé trai",
    basePrice: 599000,
    category: "toys",
    brand: "RemoHobby",
    thumbnail: "/images/products/car.jpg",
    stock: 70,
  },

  // =================== SPORTS ===================
  {
    id: "p16",
    slug: "bong-da-chinh-hang",
    name: "Bóng đá chính hãng",
    description: "Chuẩn thi đấu FIFA Quality",
    basePrice: 890000,
    category: "sports",
    brand: "Adidas",
    thumbnail: "/images/products/football.jpg",
    stock: 120,
  },

  {
    id: "p17",
    slug: "gay-tap-golf-pro",
    name: "Gậy tập Golf Pro",
    description: "Cán carbon siêu nhẹ",
    basePrice: 3990000,
    category: "sports",
    brand: "Callaway",
    thumbnail: "/images/products/golf.jpg",
    stock: 25,
  },

  {
    id: "p18",
    slug: "op-lung-chong-soc-iphone",
    name: "Ốp lưng chống sốc iPhone",
    description: "Bảo vệ tuyệt đối – Không ngại rơi",
    basePrice: 159000,
    category: "electronics",
    brand: "Spigen",
    thumbnail: "/images/products/case.jpg",
    stock: 200,
    attributes: {
      phone_model: "iPhone 12/13/14",
    },
  },
];

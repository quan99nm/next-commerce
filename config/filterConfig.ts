export const ATTRIBUTE_LABELS: Record<string, string> = {
  // Common attributes
  color: "Màu sắc",
  size: "Kích cỡ",
  brand: "Thương hiệu",
  material: "Chất liệu",
  gender: "Giới tính",

  // Electronics
  ram: "RAM",
  storage: "Bộ nhớ",
  battery: "Dung lượng pin",
  weightKg: "Khối lượng",
  dimensions: "Kích thước",
};

export const CATEGORY_FILTER_CONFIG: Record<
  string,
  {
    order: string[];
    groupName?: string;
    labels?: Record<string, string>;
  }
> = {
  electronics: {
    order: [
      "brand",
      "color",
      "connection", // Wireless / USB / Bluetooth (gộp)
      "switch", // Mechanical Switch (nếu là gaming keyboard)
      "battery", // Tạm đặt mapping dưới
      "waterproof",
    ],

    labels: {
      connection: "Kết nối",
      switch: "Loại switch phím",
      battery: "Thời lượng pin",
      waterproof: "Chống nước",
    },
  },

  fashion: {
    order: ["size", "material", "color", "gender"],
    labels: {
      gender: "Phân loại giới tính",
    },
  },

  toys: {
    order: ["brand", "material", "color"],
  },

  beauty: {
    order: ["brand"],
  },
};
export const formatValue = (value: string) => {
  return value
    .replace(/(\d+)(gb|mah|kg)/gi, "$1 $2")
    .replace("-", " ")
    .toUpperCase();
};

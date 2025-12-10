export type CustomerInfo = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
};

export async function getMockCustomer(): Promise<CustomerInfo> {
  // Tạm thời mô phỏng như data fetch từ server
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        fullName: "Nguyễn Văn A",
        phone: "0901234567",
        email: "customer@example.com",
        address: "123 Đường ABC, Quận 1, TP.HCM",
      });
    }, 500)
  );
}

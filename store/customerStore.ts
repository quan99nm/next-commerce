"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CustomerForm = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
};

type CustomerState = {
  info: CustomerForm;
  updateInfo: (data: Partial<CustomerForm>) => void;
  resetInfo: () => void;
};

export const useCustomerStore = create<CustomerState>()(
  persist(
    (set) => ({
      info: {
        fullName: "",
        phone: "",
        email: "",
        address: "",
      },
      updateInfo: (data) =>
        set((state) => ({
          info: { ...state.info, ...data },
        })),
      resetInfo: () =>
        set({
          info: {
            fullName: "",
            phone: "",
            email: "",
            address: "",
          },
        }),
    }),
    {
      name: "customer-storage",
    }
  )
);

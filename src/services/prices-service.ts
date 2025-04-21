import api from "./api";

export type Price = {
    id: number;
    product: string;
    price: number;
    measure: string;
    size: string;
    createdAt: string;
    updatedAt: string;
};

export const listPrices = async (): Promise<Partial<Price>[]> => {
  try {
    const response = await api.get("/prices");
    return response.data;
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error;
  }
};
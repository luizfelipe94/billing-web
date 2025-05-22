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

export const listPrices = async (): Promise<Price[]> => {
  try {
    const response = await api.get("/prices");
    return response.data;
  } catch (error) {
    console.error("Error fetching prices:", error);
    throw error;
  }
};

export const createPrice = async (price: Partial<Price>): Promise<Price> => {
  try {
    const response = await api.post("/prices", price);
    return response.data;
  } catch (error) {
    console.error("Error creating price:", error);
    throw error;
  }
}
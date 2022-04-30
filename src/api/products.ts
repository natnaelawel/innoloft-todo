import { Product } from "../helpers/types";
import { getData, putData } from "./fetcher";

export async function getProduct(id: string) {
  try {
    const res = await fetch("/product/" + id);

    return { data: await res.json(), message: "success" };
  } catch (error) {
    console.error(error);
    return { data: null, message: error };
  }
}

export async function getTRL() {
  try {
    const res = await fetch("/trl/");
    return { data: await res.json(), message: "success" };
  } catch (error) {
    console.error(error);
    return { data: null, message: error };
  }
}

export const updateProduct = async (id: number, product: Product) => {
  try {
    const res = await putData("/product/" + id, product);
    return { data: res, message: "success" };
  } catch (error) {
    return { data: null, message: error };
  }
};

export const getAppConfiguration = async (id: string) => {
  try {
    const res = await fetch(`/configuration/${id}`);
    return { data: await res.json(), message: "success" };
  } catch (error) {
    return { data: null, message: error };
  }
};

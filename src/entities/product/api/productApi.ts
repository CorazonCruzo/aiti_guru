import { apiClient } from "@/shared/api/axiosInstance";

import type {
    Product,
    ProductsResponse,
    ProductsParams,
    AddProductDto,
} from "@/entities/product/model/types";

const PRODUCTS_LIMIT = 20;

export const getProducts = async (params: ProductsParams = {}): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>("/products", {
        params: {
            limit: params.limit ?? PRODUCTS_LIMIT,
            skip: params.skip ?? 0,
            sortBy: params.sortBy,
            order: params.order,
        },
    });
    return response.data;
};

export const searchProducts = async (
    query: string,
    params: ProductsParams = {},
): Promise<ProductsResponse> => {
    const response = await apiClient.get<ProductsResponse>("/products/search", {
        params: {
            q: query,
            limit: params.limit ?? PRODUCTS_LIMIT,
            skip: params.skip ?? 0,
        },
    });
    return response.data;
};

export const addProduct = async (data: AddProductDto): Promise<Product> => {
    const response = await apiClient.post<Product>("/products/add", data);
    return response.data;
};

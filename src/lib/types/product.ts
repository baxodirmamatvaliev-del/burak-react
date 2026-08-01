import { ProductCollection,ProductSize, ProductStatus } from "../enums/product.enum"

export interface Product {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productData: string;
    productSize?: ProductSize;
    productVolume?: number;
    productDesc?: string;
    productImages: string[];
    productViews?: number;
    createdAt: Date;
    updatedAd: Date;
}

export interface ProductInquiry {
    order: string;
    page: number;
    limit: number;
    productCollection?: ProductCollection;
    search?: string; 
}

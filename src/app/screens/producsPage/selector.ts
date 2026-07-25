import { createSelector } from "@reduxjs/toolkit";
import { AppRootState } from "../../../lib/types/screen";

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retriveRestaurant = createSelector(
    selectProductsPage,
     (ProductsPage)=> ProductsPage.restaurant
);

export const retriveChosennProduct = createSelector(
    selectProductsPage,
    (ProductsPage) => ProductsPage.chosenProduct
);

export const retriveProducts = createSelector(
    selectProductsPage,
    (ProductsPage ) => ProductsPage.products
);

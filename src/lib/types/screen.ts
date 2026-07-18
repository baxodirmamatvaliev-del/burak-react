
import { Member } from "./member";
import { Product } from "./product";
/** REACT APP STATE **/
export interface AppRootState {
    homePage: HomePageState;
    // productsPage: ProductsPageState;
} 

/** HomePage **/
export interface HomePageState{
    popularDishes: Product[];
    newDished: Product[];
    topUser: Member[];
}

/** PRODUCTS PAGE **/

/** ORDERS PAGE **/
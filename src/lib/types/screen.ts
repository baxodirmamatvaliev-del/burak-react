
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
    newDishes: Product[];
    topUsers: Member[];
    events: string;
}

/** PRODUCTS PAGE **/

/** ORDERS PAGE **/

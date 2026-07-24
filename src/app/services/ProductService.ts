import axios from "axios";
import { serverApi } from "../../lib/config";
import { Product, ProductInquiry } from "../../lib/types/product";

class ProductService {
    private readonly path: string;
    order: any;

    constructor(){
        this.path = serverApi;
    }


    public async getProducts(input: ProductInquiry): Promise<Product[]> {
        try{
         let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;
         if(input.productCollection)
             url += `&productCollection=${input.productCollection}`;
         if(input.search) url += `&search=${input.search}`;
         
         const {data}= await axios.get(url);
         console.log("result:", data);


         return data;
        }catch(err){
         console.log("Error, getProduct:", err);
         throw err;
        }
    }
;}

export default ProductService;

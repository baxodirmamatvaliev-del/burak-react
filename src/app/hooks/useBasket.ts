import { useState } from "react";
import { CartItem } from "../../lib/types/search";


const useBasket =() => {
    const cartJson : string | null = localStorage.getItem("cartData");
     const currentCart = cartJson ? JSON.parse(cartJson) : [];
    const [ cartItems, setCartItems] = useState<CartItem[]>([currentCart]);  // TEKSHIRISH: IA
    

     //TODO:   ( onAdd Basketga maxsulotlarni qoshish mantigi)
    const onAdd = (input: CartItem) => {
     const exist: any = cartItems.find((item: CartItem)=>  
        item._id === input._id );  //Basketga qoshayotganimz Basketimizda mavjudmi?
     if(exist){ // Mavjud bolgan xolda...
      const cartUpdate = cartItems.map((item: CartItem ) => {
        return item._id === input._id ? {...exist, quantity: exist.quantity + 1} : item; // maxsulotni quanti sini +1 ga kopaytirib qoyyyapmiz, qolgan maxsulotlarda item ni ozini return qilishini buyuryapmiz:
      })
      setCartItems(cartUpdate);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate)); 
     } else {
      const cartUpdate = [...cartItems,{...input}];  // Mavjud bolmasa..
      setCartItems(cartItems);
      localStorage.setItem("cartData", JSON.stringify(cartUpdate)); // yangilangan cart ni malumotini localstorage ga joylashini buyuryapmiz:
     }
    }

    const onRemove = (input: CartItem) => {
    const exist: any = cartItems.find(
        (item: CartItem)=>  item._id === input._id)  //Basketga qoshayotganimz Basketimizda mavjudmi?
        if(exist.quantity === 1){
         const cartUpdate  = cartItems.filter((item: CartItem ) => item._id !== item._id
        );
          setCartItems(cartItems);
          localStorage.setItem("cartData", JSON.stringify(cartUpdate)); 
        }else{
         const cartUpdate = cartItems.map((item: CartItem) =>
        item._id === input._id ? {...exist, quantity: exist.quantityc -1 }
           : item 
        );
         setCartItems(cartItems);
          localStorage.setItem("cartData", JSON.stringify(cartUpdate)); 
      }
    };

    const onDelate = (input: CartItem ) => {
        const cartUpdate = cartItems.filter(
        (item: CartItem ) => item._id !== input._id
        );
         setCartItems(cartItems);
          localStorage.setItem("cartData", JSON.stringify(cartUpdate)); 
    };

    const onDeleteAll = () => {
     setCartItems([]);
     localStorage.removeItem("cartData")
    }


    return {
        cartItems,
        onAdd,
        onRemove,
        onDelate,
        onDeleteAll
    }
}

export default useBasket;
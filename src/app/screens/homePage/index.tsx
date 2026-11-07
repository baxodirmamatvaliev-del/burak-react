import { Box, Container } from "@mui/material";
import React, { useEffect } from "react";
import Dentists from "./Dentists";
import { Statistics } from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch} from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css"

/** REDUX SLICE & SELECTOR **/

const actionDispatch = (dispatch: Dispatch) =>({
  setPopularDishes: (data : Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes , setNewDishes, setTopUsers} = actionDispatch(useDispatch()); 

  useEffect(()=> {
    // Backend server data request => Data

    const product = new ProductService();
    product.getProducts({
      page: 1,
      limit: 4,
      order: "productViews",
      // productCollection: ProductCollection.DISH,
    })
    .then((data) =>{
    setPopularDishes(data);
    })
    .catch((err) => console.log(err))
     
      product.getProducts({
      page: 1,
      limit: 4,
      order: "createdAt",
      productCollection: ProductCollection.DISH,
    })
    .then((data) =>{
     setNewDishes(data);
    })
    .catch((err) => console.log(err))


    const member = new MemberService();
    member
    .getTopusers()
    .then(data =>{
    setTopUsers(data);  //payload!
    })
    .catch((err) => console.log(err)) 
     
  }, []);

 

  return  <div className={"homepage"}>
    <Container component="section" maxWidth={false} className="clinic-information" id="introduction" tabIndex={-1} aria-labelledby="clinic-introduction-title">
      <Box component="h2" id="clinic-introduction-title">치과 소개</Box>
      <Box component="p">서울온치과의 진료과목과 의료진, 진료 예약 정보를 확인하세요.</Box>
    </Container>
    <Statistics/>
    <Dentists/>
    <Container component="section" maxWidth={false} className="clinic-information" id="directions" tabIndex={-1} aria-labelledby="clinic-directions-title">
      <Box component="h2" id="clinic-directions-title">오시는 길</Box>
      <Box component="p">주소와 교통편은 추후 안내해 드리겠습니다.</Box>
    </Container>
    <Container component="section" maxWidth={false} className="clinic-information" id="contact" tabIndex={-1} aria-labelledby="clinic-contact-title">
      <Box component="h2" id="clinic-contact-title">전화 문의</Box>
      <Box component="p">전화번호는 추후 안내해 드리겠습니다.</Box>
    </Container>
    <PopularDishes/>
   <NewDishes/>
   <Advertisement/>
   <ActiveUsers/>
   <Events/>
  </div>
}

import { Box, Container, Stack } from "@mui/material";
import React from "react";
import Divider from "../../components/divider";

export function Statistics(){
    return( 
    <div>
     <Container className={"static-frame"} >
      <Stack className={"info"}>
        <Stack className={"stattic-box"}>
        <Box className={"stattic-box"}>12</Box>
        <Box className={"stattic-text"}>Restaurants</Box>
      </Stack>

     <Divider height="64" width="2" bg="#E3C08D" />

       <Stack className={"stattic-box"}>
        <Box className={"stattic-box"}>8</Box>
        <Box className={"stattic-text"}>Experoence</Box>
      </Stack>
       <Divider height="64" width="2" bg="#E3C08D" />

       <Stack className={"stattic-box"}>
        <Box className={"stattic-box"}>59+</Box>
        <Box className={"stattic-text"}>Menu</Box>
      </Stack>
      <Divider height="64" width="2" bg="#E3C08D" />

       <Stack className={"stattic-box"}>
        <Box className={"stattic-box"}>200+</Box>
        <Box className={"stattic-text"}>Clients</Box>
      </Stack>
      </Stack>
     </Container>
    </div> 
    );
}

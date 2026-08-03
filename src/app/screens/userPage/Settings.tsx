import React, { useState } from "react";
import { Box } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import { useGlobals } from "../../hooks/useGlobals";
import { MemberUpdateInput } from "../../../lib/types/member";
import { T } from "../../../lib/types/common";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../lib/sweetAlert";
import { error } from "console";
import { Messages, serverApi } from "../../../lib/config";
import MemberService from "../../services/MemberService";

export function Settings() {

  const {authMember ,setAuthMember} = useGlobals();

  const [memberImage, setMemberImage] = useState<string>(
    authMember?.memberImage ? 
    `${serverApi}/${authMember.memberImage}`
    : "/icons/default-user.svg" 
  )

  const [memberUpdataInput , setMemberUpdataInput] =
   useState<MemberUpdateInput>({
    memberNick: authMember?.memberNick,
    memberPhone: authMember?.memberPhone,
    memberAddress: authMember?.memberAddress,
    memberDesc: authMember?.memberDesc,
    memberImage: authMember?.memberImage,
    memberPoints: authMember?.memberPoints
  });

  /** HANDLER **/ 

const memberNickHandler =(e: T) => {
 memberUpdataInput.memberNick = e.target.value;
 setMemberUpdataInput({...memberUpdataInput});
}

const memberPhoneHandler =(e: T) => {
 memberUpdataInput.memberPhone = e.target.value;
 setMemberUpdataInput({...memberUpdataInput});
}

const memberAddressHandler =(e: T) => {
 memberUpdataInput.memberAddress = e.target.value;
 setMemberUpdataInput({...memberUpdataInput});
}

const memberDescriptionHandler =(e: T) => {
 memberUpdataInput.memberDesc = e.target.value;
 setMemberUpdataInput({...memberUpdataInput});
}

const handleSubmitButton = async () => {
  try{
  if(!authMember) throw new Error(Messages.error2)
  if(memberUpdataInput.memberNick === "" ||
     memberUpdataInput.memberPhone === "" ||
     memberUpdataInput.memberAddress === "" ||
     memberUpdataInput.memberDesc === ""
    ) {

    throw new Error(Messages.error3);
  }

  const member = new MemberService();

  const result = await member.updateMember(memberUpdataInput);
  setAuthMember(result);

  await sweetTopSmallSuccessAlert("Modifiet successfully!", 2000)
  }catch(err){
  console.log(err);
  sweetErrorHandling(err).then();

  }
}

// user rasim ozgartirganda qanday holda turishini: Korish mantigi
const handleImageViewer = (e: T) => {
  const file = e.target.files[0];
  console.log("file", file);
  const fileType = file.type,
   validateImageTypes = ["image/jpg", "image/jpeg","image/png"]

   if(!validateImageTypes.includes(fileType)) {
    sweetErrorHandling(Messages.error5).then();
   } else {
     if(file){
      memberUpdataInput.memberImage = file;
      setMemberUpdataInput({...memberUpdataInput})
      setMemberImage(URL.createObjectURL(file));
     }
   }
   

}

  return (
    <Box className={"settings"}>
      <Box className={"member-media-frame"}>
        <img
          src={memberImage}
          className={"mb-image"}
          alt="Member avatar"
        />
        <div className={"media-change-box"}>
          <span>Upload image</span>
          <p>JPG, JPEG, PNG formats only!</p>
          <div className={"up-del-box"}>
            <Button component="label" onChange={handleImageViewer}>
              <CloudDownloadIcon />
              <input type="file" hidden />
            </Button>
          </div>
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Username</label>
          <input
            className={"spec-input mb-nick"}
            type="text"
            placeholder={authMember?.memberNick}
            value={memberUpdataInput.memberNick}
            name="memberNick"
            onChange={memberNickHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"short-input"}>
          <label className={"spec-label"}>Phone</label>
          <input
            className={"spec-input mb-phone"}
            type="text"
            placeholder={authMember?.memberPhone ?? "no phone❌"}
            value={memberUpdataInput.memberPhone}
            name="memberPhone"
            onChange={memberPhoneHandler}
          />
        </div>
        <div className={"short-input"}>
          <label className={"spec-label"}>Address</label>
          <input
            className={"spec-input  mb-address"}
            type="text"
            placeholder={authMember?.memberAddress ? authMember.memberAddress: "no address❌"}
            value={memberUpdataInput.memberAddress}
            name="memberAddress"
            onChange={memberAddressHandler}
          />
        </div>
      </Box>
      <Box className={"input-frame"}>
        <div className={"long-input"}>
          <label className={"spec-label"}>Description</label>
          <textarea
            className={"spec-textarea mb-description"}
            placeholder={authMember?.memberDesc ? 
              authMember.memberDesc : "no Description❌"}
            value={memberUpdataInput.memberDesc}
            name="memberDesc"
            onChange={memberDescriptionHandler}
          />
        </div>
      </Box>
      <Box className={"save-box"}>
        <Button variant={"contained"} onClick={handleSubmitButton}>Save</Button>
      </Box>
    </Box>
  );
}

import React, { ReactNode, useState } from "react";
import Cookies from "universal-cookie"; // Brauser dagi cookie larni qolga olishga imkon beradi
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{children: ReactNode}> = ({children}) => {
const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem("memberData") ? JSON.parse( localStorage.getItem("memberData") as string)
     : null
);

console.log("=== verifay === ")

return (
    <GlobalContext.Provider value={{ authMember, setAuthMember }}>
        {children}
    </GlobalContext.Provider>
);
}
 

export default ContextProvider;
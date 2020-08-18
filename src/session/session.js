import { createContext } from "react";
import * as Cookies from "js-cookie";
import * as CryptoJS from "crypto-js";

export const setSessionCookie = (session) => {
  Cookies.remove("session");

  if(session){
    session = CryptoJS.AES.encrypt(JSON.stringify(session), "Secret Passphrase").toString();
  }

  Cookies.set("session", session);
};

export const getSessionCookie = () => {
  let session = Cookies.get("session");
  
  if(session){
    session = CryptoJS.AES.decrypt(session, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
    return JSON.parse(session);
  }
  else  {
    return {'isLoggedIn': false};
  }
};

export const SessionContext = createContext(getSessionCookie());
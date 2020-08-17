import { createContext } from "react";
import * as Cookies from "js-cookie";

export const handleStartedTypingRequiredFields = (key, startedTypingRequiredFields, setStartedTypingRequiredFields) => {
    let field = {...startedTypingRequiredFields}
    field[key] = true
    setStartedTypingRequiredFields(field)
}

export const handleAddUserInformation = (key, e, userInfo, setUserInfo) => {
    let info = { ...userInfo }
    info[key] = e.target.value
    setUserInfo(info)
}

export async function handleGetUserInfo(email) {
    let url = 'https://8e7wggf57e.execute-api.us-east-1.amazonaws.com/default/get-user'
    let payload = {'email':email}
    let data = await (await fetch(url, {method: 'POST', body: JSON.stringify(payload)})).json()
    return data;
}
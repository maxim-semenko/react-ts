import React, {useEffect, useState} from 'react';
import {IntlProvider} from "react-intl";
import English from "../languages/en-US.json";
import Russian from "../languages/ru-RU.json";

// @ts-ignore
export const Context = React.createContext();

const local = navigator.language

let lang;
if (local === "en-US") {
    lang = English
} else {
    lang = Russian
}

const Wrapper = (props) => {

    const [locale, setLocale] = useState(local)
    const [messages, setMessages] = useState(lang)

    useEffect(() => {
        const newLocale = localStorage.getItem("lang")
        setLocale(localStorage.getItem("lang"))
        if (newLocale === "en-US") {
            setMessages(English)
        } else {
            setMessages(Russian)
        }
    })

    function selectLang(event) {
        const newLocale = event.target.value
        setLocale(newLocale)
        if (newLocale === "en-US") {
            setMessages(English)
            localStorage.setItem("lang", "en-US")
        } else {
            setMessages(Russian)
            localStorage.setItem("lang", "ru-RU")
        }
    }


    return (
        // @ts-ignore
        <Context.Provider value={{locale, selectLang}}>
            <IntlProvider messages={messages} locale={local}>
                {props.children}
            </IntlProvider>
        </Context.Provider>
    );
}

export default Wrapper;
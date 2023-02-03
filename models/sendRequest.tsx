import { useEffect, useState } from "react";
import axios from "axios";
import { useIonToast } from "@ionic/react";

function getURL(url_pattern: string) {
    const port = "";
    const URL = "https://gestionencherews-production.up.railway.app";
    return URL + port + url_pattern;
}

function useItems(url: string) {
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);


    useEffect(function () {
        axios.get(getURL(url))
            .then(function (response) {
                console.log("success");
                console.log(response);
                setItem(response.data.data);
            })
            .catch(function (err) {
                console.log("error");
                console.log(error);
                setError(err);
            })
    }, [getURL(url)]);

    return { item, error };
}

export function usePostItem(url: string, req_body: any) {
    const [item, setItem] = useState<any>([]);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        axios.post(getURL(url), req_body).then((response) => {
            setItem(response.data.data);
        }).catch((err) => {
            setError(err);
        });
    }, [getURL(url), req_body]);

    return { item, error };
}


function checkConnection(callback_success: any, callback_error: any, idAvion: any) {
    console.log("TOKEN=" + localStorage.getItem('user_token'));
    let token = localStorage.getItem('user_token');
    if (token == null) {
        callback_error();
        return;
    }

    axios.post(getURL('/users/check'), { token: localStorage.getItem('user_token') })
        .then(response => {
            console.log("YES");
            console.log(response.data);
            if (response.data.data != null) {
                if (response.data.data === false) {
                    callback_error();
                } else {
                    console.log("midotra ato foana ang");

                    callback_success(idAvion);
                }
            } else {
                callback_error();
            }
        })
        .catch(error => {
            console.log(error);
        })
}

function deconnect(callback_deconnect: any) {
    let token = localStorage.getItem('user_token');
    if (token != null) {
        localStorage.removeItem('user_token');
        callback_deconnect();
    } else {
        callback_deconnect();
    }
};

function checkToken(history: any) {

    const error = 'Vous devez vous connecter pour accéder à cette page ou faire cette action';

    let token = localStorage.getItem("user_token") || '{}';

    // const [toast] = useIonToast(); 

    if (token == null) {
        history.push('/login/' + error);
    }
    // let {item}=useItems('/tokens/valid');
    console.log(JSON.parse(token));
    let token_obj = JSON.parse(token);
    let url = '/tokens/' + token_obj.token + '/valid'

    axios.get(getURL(url))
        .then((response) => {
            console.log(response.data.data);
            if (response.data.data == false) {
                // toast({
                //     message: "Veuillez vous connecter pour acceder à cette page",
                //     duration: 2000,
                //     position: 'bottom'
                // });
                history.push('/login');
            }
        })
}

export { useItems, getURL, checkConnection, deconnect, checkToken };
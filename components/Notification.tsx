import { IonContent, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { useEffect } from "react"
import Push from 'push.js'

const Notification=()=>{
    useEffect(()=>{
        const idInterval=setInterval(()=>{
            Push.create("Hello");
        },3000);

        return ()=>{
            clearInterval(idInterval);
        };
    },[]);

    return (
        <IonContent>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Notif
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonContent>
    );
}
import { IonButton, IonButtons, IonCard, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Waiting from "../components/Waiting";
import { checkToken, getURL, useItems } from "../models/sendRequest";

const Rechargement: React.FC = () => {
    const history = useHistory();

    checkToken(history);

    const [depot, setDepot] = useState(0);
    const [toast] = useIonToast();
    const token_str = localStorage.getItem('user_token') || '{}';

    const token = JSON.parse(token_str);

    var url = '/utilisateurs/' + token.idUser;

    const { item } = useItems(url);

    function getReqBody() {
        return {
            utilisateur:{idUtilisateur: token.idUser},
            montant:depot
        };
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post(getURL('/soldes'),getReqBody()).then(response => {
            console.log(response.data.data)
            if (response.data.data) {
                toast({
                    message: "Demande effectué",
                    duration: 2000,
                    position: 'bottom'
                });
            }
        }).catch((error) => {

        })
    }

    const padding={
        "paddingBottom": "2cm"
    }

    if (item.length === 0) {
        return <Waiting />
    } else {
        return (
            <IonPage>
                <IonContent>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle size="large">Recharger votre compte</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonGrid style={padding}>
                        <IonRow>
                            <IonCol offset="1" size="10">
                                <IonCard>
                                    <IonItem>
                                        <p>Votre solde: {item.montantSolde} Ar</p>
                                    </IonItem>
                                </IonCard>
                                <IonCard class="card">
                                    <IonItem>
                                        <IonLabel position="floating">Montant dépot</IonLabel>
                                        <IonInput type="number" placeholder="0" min="1000" onIonChange={(e: any) => (setDepot(e.target.value))}></IonInput>
                                    </IonItem>
                                    <IonButton className="ion-margin-top" type="submit" expand="block" onClick={handleSubmit}>
                                        Valider
                                    </IonButton>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        );
    }

}

export default Rechargement;
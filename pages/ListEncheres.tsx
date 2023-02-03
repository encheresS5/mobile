import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonImg, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { log } from "console";
import { Key } from "react";
import { useHistory } from "react-router";
import Waiting from "../components/Waiting";
import { checkToken, getURL, useItems } from "../models/sendRequest";

const ListEncheres: React.FC = () => {
    const history = useHistory();

    checkToken(history);

    const token_str = localStorage.getItem("user_token");
    const token = JSON.parse(token_str || '{}');
    var url="/utilisateurs/" + token.idUser + "/encheres";
    console.log(url);
    
    const { item } = useItems("/utilisateurs/" + token.idUser + "/encheres");
    console.log(getURL("/utilisateurs/" + token.idUser + "/bids"));

    console.log(item);

    const red = { color: "red" }
    const green = { color: "green" }

    if (item.length === 0) {
        return (
            <IonPage>
                <IonContent>
                    <Waiting />
                </IonContent>
            </IonPage>
        );
    } else {
        return (
            <IonPage>
                <IonContent>
                    <IonHeader>
                        <IonToolbar>
                            <IonTitle size="large">Liste de vos enchères</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    {
                        item.map((enchere: any) => (
                            <IonCard key={enchere.idEnchere}>
                                <IonImg src={enchere.images[0]} style={{ height:"200px" }}/>

                                <IonCardHeader>
                                    <IonCardSubtitle>{enchere.dateenchere}</IonCardSubtitle>
                                    <IonCardSubtitle><span style={enchere.statut?red:green}>{enchere.statut?"Fini":"En cours"}</span></IonCardSubtitle>
                                    <IonCardTitle>{enchere.produit.nomProduit}</IonCardTitle>
                                </IonCardHeader>

                                <IonCardContent>
                                    {enchere.description}
                                </IonCardContent>
                            </IonCard>
                        ))
                    }
                </IonContent>
            </IonPage>
        );
    }
}
export default ListEncheres;
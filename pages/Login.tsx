import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar, useIonToast } from "@ionic/react"
import { useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { getURL } from "../models/sendRequest";
import { stringify } from "querystring";

const Login: React.FC = () => {
    const {error}=useParams<{error:string;}>()

    // const [email, setEmail] = useState('johndoe@example.com');
    // const [password, setPassword] = useState('password123');

    var email='johndoe@example.com';
    var password='password123';

    const [toast] = useIonToast();
    const history = useHistory();

    function login() {
        axios.post(getURL('/utilisateurs/login'), {
            email: email,
            password: password
        })
            .then(response => {
                console.log(response.data);
                if (response.data.message == null) {
                    let obj_token={
                        idUser:response.data.data.user.idUtilisateur,
                        token:response.data.data.token
                    };
                    localStorage.setItem('user_token', JSON.stringify(obj_token));
                    history.push('/listeEncheres');
                } else {
                    toast({
                        message: response.data.message,
                        duration: 2000,
                        position: 'bottom'
                    });
                }
            });
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Connexion</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className="ion-padding">
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput placeholder="Saisir votre adresse email" value={"johndoe@example.com"} onIonChange={(e: any) => email=(e.target.value)} type="email" />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Mot de passe</IonLabel>
                        <IonInput placeholder="Saisir votre mot de passe" value={"password123"} onIonChange={(e: any) => password=(e.target.value)} type="password" />
                    </IonItem>
                    <IonButton onClick={login} className="ion-margin-top" expand="block">Se connecter</IonButton>
                    <IonGrid>
                        <IonRow>
                            <IonCol offset="6" size="1">
                                ou
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonButton onClick={()=>{
                        history.push('/inscription')
                    }} className="ion-margin-top" expand="block">S'inscrire</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Login;

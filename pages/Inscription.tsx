import { IonButton, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonModal, IonPage, IonRadio, IonRadioGroup, IonTitle, IonToolbar, useIonToast } from "@ionic/react"
import { useState } from "react";
import { useHistory } from "react-router";
import axios from "axios";
import { getURL } from "../models/sendRequest";

const Inscription: React.FC = () => {
    const [nom, setNom] = useState('');
    const [prenoms, setPrenom] = useState('');
    const [genre, setGenre] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [toast] = useIonToast();
    const history = useHistory();

    function signin() {
        axios.post(getURL('/utilisateurs'), {
            nom: nom,
            prenoms: prenoms,
            genre: { "idGenre": genre },
            dateNaissance: dateNaissance,
            email: email,
            password: password
        })
            .then(response => {
                console.log(response.data);
                if (response.data.message == null) {
                    history.push('/login');
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
                    <IonTitle>Inscription</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <form className="ion-padding">
                    <IonItem>
                        <IonLabel position="floating">Nom</IonLabel>
                        <IonInput placeholder="Saisir votre nom" onIonChange={(e: any) => setNom(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Prenom</IonLabel>
                        <IonInput placeholder="Saisir votre prenom" onIonChange={(e: any) => setPrenom(e.target.value)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Genre</IonLabel>
                        <IonRadioGroup onIonChange={(e: any) => setGenre(e.target.value)}>
                            <IonItem>
                                <IonRadio value="1"></IonRadio>
                                <IonLabel> Homme</IonLabel>
                            </IonItem>
                            <IonItem>
                                <IonRadio value="2"></IonRadio>
                                <IonLabel> Femme</IonLabel>
                            </IonItem>
                        </IonRadioGroup>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="fixed">Naissance</IonLabel>
                        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime presentation="date" id="datetime" onIonChange={(e: any) => setDateNaissance(e.target.value)}></IonDatetime>
                        </IonModal>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <IonInput placeholder="Saisir votre adresse email" onIonChange={(e: any) => setEmail(e.target.value)} type="email" />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Mot de passe</IonLabel>
                        <IonInput placeholder="Saisir votre mot de passe" onIonChange={(e: any) => setPassword(e.target.value)} type="password" />
                    </IonItem>
                    <IonButton onClick={signin} className="ion-margin-top" expand="block">S'inscrire</IonButton>
                </form>
            </IonContent>
        </IonPage>
    );
};

export default Inscription;

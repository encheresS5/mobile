import { IonTitle, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonMenuButton, IonPage, IonSelect, IonSelectOption, IonTextarea, IonToolbar } from "@ionic/react";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import Carousel from "../components/Carousel";
import Waiting from "../components/Waiting";
import { checkConnection, checkToken, getURL, useItems } from "../models/sendRequest";
const AjoutEnchere: React.FC = () => {
    const history = useHistory();

    checkToken(history);

    const WIDTH = 400
    const HEIGHT = 300
    const [idProduit, setIdProduit] = useState(1.0);
    const [description, setDescription] = useState('');
    const [prixMinVente, setPrixMinVente] = useState(0);
    const [duree, setDuree] = useState(1);
    const [images, setImages] = useState(Array<string | ArrayBuffer | null | undefined>);

    const [optionsProduit, setOptionsProduits] = useState([{ key: 1, value: 2, text: 'Test' }]);


    var toke_n = JSON.parse(localStorage.getItem("user_token") || '{}');

    var tab_photos: Array<string | ArrayBuffer | null | undefined> = [];

    function getOptionsByIdCategorie(idCategorie: any) {
        let ind = getIndiceCategorie(idCategorie);
        let tab = [];
        for (let i = 0; i < item.produits[ind].length; i++) {
            const element = item.produits[ind][i];
            tab.push({ key: i, value: element.idProduit, text: element.nomProduit });
        }
        return tab;
    }

    function getIndiceCategorie(idCategorie: any) {
        for (let i = 0; i < item.categories.length; i++) {
            if (idCategorie === item.categories[i].idCategorie) {
                return i;
            }
        }
        return -1;
    }

    function getReqBody() {
        return {
            produit: { "idProduit": idProduit },
            description: description,
            prix_min_enchere: prixMinVente,
            utilisateur: { idUtilisateur: toke_n.idUser },
            duree: duree,
            images:images
        };
    }

    function getRatio(width: number, height: number) {
        if (width > height) {
            return WIDTH / width;
        } else {
            return HEIGHT / height;
        }
    }

    function compressImage(image_file: any, img_url: any) {

        let image = document.createElement("img");
        image.src = img_url;
        console.log("SRC=" + img_url);


        image.onload = (e) => {
            let canvas = document.createElement("canvas");
            let ratio = getRatio(image.width, image.height);
            console.log(image_file);
            console.log("WIDTH=" + image.width + "\tHEIGHT=" + image.height);
            canvas.width = image.width * ratio;
            canvas.height = image.height * ratio;

            const context = canvas.getContext("2d");
            context?.drawImage(image, 0, 0, canvas.width, canvas.height);
            var mimeType = image_file.type
            let new_img_url = context?.canvas.toDataURL(mimeType, 100);

            let new_image: any = document.createElement("img");
            new_image.src = new_img_url;

            console.log("NEW URL=" + new_img_url);

            tab_photos.push(new_img_url);
            setImages(tab_photos);
        }
    }


    const handleFile = async (e: any) => {
        tab_photos = [];

        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(files[i].height);

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64 = reader.result;
                compressImage(files[i], base64);
            };
        }
    }

    const ajouterEnchere = (e: any) => {
        axios.post(getURL('/encheres'), getReqBody()).then(response => {
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleSelectCategorieChange = (e: any) => {
        setOptionsProduits(getOptionsByIdCategorie(e.target.value));
    }

    var { item } = useItems("/categories/produits")
    if (item.length === 0) {
        return (
            <IonPage>
                <Waiting />
            </IonPage>
        );
    } else {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle>Ajouter un enchêre</IonTitle>
                    </IonToolbar>
                </IonHeader>
                
                <IonContent>
                    <IonHeader collapse="condense">
                        <IonToolbar>
                            <IonTitle size="large">Ajouter un enchèere</IonTitle>
                        </IonToolbar>
                    </IonHeader>
                    <IonItem>
                        <IonList>
                            <IonItem>
                                <IonLabel>Catégorie</IonLabel>
                                <IonSelect interface="popover" placeholder="Choisisser la catégorie" onIonChange={handleSelectCategorieChange}>
                                    {item.categories.map((categorie: any) => (
                                        <IonSelectOption key={categorie.idCategorie} value={categorie.idCategorie} >{categorie.libelle}</IonSelectOption>
                                    ))}
                                </IonSelect>
                            </IonItem>
                        </IonList>
                    </IonItem>
                    <IonItem>
                        <IonList>
                            <IonItem>
                                <IonLabel>Produit</IonLabel>
                                <IonSelect interface="popover" placeholder="Choisissez un produit" onIonChange={(e: any) => { setIdProduit(e.target.value) }} id="produits">
                                    {
                                        optionsProduit.map((op) => (
                                            <IonSelectOption key={op.key} value={op.value}>{op.text}</IonSelectOption>
                                        ))
                                    }
                                </IonSelect>
                            </IonItem>
                        </IonList >
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Description</IonLabel>
                        <IonTextarea onIonChange={(e: any) => setDescription(e.detail.value)} id="description"></IonTextarea>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Durée(en heures)</IonLabel>
                        <IonInput type="number" placeholder="0" min="1" onIonChange={(e: any) => setDuree(e.target.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Prix minimum de vente</IonLabel>
                        <IonInput type="number" placeholder="0" min="0" onIonChange={(e: any) => setPrixMinVente(e.target.value)}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel>Ajouter une(des) image(s)(facultatif)</IonLabel>
                        <IonInput><input type="file" name="" id="" accept="image/*" multiple onChange={handleFile} /></IonInput>
                    </IonItem>
                    <Carousel photos={images}></Carousel>
                        <IonButton className="ion-margin-top" type="submit" expand="block" onClick={ajouterEnchere}>
                            Valider
                            </IonButton>
                </IonContent>
            </IonPage>
        );
    }
}
export default AjoutEnchere;
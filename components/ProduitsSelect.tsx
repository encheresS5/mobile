import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";

export interface Produits {
    produits: Array<any>;
}

const ProduitsSelect: React.FC<Produits> = ({ produits }) => {
    console.log("produits=>"+produits);
    
    return(
        <IonList>
            <IonItem>
                <IonSelect interface="popover" placeholder="Choisissez un produit">    
                {produits.map((produit)=>(
                    <IonSelectOption key={produit.idProduit} value={produit.idProduit}>{produit.nomProduit}</IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>
        </IonList >
    );
}

export default ProduitsSelect;
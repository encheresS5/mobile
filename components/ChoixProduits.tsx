import { IonCol, IonGrid, IonItem, IonRow } from "@ionic/react";
import CategorieSelect from "./CategorieSelect";
import ProduitsSelect from "./ProduitsSelect";

export interface CategoriesProduits{
    categories:Array<any>;
    produits:Array<any>;
}

const ChoixProduits: React.FC<CategoriesProduits> = ({categories,produits}) => {

    return (
        <IonItem>
            <IonGrid >
                <IonRow>
                    <IonCol size="sm-6">
                        <CategorieSelect categories={categories}></CategorieSelect>
                    </IonCol>
                    <IonCol size="sm-6">
                        <ProduitsSelect produits={produits}></ProduitsSelect>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonItem>
    );
}

export default ChoixProduits;
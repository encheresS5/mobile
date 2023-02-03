import { IonItem, IonList, IonSelect, IonSelectOption } from "@ionic/react";

export interface Categories{
    categories:Array<any>;
}

const CategorieSelect: React.FC<Categories> = ({categories}) => {
    console.log("categorie=>"+categories);
    
    return (
        <IonList>
            <IonItem>
                <IonSelect interface="popover" placeholder="Choisisser la catégorie">
                    {categories.map((categorie)=>(
                        <IonSelectOption key={categorie.idCategorie} value={categorie.idCategorie}>{ categorie.libelle }</IonSelectOption>
                    ))}
                </IonSelect>
            </IonItem>
        </IonList>
    );
}

export default CategorieSelect;
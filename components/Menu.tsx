import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useHistory, useLocation } from 'react-router-dom';
import { archiveOutline, archiveSharp, bookmarkOutline, card, heartOutline, heartSharp, list, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import './Menu.css';
import { deconnect } from '../models/sendRequest';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Ajouter un nouvel enchère',
    url: '/ajoutEnchere',
    iosIcon: paperPlaneOutline,
    mdIcon: paperPlaneSharp
  },
  {
    title: 'Recharger votre compte',
    url: '/rechargement',
    iosIcon: card,
    mdIcon: card
  },
  {
    title: 'Liste de vos enchères',
    url: '/listeEncheres',
    iosIcon: list,
    mdIcon: list
  },
  {
    title: 'Log in',
    url: '/login',
    iosIcon: 'log-in-outline',
    mdIcon: 'log-in-outline'
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const history=useHistory();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>E-nchère</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
          <IonItem>
            <IonButton onClick={()=>{
              deconnect(()=>{
                history.push('/login')
              })
            }}>Log out</IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;

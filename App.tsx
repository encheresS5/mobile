import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Inscription from './pages/Inscription';
import Login from './pages/Login';
import AjoutEnchere from './pages/AjoutEnchere';
import Rechargement from './pages/Rechargement';
import ListEncheres from './pages/ListEncheres';
import OneSignal from 'onesignal-cordova-plugin'

setupIonicReact();

const App: React.FC = () => {
  function OneSignalInit(): void {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // OneSignal.setLogLevel(6, 0);
  
    // NOTE: Update the setAppId value below with your OneSignal AppId.
    OneSignal.setAppId("f1adcc37-33d0-4f42-94fd-83286220a023");
    OneSignal.setNotificationOpenedHandler(function (jsonData) {
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    });
  
    // Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 7) to better communicate to your users what notifications they will get.
    OneSignal.promptForPushNotificationsWithUserResponse(function (accepted) {
      console.log("User accepted notifications: " + accepted);
    });
  }
  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <Redirect to="/login" />
            </Route>
            <Route path="/inscription" exact={true}>
              <Inscription />
            </Route>
            <Route path="/login" exact={true}>
              <Login />
            </Route>
            <Route path="/login/:error" exact={true}>
              <Login />
            </Route>
            <Route path="/ajoutEnchere" exact={true}>
              <AjoutEnchere />
            </Route>
            <Route path="/rechargement" exact={true}>
              <Rechargement />
            </Route>
            <Route path="/listeEncheres" exact={true}>
              <ListEncheres />
            </Route>
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { filmOutline, happyOutline, personOutline, planetOutline, transgenderOutline } from 'ionicons/icons';
import Movies from './pages/Movies';
import Characters from './pages/Characters';
import Species from './pages/Species';
import Planets from './pages/Planets';
import FunFacts from './pages/FunFacts';

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

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/movies" component={Movies} exact={true} />
          <Route path="/characters" component={Characters} exact={true} />
          <Route path="/species" component={Species} exact={true} />
          <Route path="/planets" component={Planets} exact={true} />
          <Route path="/funfacts" component={FunFacts} exact={true} />
          <Route path="/" render={() => <Redirect to="/funfacts" />} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="movies" href="/movies">
            <IonIcon icon={filmOutline} />
            <IonLabel>Movies</IonLabel>
          </IonTabButton>
          <IonTabButton tab="characters" href="/characters">
            <IonIcon icon={personOutline} />
            <IonLabel>Characters</IonLabel>
          </IonTabButton>
          <IonTabButton tab="species" href="/species">
            <IonIcon icon={transgenderOutline} />
            <IonLabel>Species</IonLabel>
          </IonTabButton>
          <IonTabButton tab="planets" href="/planets">
            <IonIcon icon={planetOutline} />
            <IonLabel>Planets</IonLabel>
          </IonTabButton>
          <IonTabButton tab="funfacts" href="/funfacts">
            <IonIcon icon={happyOutline} />
            <IonLabel>Fun Facts</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

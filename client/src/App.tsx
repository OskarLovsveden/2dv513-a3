import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonButton,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { filmOutline, happyOutline, homeOutline, personOutline, planetOutline, transgenderOutline } from 'ionicons/icons';
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
import Home from './pages/Home';

const App: React.FC = () => (
  <IonApp>
        <IonButton fill="outline" shape="round" size="small"  href="/" style={{position: 'absolute', top:0, left:0, zIndex: 5000}}><IonIcon icon={homeOutline}></IonIcon></IonButton>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/movies" component={Movies} exact={true} />
          <Route path="/characters" component={Characters} exact={true} />
          <Route path="/species" component={Species} exact={true} />
          <Route path="/planets" component={Planets} exact={true} />
          <Route path="/funfacts" component={FunFacts} exact={true} />
          <Route path="/" component={Home} exact={true} />
        </IonRouterOutlet>
        <IonTabBar slot="bottom" style={{"--background": "var(--ion-color-step-50)"}}>
          <IonTabButton tab="movies" href="/movies" style={{"--color-selected": "#eb445a"}}>
            <IonIcon icon={filmOutline} />
            <IonLabel>Movies</IonLabel>
          </IonTabButton>
          <IonTabButton tab="characters" href="/characters" style={{"--color-selected": "#eb445a"}}>
            <IonIcon icon={personOutline} />
            <IonLabel>Characters</IonLabel>
          </IonTabButton>
          <IonTabButton tab="species" href="/species" style={{"--color-selected": "#eb445a"}}>
            <IonIcon icon={transgenderOutline}/>
            <IonLabel>Species</IonLabel>
          </IonTabButton>
          <IonTabButton tab="planets" href="/planets" style={{"--color-selected": "#eb445a"}}>
            <IonIcon icon={planetOutline} />
            <IonLabel>Planets</IonLabel>
          </IonTabButton>
          <IonTabButton tab="funfacts" href="/funfacts" style={{"--color-selected": "#eb445a"}}>
            <IonIcon icon={happyOutline} />
            <IonLabel>Fun Facts</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;

import React from "react";
import { Redirect, Route } from "react-router-dom";
import { RouteProps } from "react-router";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import Home from "./pages/Home";
import ViewMessage from "./pages/ViewMessage";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// overmind
import { useApp } from "./overmind";

export interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute: React.SFC<PrivateRouteProps> = ({
  component: Component,
  ...props
}) => {
  const { state } = useApp();
  // use overmind to see if we have a user?
  let authUser = state.isLoggedIn;

  // if i have the login path, handle it differently...
  if (props.path === "/login") {
    return authUser ? <Redirect to="/" /> : <Route component={Login} />;
  }
  return (
    <Route
      {...props}
      render={(innerProps) => {
        return authUser ? (
          <Component {...innerProps} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

const App: React.FC = () => {
  const { state } = useApp();
  console.log(state.currentUser + "  " + state.initialized);
  return (
    <>
      {state.initialized === true ? (
        <IonApp>
          <IonReactRouter>
            <IonRouterOutlet>
              <PrivateRoute path="/login" component={Login} exact={true} />
              <Route
                path="/create-account"
                component={CreateAccount}
                exact={true}
              />
              <PrivateRoute path="/home" component={Home} exact={true} />
              <PrivateRoute
                path="/message/:id"
                component={ViewMessage}
                exact={true}
              />
              <Route exact path="/" render={() => <Redirect to="/home" />} />
            </IonRouterOutlet>
          </IonReactRouter>
        </IonApp>
      ) : null}
    </>
  );
};

export default App;

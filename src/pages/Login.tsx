import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonLabel,
  IonInput,
  IonItem,
  IonButton,
} from "@ionic/react";
import "./Home.css";
import { useApp } from "../overmind";
import { RouteComponentProps } from "react-router";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>("");

  // overmind actions
  const { actions, state } = useApp();

  const doLogin = async () => {
    console.log(email, password, error);

    let response = await actions.doLogin({ email, password });
    if (!state.error) {
      console.log(response);
      history.push("/home");
    } else {
      setError(state.error.message);
    }
  };

  return (
    <IonPage id="login-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Enter Your Credentials To Login</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {error}
            <IonItem>
              <IonLabel>Email</IonLabel>
              <IonInput
                type="email"
                onIonChange={(e) => setEmail(e.detail.value as string)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>Password</IonLabel>
              <IonInput
                type="password"
                onIonChange={(e) => setPassword(e.detail.value as string)}
              ></IonInput>
            </IonItem>
            <IonButton onClick={() => doLogin()}>LOGIN</IonButton>
            <IonButton onClick={() => history.push("/create-account")}>
              CREATE ACCOUNT
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Login;

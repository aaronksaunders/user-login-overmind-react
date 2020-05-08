import MessageListItem from "../components/MessageListItem";
import React, { useState } from "react";
import { Message, getMessages } from "../data/messages";
import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import "./Home.css";
import { useApp } from "../overmind";
import { RouteComponentProps } from "react-router";

const Home: React.FC<RouteComponentProps> = ({ history }) => {
  const { actions } = useApp();

  const [messages, setMessages] = useState<Message[]>([]);

  useIonViewWillEnter(() => {
    const msgs = getMessages();
    setMessages(msgs);
  });

  const refresh = (e: CustomEvent) => {
    setTimeout(() => {
      e.detail.complete();
    }, 3000);
  };

  const doLogout = async () => {
    await actions.doLogout();
    history.push("/login");
  };

  return (
    <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => doLogout()}>LOGOUT</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          {messages.map((m) => (
            <MessageListItem key={m.id} message={m} />
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

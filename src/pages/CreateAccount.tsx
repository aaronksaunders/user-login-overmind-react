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

// react-hook-form
import { useForm, Controller } from "react-hook-form";

const CreateAccount: React.FC<RouteComponentProps> = ({ history }) => {
  const [error, setError] = useState<string | null>("");

  //react-hook-form
  const { control, errors, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  // overmind actions
  const { actions } = useApp();

  /**
   * on submit call this function to create the user
   */
  const doCreateAccount = async (data: any) => {
    console.log(data);
    try {
      // return from react-hook-form when all fields are
      // valid
      const { email, firstName, lastName, password } = data;
      let response = await actions.createAccountAndUserRecord({
        email,
        firstName,
        lastName,
        password,
      });
      console.log(response);
      history.push("/home");
    } catch (error) {
      debugger;
      setError(error.message);
    }
  };

  // log form errors
  console.log(errors);

  return (
    <IonPage id="create-account-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create Account</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              Enter Your Information To Create Your Account
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {error}
            <form onSubmit={handleSubmit(doCreateAccount)}>
              <IonItem>
                <IonLabel>Email</IonLabel>
                <Controller
                  as={<IonInput type="email"></IonInput>}
                  onChangeName="onIonChange"
                  name="email"
                  rules={{ required: true }}
                  control={control}
                />
              </IonItem>
              <IonItem>
                <IonLabel>First Name</IonLabel>
                <Controller
                  as={<IonInput type="text"></IonInput>}
                  onChangeName="onIonChange"
                  name="firstName"
                  rules={{ required: true }}
                  control={control}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Last Name</IonLabel>
                <Controller
                  as={<IonInput type="text"></IonInput>}
                  onChangeName="onIonChange"
                  name="lastName"
                  rules={{ required: true }}
                  control={control}
                />
              </IonItem>
              <IonItem>
                <IonLabel>Password</IonLabel>
                <Controller
                  as={<IonInput type="password"></IonInput>}
                  onChangeName="onIonChange"
                  name="password"
                  rules={{ required: true }}
                  control={control}
                />
              </IonItem>
              <IonButton type="submit">Create CreateAccount</IonButton>
              <IonButton onClick={() => history.goBack()}>CANCEL</IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CreateAccount;

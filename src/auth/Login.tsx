import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { IonButton, IonContent, IonHeader, IonInput, IonLoading, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { AuthContext, AuthProvider, Storage } from './AuthProvider';
import { getLogger } from '../core';
import { Plugins } from '@capacitor/core';

const log = getLogger('Login');
// const { Storage } = Plugins;

interface LoginState {
  username?: string;
  password?: string;
}

// function demoStorage() {
//   (async () => {
    

//     // Saving ({ key: string, value: string }) => Promise<void>
    

//     // Loading value by key ({ key: string }) => Promise<{ value: string | null }>
//     const res = await Storage.get({ key: 'user' });
//     if (res.value) {
//       console.log('User foundddddd', JSON.parse(res.value));
//     } else {
//       console.log('User not foundddddd');
//     }

//     // // Loading keys () => Promise<{ keys: string[] }>
//     // const { keys } = await Storage.keys();
//     // console.log('Keys found', keys);

//     // // Removing value by key, ({ key: string }) => Promise<void>
//     // await Storage.remove({ key: 'user' });
//     // console.log('Keys found after remove', await Storage.keys());

//     // // Clear storage () => Promise<void>
//     // await Storage.clear();
//   })();
// }

export const Login: React.FC<RouteComponentProps> = ({ history }) => {
  var { isAuthenticated, isAuthenticating, login, authenticationError } = useContext(AuthContext);
  const [state, setState] = useState<LoginState>({});
  const { username, password } = state;
  const handleLogin = async () => {
    log('handleLogin...');
    login?.(username, password);
    // demoStorage();
    // const res = await Storage.get({ key: 'user' });
    // if (res.value) {
    //   console.log('User foundddddd', JSON.parse(res.value));
    //   isAuthenticated = true;
    // } else {
    //   console.log('User not foundddddd');
    //   isAuthenticated = false;
    // }
  };
  log('render');
  if (isAuthenticated) {
    return <Redirect to={{ pathname: '/tabs' }} />
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          placeholder="Username"
          value={username}
          onIonChange={e => setState({
            ...state,
            username: e.detail.value || ''
          })}/>
        <IonInput
          placeholder="Password"
          type = "password"
          value={password}
          onIonChange={e => setState({
            ...state,
            password: e.detail.value || ''
          })}/>
        <IonLoading isOpen={isAuthenticating}/>
        {authenticationError && (
          <div>{authenticationError.message || 'Failed to authenticate'}</div>
        )}
        <IonButton onClick={handleLogin}>Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

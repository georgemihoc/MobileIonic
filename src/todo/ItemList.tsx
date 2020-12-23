import React, { useContext, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonList, IonLoading,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Item from './Item';
import { getLogger } from '../core';
import { ItemContext } from './ItemProvider';

const log = getLogger('ItemList');

const ItemList: React.FC<RouteComponentProps> = ({ history }) => {
  const { items, fetching, fetchingError } = useContext(ItemContext);
  const [searchItem, setSearchItem] = useState<string>('');
  log('render');
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>To do</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <IonSearchbar
          value={searchItem}
          debounce={1000}
          onIonChange={e => setSearchItem(e.detail.value!)}>
        </IonSearchbar>
        <IonLoading isOpen={fetching} message="Fetching items"/>
        {items && (
          <IonList>
            {items
            .filter(currentItem => {
              if (currentItem.text && setSearchItem) {
                return (currentItem.text.toLowerCase().indexOf(searchItem.toLowerCase()) > -1);
              }})
            
            // .filter(item => item.indexOf(searchBreed) >= 0)
            .map(({ _id, text, completed }) =>
              <Item key={_id} _id={_id} completed={completed} text={text} onEdit={id => history.push(`/item/${id}`)}/>)}
          </IonList>
        )}
        {fetchingError && (
          <div>{fetchingError.message || 'Failed to fetch items'}</div>
        )}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/item')}>
            <IonIcon icon={add}/>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default ItemList;

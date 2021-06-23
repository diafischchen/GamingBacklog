<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="systems" href="/tabs/systems">
          <ion-icon :icon="home" />
          <ion-label>Systems</ion-label>
        </ion-tab-button>
          
        <ion-tab-button tab="games" href="/tabs/games">
          <ion-icon :icon="gameController" />
          <ion-label>Games</ion-label>
        </ion-tab-button>
        
        <ion-tab-button tab="completed" href="/tabs/completed">
          <ion-icon :icon="checkmarkCircle" />
          <ion-label>Completed</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle, gameController, home, checkmarkCircle } from 'ionicons/icons';

export default {
  name: 'Tabs',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
      gameController,
      home,
      checkmarkCircle,
    }
  }
}
</script>
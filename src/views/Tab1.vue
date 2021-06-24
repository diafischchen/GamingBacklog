<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Systems</ion-title>
        <TopMenuContainer />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <ExploreContainer name="Systems" />
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import TopMenuContainer from '@/components/TopMenuContainer.vue';

export default  {
  name: 'Tab1',
  components: { ExploreContainer, TopMenuContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
}
</script>
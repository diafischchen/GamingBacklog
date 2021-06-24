<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed</ion-title>
        <TopMenuContainer />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      
      <ExploreContainer name="Completed" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import TopMenuContainer from '@/components/TopMenuContainer.vue';

export default  {
  name: 'Tab3',
  components: { ExploreContainer, TopMenuContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>
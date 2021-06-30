<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Completed</ion-title>
        <TopMenuContainer />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <GamesContainer system="all" completed="true" tab="Completed" />

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import TopMenuContainer from '@/components/TopMenuContainer.vue';
import GamesContainer from '@/components/GamesContainer.vue';

export default  {
  name: 'Tab3',
  components: { TopMenuContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, GamesContainer }
}
</script>
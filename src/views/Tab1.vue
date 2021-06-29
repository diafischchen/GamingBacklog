<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Systems</ion-title>
        <TopMenuContainer v-on:update-systems="update()" />
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">

      <SystemsContainer ref="systemsContainer" />
      
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import SystemsContainer from '@/components/SystemsContainer.vue';
import TopMenuContainer from '@/components/TopMenuContainer.vue';
import { ref } from 'vue';

export default  {
  name: 'Tab1',
  components: { SystemsContainer, TopMenuContainer, IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  methods: {
    async update() {
      console.log('update');
      this.runUpdate();
    }
  },
  setup() {
    const systemsContainer = ref<InstanceType<typeof SystemsContainer>>();

    const runUpdate = async () => { 
      systemsContainer.value!.update();
    }

    return { 
      runUpdate,
      systemsContainer
    }
  }
}
</script>
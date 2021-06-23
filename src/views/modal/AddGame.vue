<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Add Game</ion-title>
            <CloseModalButton />
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
        <ion-item>
            <ion-label position="floating">Game Name</ion-label>
            <ion-input></ion-input>
        </ion-item>
    </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import CloseModalButton from '@/components/CloseModalButton.vue';

export default defineComponent({
    name: 'AddGameModal',
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonInput,
        IonLabel,
        IonItem,
        CloseModalButton
    },
});
</script>
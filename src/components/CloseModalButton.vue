<template>
    <ion-buttons slot="primary">
        <ion-button @click="dismiss">
            <ion-icon slot="icon-only" :icon="close"></ion-icon>
        </ion-button>
    </ion-buttons>
</template>

<script lang="ts">
import { IonButtons, IonButton, IonIcon, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { close } from 'ionicons/icons';

export default defineComponent({
    name: 'CloseModalButton',
    components: {
        IonButtons, 
        IonButton,
        IonIcon
    },
    methods: {
        async dismiss() {
            await modalController.dismiss();
        }
    },
    setup() {
        return {
            close
        }
    }
})
</script>

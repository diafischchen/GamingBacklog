<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button default-href="/"></ion-back-button>
                </ion-buttons>
                <ion-title>{{ title }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonContent, IonToolbar, IonBackButton } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'DetailsContainer',
    components: {
        IonPage,
        IonHeader,
        IonContent,
        IonToolbar,
        IonBackButton
    },
    props: {
        title: String
    }
})
</script>

<template>
    <ion-buttons slot="primary">
        <ion-button @click="presentActionSheet">
            <ion-icon slot="icon-only" :icon="addCircle"></ion-icon>
        </ion-button>
    </ion-buttons>
</template>

<script lang="ts">
import { IonButton, IonButtons, IonIcon, actionSheetController, modalController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addCircle } from 'ionicons/icons';
import AddGame from '@/views/modal/AddGame.vue';
import AddSystem from '@/views/modal/AddSystem.vue';

export default defineComponent({
    name: 'TopMenuContainer',
    components: {
        IonButton,
        IonButtons,
        IonIcon
    },
    methods: {
        async openAddGameModal() {
            const modal = await modalController
                .create({
                    component: AddGame
                });
            return modal.present();
        },
        async openAddSystemModal() {
            const modal = await modalController
                .create({
                    component: AddSystem
                });
            return modal.present();
        },
        async presentActionSheet() {
            const actionSheet = await actionSheetController.create({
                buttons: [
                    {
                        text: 'Add System',
                        handler: () => {
                            this.openAddSystemModal();
                        }
                    },
                    {
                        text: 'Add Game',
                        handler: () => {
                            this.openAddGameModal();
                        }
                    },
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            console.log('clicked cancle')
                        }
                    }
                ]
            });
            await actionSheet.present();

            const { role } = await actionSheet.onDidDismiss();
            console.log('onDidDismiss resolved with role', role);
        }
    },
    setup() {
        return {
            addCircle
        }
    },
})
</script>

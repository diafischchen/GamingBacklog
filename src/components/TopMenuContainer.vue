<template>
    <ion-buttons slot="primary">
        <ion-button @click="presentActionSheet">
            <ion-icon slot="icon-only" :icon="addCircle"></ion-icon>
        </ion-button>
    </ion-buttons>
</template>

<script lang="ts">
import { IonButton, IonButtons, IonIcon, actionSheetController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { addCircle } from 'ionicons/icons';

export default defineComponent({
    name: 'TopMenuContainer',
    components: {
        IonButton,
        IonButtons,
        IonIcon
    },
    methods: {
        async presentActionSheet() {
            const actionSheet = await actionSheetController
                .create({
                    buttons: [
                        {
                            text: 'Add System',
                            handler: () => {
                                console.log('clicked add system');
                            }
                        },
                        {
                            text: 'Add Game',
                            handler: () => {
                                console.log('clicked add game');
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

<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Game Details</ion-title>
            <CloseModalButton />
        </ion-toolbar>
    </ion-header>
    <ion-content>
        <img class="top-image" :src="game.image" />
        <div v-if="game.completed != true" class="ion-padding text-container">
            <h3 style="margin-top: 0px">{{ game.name }}</h3>
            <p>{{ game.desc }}</p>
        </div>
        <div v-else class="ion-padding text-container-double">
            <h3 style="margin-top: 0px">{{ game.name }}</h3>
            <p>{{ game.desc }}</p>
        </div>
        <div v-if="game.completed != true" class="bottom-button ion-padding">
            <ion-button :disabled="buttonDisabled" expand="block" @click="completeGame(game.id)">Completed Game</ion-button>
            
        </div>
        <div v-else class="bottom-button ion-padding">
            <ion-button :disabled="buttonDisabled" expand="block" color="danger" style="margin-bottom: 10px;" @click="deleteGame(game.id)">Delete Game</ion-button>
            <ion-button :disabled="buttonDisabled" expand="block" @click="completeGame(game.id, false)">Uncomplete Game</ion-button>
        </div>
    </ion-content>
</template>

<script lang="ts">
import { IonHeader, IonToolbar, IonTitle, IonContent, modalController, alertController, isPlatform } from '@ionic/vue';
import { defineComponent } from 'vue';
import CloseModalButton from '@/components/CloseModalButton.vue';

import { Storage } from '@capacitor/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default defineComponent({
    name: 'GameDetails',
    props: {
        game: {},
    },
    methods: {
        async completeGame(gameId: string, completed = true) {

            this.buttonDisabled = true;

            // get all entries
            const entries = await Storage.get({ key: 'games' })

            if (!entries.value) {
                entries.value = 'null';
            }

            const allEntries = JSON.parse(entries.value);

            // get entry with the id
            const updateEntryKey = allEntries.findIndex((entry: { id: string }) => {
                return entry.id == gameId;
            });

            // update Entry
            allEntries[updateEntryKey].completed = completed;

            // save
            await Storage.set({
                key: 'games',
                value: JSON.stringify(allEntries)
            });

            // daten auf dismiss senden und onDismiss 
            await modalController.dismiss();

        },

        async deleteGame(gameId: string) {

            this.buttonDisabled = true;

            // confirm deletion
            await this.agree();
            if (!this.deleteAgree) {
                this.buttonDisabled = false;
                return
            }

            // get all entries
            const entries = await Storage.get({ key: 'games' })

            if (!entries.value) {
                entries.value = 'null';
            }

            const allEntries = JSON.parse(entries.value);

            // get entry with the id
            const updateEntryKey = allEntries.findIndex((entry: { id: string }) => {
                return entry.id == gameId;
            });

            // delete image
            if (allEntries[updateEntryKey].image != '') {
                await this.deleteImage(allEntries[updateEntryKey].image);
            }

            // update Entry
            allEntries.splice(updateEntryKey, 1);

            // save
            await Storage.set({
                key: 'games',
                value: JSON.stringify(allEntries)
            });

            // daten auf dismiss senden und onDismiss 
            await modalController.dismiss();

        },

        async deleteImage(imagePath: string) {
            
            if (!isPlatform('hybrid')) {
                return await Filesystem.deleteFile({
                    path: imagePath,
                    directory: Directory.Data
                });
            } else {
                return await Filesystem.deleteFile({
                    path: imagePath
                });  
            }

        },

        async agree() {

            const alert = await alertController.create({
                header: 'Confirm deletion',
                message: 'Are you sure want to delete this game?',
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        handler: () => {
                            this.deleteAgree = false;
                        }
                    },
                    {
                        text: 'Confirm',
                        handler: () => {
                            this.deleteAgree = true;
                        }
                    }
                ]
            });

            await alert.present();

            return await alert.onDidDismiss();

        }
    },
    components: {
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        CloseModalButton
    },
    data() {
        return {
            buttonDisabled: false,
            deleteAgree: false
        }
    }
})
</script>

<style scoped>

.top-image {
    max-height: 100vw;
    width: 100%;
    object-fit: contain;
}

.text-container {
    margin-bottom: 60px;
}

.text-container-double {
    margin-bottom: 110px;
}

.bottom-button {
    background-image: linear-gradient(0deg, white 80%, transparent 100%);
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    padding-top: 30px;
}

</style>
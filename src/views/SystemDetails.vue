<template>
    <details-container title="System Details">
        <img class="top-image" :src="system.image" />
        <div class="ion-padding text-container">
            <h3 style="margin-top: 0px">{{ system.name }}</h3>
            <p>{{ system.desc }}</p>
        </div>
        <div class="bottom-button ion-padding">
            <ion-button expand="block" :disabled="buttonDisabled" color="danger" style="margin-bottom: 10px;" @click="deleteSystem(routeId)">Delete System</ion-button>
            <ion-button expand="block" :router-link="`/system/${routeId}/games`">Show Games</ion-button>
        </div>
    </details-container>
</template>

<script lang="ts">
import { isPlatform, IonButton, alertController } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import DetailsContainer from '@/views/DetailsContainer.vue';
import EventBus from '@/EventBus';

import { Storage } from '@capacitor/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default defineComponent({
    name: 'SystemDetails',
    components: {
        DetailsContainer,
        IonButton
    },
    methods: {

        async getData() {
            const entries = await Storage.get({ key: 'systems' })

            if (!entries.value) {
                entries.value = 'null';
            }

            const systems = JSON.parse(entries.value);

            const system = systems.filter((system: { id: string }) => system.id == this.routeId)[0]

            if (!isPlatform('hybrid')) {

                if (system.image != '') {
                    const file = await Filesystem.readFile({
                        path: system.image,
                        directory: Directory.Data
                    });
                    system.image = `data:image/jpeg;base64,${file.data}`;
                } else {
                    system.image = '/assets/fallback_image.png';
                }

            } else {

                if (system.image == '') {
                    system.image = '/assets/fallback_image.png';
                }

            }

            this.system = system;
        },

        hasHistory () { return window.history.length > 2 },

        async deleteSystem(systemId: string) {

            this.buttonDisabled = true;

            // confirm deletion
            await this.agree();
            if (!this.deleteAgree) {
                this.buttonDisabled = false;
                return
            }

            // get all entries
            const entries = await Storage.get({ key: 'systems' })

            if (!entries.value) {
                entries.value = 'null';
            }

            const allEntries = JSON.parse(entries.value);

            // get entry with the id
            const updateEntryKey = allEntries.findIndex((entry: { id: string }) => {
                return entry.id == systemId;
            });

            // delete image
            if (allEntries[updateEntryKey].image != '') {
                await this.deleteImage(allEntries[updateEntryKey].image);
            }

            // update Entry
            allEntries.splice(updateEntryKey, 1);

            // save
            await Storage.set({
                key: 'systems',
                value: JSON.stringify(allEntries)
            });

            // update list
            EventBus().emitter.emit("update-systems");

            // daten auf dismiss senden und onDismiss 
            if (this.hasHistory()) {
                this.router.back();
            } else {
                this.router.push('/');
            }

        },

        async deleteImage(imagePath: string) {
            
            return await Filesystem.deleteFile({
                path: imagePath,
                directory: Directory.Data
            });

        },

        async agree() {

            const alert = await alertController.create({
                header: 'Confirm deletion',
                message: 'Are you sure want to delete this system?',
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
    setup() {
        const route = useRoute();
        const routeId = route.params.id;
        const router = useRouter();
        return {
            router,
            routeId,
            system: [],
            deleteAgree: false,
            buttonDisabled: false
        }
    },
    created() {
        this.getData();
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
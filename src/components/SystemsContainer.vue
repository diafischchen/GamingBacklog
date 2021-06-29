<template>
    <ion-list>
        <ion-item v-for="system in systems" :key="system.id">
            <ion-thumbnail slot="start">
                <ion-img :src="system.image" />
            </ion-thumbnail>
            <ion-label>
                <h3>{{ system.name }}</h3>
                <p>{{ system.desc }}</p>
            </ion-label>
        </ion-item>
    </ion-list>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel, IonThumbnail, IonImg, isPlatform } from '@ionic/vue';
import { defineComponent } from 'vue'

import { Storage } from '@capacitor/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default defineComponent({
    name: 'SystemsContainer',
    components: {
        IonList,
        IonItem,
        IonLabel,
        IonThumbnail,
        IonImg
    },
    data() {
        return {
            systems: [
                // Der Aufbau eines Systems
                {
                    id: '1',
                    name: 'Something went wrong',
                    desc: 'Please try restart your app',
                    image: '/assets/fallback_image.png'
                }
            ],
            dataDir: Directory.Data,
        }
    },
    async mounted() {
        const entries = await Storage.get({ key: 'systems' })

        if (!entries.value) {
            entries.value = 'null';
        }

        this.systems = JSON.parse(entries.value);

        if (!isPlatform('hybrid')) {

            for (const system of this.systems) {
                if (system.image != '') {
                    const file = await Filesystem.readFile({
                        path: system.image,
                        directory: Directory.Data
                    });
                    system.image = `data:image/jpeg;base64,${file.data}`;
                } else {
                    system.image = '/assets/fallback_image.png';
                }
            }

        } else {

            for (const system of this.systems) {
                if (system.image == '') {
                    system.image = '/assets/fallback_image.png';
                }
            }

        }
    }
})
</script>

<template>
    <ion-list v-for="system in systems" :key="system.id">
        <ion-item>
            <ion-thumbnail slot="start">
                <img :src="system.image" />
            </ion-thumbnail>
            <ion-label>
                {{ system.name }}
            </ion-label>
        </ion-item>
    </ion-list>
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel, IonThumbnail } from '@ionic/vue';
import { defineComponent } from 'vue'

import { Storage } from '@capacitor/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default defineComponent({
    name: 'SystemsContainer',
    components: {
        IonList,
        IonItem,
        IonLabel,
        IonThumbnail
    },
    methods: {
        // das muss in mounted
        async getImage(imageName: string) {
            const file = await Filesystem.readFile({
                path: imageName,
                directory: Directory.Data
            });
            return `data:image/jpeg;base64,${file.data}`;
        }
    },
    data() {
        return {
            systems: [
                {
                    id: '1',
                    name: 'NES',
                    desc: 'Nintendo Entertainment System',
                    image: '/assets/fallback_image.png'
                },
                {
                    id: '2',
                    name: 'SNES',
                    desc: 'Super Nintendo Entertainment System',
                    image: '/assets/fallback_image.png'
                },
                {
                    id: '3',
                    name: 'N64',
                    desc: 'Nintendo 64',
                    image: '/assets/fallback_image.png'
                },
                {
                    id: '556546',
                    name: 'SGM',
                    desc: 'Sus Gaming Machine',
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
    }
})
</script>

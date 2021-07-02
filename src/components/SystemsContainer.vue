<template>
    <ion-list v-if="this.systems != undefined && this.systems.length != 0">
        <ion-item v-for="system in systems" :key="system.id" :router-link="'/system/' + system.id">
            <ion-thumbnail slot="start">
                <ion-img :src="system.image" />
            </ion-thumbnail>
            <ion-label>
                <h3>{{ system.name }}</h3>
                <p>{{ system.desc }}</p>
            </ion-label>
        </ion-item>
    </ion-list>
    <ExploreContainer v-else name="Systems" />
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel, IonThumbnail, IonImg, isPlatform } from '@ionic/vue';
import { defineComponent } from 'vue'
import ExploreContainer from '@/components/ExploreContainer.vue';
import EventBus from '@/EventBus';

import { Storage } from '@capacitor/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';


export default defineComponent({
    name: 'SystemsContainer',
    components: {
        IonList,
        IonItem,
        IonLabel,
        IonThumbnail,
        IonImg,
        ExploreContainer
    },
    methods: {
        async update() {
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
                    } else {
                        system.image = Capacitor.convertFileSrc(system.image);
                    }
                }

            }
        }
    },
    data() {
        return {
            systems: Array({id: '', name: '', desc: '', image: ''}),
        }
    },
    mounted() {
        this.update();
        EventBus().emitter.on("update-systems", (payload: any) => {
            this.update();
        });
    }
})
</script>

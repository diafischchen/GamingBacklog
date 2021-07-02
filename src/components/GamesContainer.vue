<template>
    <ion-list v-if="this.filteredGames != null">
        <ion-item v-for="game in filteredGames" :key="game.id" @click="openGameModal(game)">
            <ion-thumbnail slot="start">
                <ion-img :src="game.image" />
            </ion-thumbnail>
            <ion-label>
                <h3>{{ game.name }}</h3>
                <p>{{ game.desc }}</p>
            </ion-label>
        </ion-item>
    </ion-list>
    <ExploreContainer v-else :name="tab" />
</template>

<script lang="ts">
import { IonList, IonItem, IonLabel, IonThumbnail, IonImg, isPlatform, modalController } from '@ionic/vue';
import { defineComponent } from 'vue'
import ExploreContainer from '@/components/ExploreContainer.vue';
import GameDetails from '@/views/modal/GameDetails.vue';
import EventBus from '@/EventBus';

import { Storage } from '@capacitor/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Capacitor } from '@capacitor/core';


export default defineComponent({
    name: 'GamesContainer',
    props: {
        system: String,
        completed: String,
        tab: String
    },
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
            const entries = await Storage.get({ key: 'games' })

            if (!entries.value) {
                entries.value = 'null';
            }

            this.games = JSON.parse(entries.value);

            if (!isPlatform('hybrid')) {

                for (const game of this.games) {
                    if (game.image != '') {
                        const file = await Filesystem.readFile({
                            path: game.image,
                            directory: Directory.Data
                        });
                        game.image = `data:image/jpeg;base64,${file.data}`;
                    } else {
                        game.image = '/assets/fallback_image.png';
                    }
                }

            } else {

                for (const game of this.games) {
                    if (game.image == '') {
                        game.image = '/assets/fallback_image.png';
                    } else {
                        game.image = Capacitor.convertFileSrc(game.image);
                    }
                }

            }
        },
        async openGameModal(game: any) {
            const modal = await modalController
                .create({
                    component: GameDetails,
                    componentProps: { game: game }
                });
            await modal.present();
            
            await modal.onDidDismiss();
            return await EventBus().emitter.emit("update-games");
        }
    },
    data() {
        return {
            games: Array({id: '', name: '', desc: '', system: '', image: '', completed: false}),
        }
    },
    computed: {
        filteredGames(): any {
            let filteredGamesArr = this.games;

            if (this.system != 'all') {
                if (filteredGamesArr != undefined)
                filteredGamesArr = filteredGamesArr.filter(game => game.system == this.system);
            }

            if (this.completed == 'true') {
                if (filteredGamesArr != undefined)
                filteredGamesArr = filteredGamesArr.filter(game => game.completed);
            } else {
                if (filteredGamesArr != undefined)
                filteredGamesArr = filteredGamesArr.filter(game => !game.completed);
            }

            if (filteredGamesArr == undefined || filteredGamesArr.length == 0) {
                return null
            } else {
                return filteredGamesArr;
            }
        }
    },
    mounted() {
        this.update();
        EventBus().emitter.on("update-games", (payload: any) => {
            this.update();
        });
    }
})
</script>
<template>
    <details-container :title="system.name">
        <img class="top-image" :src="system.image" />
        <h3>{{ system.name }}</h3>
        <p>{{ system.desc }}</p>
    </details-container>
</template>

<script lang="ts">
import { isPlatform } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import DetailsContainer from '@/views/DetailsContainer.vue';

import { Storage } from '@capacitor/storage';
import { Filesystem, Directory } from '@capacitor/filesystem';

export default defineComponent({
    name: 'SystemDetails',
    components: {
        DetailsContainer
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
        }
    },
    setup() {
        const route = useRoute();
        const routeId = route.params.id;
        return {
            routeId,
            system: []
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

</style>
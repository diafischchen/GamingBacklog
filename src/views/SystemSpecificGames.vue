<template>
    <details-container :title="`Games for ${system.name}`">
        <GamesContainer :system="routeId" completed="false" tab="Games" />
    </details-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRoute } from 'vue-router';
import DetailsContainer from '@/views/DetailsContainer.vue';
import GamesContainer from '@/components/GamesContainer.vue';

import { Storage } from '@capacitor/storage';

export default defineComponent({
    name: 'SystemSpecificGames',
    components: {
        DetailsContainer,
        GamesContainer
    },
    methods: {
        async getData() {
            const entries = await Storage.get({ key: 'systems' })

            if (!entries.value) {
                entries.value = 'null';
            }

            const systems = JSON.parse(entries.value);

            const system = systems.filter((system: { id: string }) => system.id == this.routeId)[0];

            this.system = system;
        }
    },
    setup() {
        const route = useRoute();
        const routeId = route.params.id;
        return {
            routeId,
            system: {}
        }
    },
    created() {
        this.getData();
    }
})
</script>

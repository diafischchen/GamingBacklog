<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Add System</ion-title>
            <CloseModalButton />
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding form">
        <div class="form-input">
            <ion-item>
                <ion-label position="floating">System Name</ion-label>
                <ion-input></ion-input>
            </ion-item>
        </div>
        <div class="form-input">
            <div class="image-preview"></div>
            <ion-button expand="block">Choose Image</ion-button>
        </div>
    </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import CloseModalButton from '@/components/CloseModalButton.vue';

export default defineComponent({
    name: 'AddSystemModel',
    components: {
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        IonInput,
        IonLabel,
        IonItem,
        CloseModalButton
    },
});
</script>

<style scoped>

.form .form-input {
    margin-bottom: 20px;
}

.form .form-input:last-child {
    margin-bottom: 0;
}

.form .form-input .image-preview {
    width: 100%;
    background: black;
    height: 200px;
    margin-bottom: 7px;
}

</style>
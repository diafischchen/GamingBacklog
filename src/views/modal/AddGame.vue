<template>
    <ion-header>
        <ion-toolbar>
            <ion-title>Add Game</ion-title>
            <CloseModalButton />
        </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding form">
        <div class="form-input">
            <ion-item>
                <ion-label position="floating">Game Name</ion-label>
                <ion-input v-model="form.name"></ion-input>
            </ion-item>
        </div>
        <div class="form-input">
            <div class="image-preview"></div>
            <ion-button expand="block">Choose Image</ion-button>
        </div>
        <div class="form-input">
            <ion-item>
                <ion-label position="floating">Game Desc</ion-label>
                <ion-textarea @input="form.desc=$event.target.value"></ion-textarea>
            </ion-item>
        </div>
        <div class="form-input">
            <ion-button expand="block" :disabled="formDisabled">Save Game</ion-button>
        </div>
    </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import CloseModalButton from '@/components/CloseModalButton.vue';

export default defineComponent({
    name: 'AddGameModal',
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
    data() {
        return {
            form: {
                name: '',
                desc: '',
            }
        }
    },
    computed: {
        formDisabled() {
            if (this.form.name != '' && this.form.desc != '') {
                return false;
            } else {
                return true;
            }
        }
    }
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
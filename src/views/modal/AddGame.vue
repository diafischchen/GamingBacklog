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
            <ion-item>
                <ion-thumbnail slot="start">
                    <img :src="previewImageUrl" />
                </ion-thumbnail>
                <ion-button fill="clear" @click="importPicture">
                    <ion-icon slot="start" :icon="images"></ion-icon>Choose Picture
                </ion-button>
            </ion-item>
        </div>
        <div class="form-input">
            <ion-item>
                <ion-label position="floating">Game Desc</ion-label>
                <ion-textarea @input="form.desc=$event.target.value"></ion-textarea>
            </ion-item>
        </div>
        <div class="form-input">
            <ion-item>
                <ion-label>System</ion-label>
                <ion-select placeholder="select system" v-model="form.system">
                    <ion-select-option value="no system">No System</ion-select-option>
                    <ion-select-option v-for="system in systems" :key="system.id" :value="system.id">{{ system.name }}</ion-select-option>
                </ion-select>
            </ion-item>
        </div>
        <div class="form-input">
            <ion-button @click="save" expand="block" :disabled="formDisabled">Save Game</ion-button>
        </div>
    </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonThumbnail, IonIcon, IonSelect, IonSelectOption } from '@ionic/vue';
import { defineComponent } from 'vue';
import { images } from 'ionicons/icons';
import CloseModalButton from '@/components/CloseModalButton.vue';

import { Camera, CameraResultType } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';

const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

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
        IonThumbnail,
        IonIcon,
        IonSelect,
        IonSelectOption,
        CloseModalButton
    },
    methods: {
        async importPicture() {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                quality: 60
            });

            if (photo.webPath) {
                this.previewImageUrl = photo.webPath;
            }
        },

        async savePicture(photoWebPath: string, fileName: string) {
            const response = await fetch(photoWebPath);
            const blob = await response.blob();

            const base64Data = await convertBlobToBase64(blob) as string;

            await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Data
            });

            return {
                filepath: fileName,
                webPath: photoWebPath
            }
        },

        async save() {
            // get all entries
            const entries = await Storage.get({ key: 'games' })

            if (!entries.value) {
                entries.value = 'null';
            }

            const preEntries = JSON.parse(entries.value);

            // save image and get file name
            let fileName = '';
            if (this.previewImageUrl != '') {
                fileName = new Date().getTime() + '.jpeg';
                await this.savePicture(this.previewImageUrl, fileName);
            }


            // generate new entry
            const newEntry = {
                id: new Date().getTime(),
                name: this.form.name,
                desc: this.form.desc,
                image: fileName,
                system: this.form.system,
                completed: false
            }

            // alle entries wieder zusammensetzen mit dem neuen
            let saveEntries

            if (preEntries) {
                saveEntries = [newEntry, ...preEntries];
            } else {
                saveEntries = [newEntry];
            }

            // save
            await Storage.set({
                key: 'games',
                value: JSON.stringify(saveEntries)
            });
        }
    },
    data() {
        return {
            form: {
                name: '',
                desc: '',
                system: '',
            },
            images,
            previewImageUrl: '/assets/fallback_image.png',
            systems: [],
        }
    },
    computed: {
        formDisabled() {
            if (this.form.name != '' && this.form.system != '') {
                return false;
            } else {
                return true;
            }
        }
    },
    async created() {
        const entries = await Storage.get({ key: 'systems' })

        if (!entries.value) {
            entries.value = 'null';
        }

        this.systems = JSON.parse(entries.value);
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
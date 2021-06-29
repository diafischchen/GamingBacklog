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
                <ion-label position="floating">System Desc</ion-label>
                <ion-textarea @input="form.desc=$event.target.value"></ion-textarea>
            </ion-item>
        </div>
        <div class="form-input">
            <ion-button @click="save" expand="block" :disabled="formDisabled">Save System</ion-button>
        </div>
    </ion-content>
</template>

<script lang="ts">
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonThumbnail, IonIcon, isPlatform } from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import { images } from 'ionicons/icons';
import CloseModalButton from '@/components/CloseModalButton.vue';

import { Camera, CameraResultType, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

const convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});

export default defineComponent({
    name: 'AddSystemModal',
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
        CloseModalButton
    },
    methods: {
        //  Die Erste der 3 Methoden
        //  Das Bild an Sich wird aufgenommen und das resultierende <Photo> zwischengespeichert
        //  --------------------
        async importPicture() {
            const photo = await Camera.getPhoto({
                resultType: CameraResultType.Uri,
                quality: 60
            });

            if (photo.webPath) {
                this.previewImageUrl = photo.webPath;
            }

            this.photo = photo;
        },

        //  Die zweite der 3 Methoden
        //  Das Bild im Filesystem speichern und den Speicherort zurückgeben
        //  --------------------
        async savePicture(photo: Photo, fileName: string) {
            let base64Data: string;

            if (isPlatform('hybrid')) {

                const file = await Filesystem.readFile({
                    path: photo.path!
                });
                base64Data = file.data;

            } else {

                const response = await fetch(photo.webPath!);
                const blob = await response.blob();
                base64Data = await convertBlobToBase64(blob) as string;

            }

            const savedFile = await Filesystem.writeFile({
                path: fileName,
                data: base64Data,
                directory: Directory.Data
            });

            if (isPlatform('hybrid')) {

                return {
                    filepath: savedFile.uri,
                    webPath: Capacitor.convertFileSrc(savedFile.uri)
                }

            } else {

                return {
                    filepath: fileName,
                    webPath: photo.webPath
                }

            }
        },

        //  Die dritte der 3 Methoden
        //  Hier wird der Eintrag an sich abgespeichert
        //  Falls ein Bild vorhanden ist, wird dies über die zweite Mthode im Filesystem gespeichert
        async save() {
            // get all entries
            const entries = await Storage.get({ key: 'systems' })

            if (!entries.value) {
                entries.value = 'null';
            }

            const preEntries = JSON.parse(entries.value);

            // save image and get file name
            let fileName = '';
            if (this.photo != undefined) {
                fileName = new Date().getTime() + '.jpeg';
                const savedFile = await this.savePicture(this.photo, fileName);
                fileName = savedFile.filepath;
            }


            // generate new entry
            const newEntry = {
                id: new Date().getTime(),
                name: this.form.name,
                desc: this.form.desc,
                image: fileName
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
                key: 'systems',
                value: JSON.stringify(saveEntries)
            });
        }
    },
    data() {

        return {
            form: {
                name: '',
                desc: '',
            },
            images,
            previewImageUrl: '/assets/fallback_image.png',
            photo: ref<Photo>(),
        }

    },
    computed: {

        formDisabled() {
            if (this.form.name != '') {
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
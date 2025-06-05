import { defineStore } from 'pinia';

export const patientStore = defineStore('patientStore', {
    state: () => ({
        patientID: null
    })
});

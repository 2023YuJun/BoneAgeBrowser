<template>
    <div class="flex flex-col h-screen">
        <div class="shrink-0">
            <NavBar @switch-tool-group="$refs.dicomViewer.switchToolGroup($event)" @reset-settings="$refs.dicomViewer.resetSettings($event)" />
        </div>
        <div class="flex-1 overflow-auto">
            <div class="flex h-full">
                <div class="w-1/6 h-full">
                    <SideBarLeft @init-bone-data="$refs.sideBarRight.initBoneData($event)" @load-local-dicom="$refs.dicomViewer.loadLocalDicom($event)" @load-web-dicom="$refs.dicomViewer.loadWebDicom($event)" />
                </div>
                <div class="flex-1 h-full">
                    <DicomViewer ref="dicomViewer" />
                </div>
                <div class="w-1/4 h-full">
                    <SideBarRight ref="sideBarRight" />
                </div>
            </div>
            <button class="btn bg-[#03C755] text-white rounded-full fixed bottom-4 right-4 z-50" @click="$refs.reportingDialog.showModal()">生长发育报告</button>
            <ReportingDialog ref="reportingDialog" />
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import DicomViewer from '@/components/DicomViewer.vue';
import SideBarLeft from '@/components/SideBarLeft.vue';
import SideBarRight from '@/components/SideBarRight.vue';
import ReportingDialog from '@/components/ReportingDialog.vue';

export default {
    name: 'MainPage',
    components: {
        NavBar,
        DicomViewer,
        SideBarLeft,
        SideBarRight,
        ReportingDialog
    },
    setup() {
        return {};
    },
    data() {
        return {};
    },
    created() {
        // 获取URL中的patientID参数并存储到Pinia中
        const patientID = this.$route.query.patientID;
        this.$store.patient.patientID = patientID;
        // console.log('Patient ID:', this.$store.patient.patientID);
    },
    mounted() {},
    updated() {},
    methods: {}
};
</script>

<style scoped></style>

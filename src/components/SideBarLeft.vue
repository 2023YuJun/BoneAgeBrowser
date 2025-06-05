<template>
    <div class="h-full flex flex-col bg-sky-50 shadow-sm">
        <!-- 加载本地的 DICOM 图像 -->
        <button class="btn btn-dash btn-primary m-2" @click="$refs.fileInput.click()">加载本地 DICOM 图像</button>
        <input type="file" ref="fileInput" accept=".dcm" class="hidden" @change="loadLocalDicom" />
        <!-- 加载 Web 的 DICOM 图像 -->
        <div v-for="(patient, index) in patients" :key="index" class="card m-2 p-2 bg-base-100 shadow-sm flex flex-row items-center" @click="loadWebDicom(patient)">
            <div class="flex-1 flex items-center">
                <div class="avatar">
                    <div class="w-16 rounded text-center">
                        <font-awesome-icon class="fa-4x" :icon="['fas', 'file']" />
                    </div>
                </div>
            </div>
            <div class="flex-1 text-center">
                <p class="text-sm">PID: {{ patient.patientID }}</p>
                <p class="text-sm">inference: {{ patient.inferenceID }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBarLeft',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            patients: []
        };
    },
    created() {},
    async mounted() {
        await this.getPatientInfo();
    },
    updated() {},
    methods: {
        // 加载本地的 DICOM 图像
        loadLocalDicom(e) {
            const file = e.target.files[0];
            if (!file) {
                return;
            }
            const blob = URL.createObjectURL(file);
            this.$emit('load-local-dicom', blob);
        },
        // 加载 Web 的 DICOM 图像
        loadWebDicom(patient) {
            this.$store.patient.inferenceID = patient.inferenceID;
            this.$store.patient.birthDate = patient.brithDate; // 后端变量命名有误
            this.$store.patient.sex = patient.sex;
            // // 如果能访问到 PACS 则用这段代码
            // const dicomUrl = patient.downLoadUrl;
            // 如果不能访问 PACS 则用这段代码
            const dicomUrl = 'http://localhost:8081/1.2.840.113619.2.203.4.604660980.1627231180.252286.dcm';
            this.$emit('load-web-dicom', dicomUrl);
        },
        // 获取患者信息
        async getPatientInfo() {
            const patientID = this.$store.patient.patientID;
            const patientInfo = await this.$api.view.getPatientInfo({ id: patientID });
            this.patients = patientInfo.patients;
        }
    }
};
</script>

<style scoped></style>

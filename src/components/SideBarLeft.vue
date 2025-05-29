<template>
    <div class="h-full flex flex-col bg-sky-50 shadow-sm">
        <!-- 加载本地的 DICOM 图像 -->
        <button class="btn btn-dash btn-primary m-2" @click="$refs.fileInput.click()">加载本地 DICOM 图像</button>
        <input type="file" ref="fileInput" accept=".dcm" class="hidden" @change="loadLocalDicom" />
        <!-- 加载 Web 的 DICOM 图像 -->
        <div class="card m-2 p-2 bg-base-100 shadow-sm flex flex-row items-center" @click="loadWebDicom">
            <div class="flex-1 flex items-center">
                <div class="avatar">
                    <div class="w-24 rounded">
                        <img src="/preview-1.png" />
                    </div>
                </div>
            </div>
            <div class="flex-1 text-center">
                <p class="text-lg">Demo 1</p>
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
        return {};
    },
    created() {},
    mounted() {},
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
        loadWebDicom() {
            const url = 'http://localhost:8081/1.2.840.113619.2.203.4.604660980.1627231180.252286.dcm';
            this.$emit('load-web-dicom', url);
        }
    }
};
</script>

<style scoped></style>

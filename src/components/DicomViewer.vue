<template>
    <div class="w-full h-full">
        <div id="content" class="w-full h-full flex justify-center items-center"></div>
    </div>
</template>

<script>
import { RenderingEngine, Enums, volumeLoader, cornerstoneStreamingImageVolumeLoader } from '@cornerstonejs/core';
import { init as coreInit } from '@cornerstonejs/core';
import { init as dicomImageLoaderInit } from '@cornerstonejs/dicom-image-loader';

export default {
    name: 'DicomViewer',
    components: {},
    setup() {
        coreInit();
        dicomImageLoaderInit();
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
        async loadLocalDicom(blob) {
            await this.loadDicomImage(blob);
        },
        // 加载 Web 的 DICOM 图像
        async loadWebDicom(url) {
            await this.loadDicomImage(url);
        },
        // DICOM 图像加载过程
        async loadDicomImage(wadouri) {
            // 捕获用于显示 DICOM 图像的 DOM
            const content = document.getElementById('content');

            // 先清除旧的内容
            content.innerHTML = '';

            // 在 DOM 内部创建一个新的元素来显示 DICOM 图像
            const element = document.createElement('div');
            element.style.width = `${content.clientWidth}px`;
            element.style.height = `${content.clientHeight}px`;
            content.appendChild(element);

            // 创建一个渲染引擎
            const renderingEngineId = 'myRenderingEngine';
            const renderingEngine = new RenderingEngine(renderingEngineId);

            // 注册体积加载器
            const viewportId = 'CT_AXIAL_STACK';
            const viewportInput = {
                viewportId,
                element,
                type: Enums.ViewportType.STACK
            };
            renderingEngine.enableElement(viewportInput);

            // 使用渲染引擎处理视图的创建
            const viewport = renderingEngine.getViewport(viewportId);

            // 根据 wadouri 地址将 DICOM 图像加载到画布中
            viewport.setStack(['wadouri:' + wadouri]);

            // 渲染视图
            viewport.render();
        }
    }
};
</script>

<style scoped></style>

<template>
    <div class="w-full h-full">
        <!-- <button @click="loadDicomImage" class="px-4 py-2 bg-blue-500 text-white rounded">Load DICOM Image</button> -->
        <div id="content" class="w-full h-full flex justify-center items-center"></div>
    </div>
</template>

<script>
import { 
    RenderingEngine,
    Enums,
    volumeLoader,
    cornerstoneStreamingImageVolumeLoader
} from '@cornerstonejs/core';
import { init as coreInit } from '@cornerstonejs/core';
import { init as dicomImageLoaderInit } from '@cornerstonejs/dicom-image-loader';


export default {
    name: 'DicomViewer',
    components: {
    },
    setup() {
        coreInit();
        dicomImageLoaderInit();
        return {};
    },
    data() {
        return {};
    },
    created() { },
    mounted() { },
    updated() { },
    methods: {
        async loadDicomImage() {
            // This method will be used to load DICOM images
            // You can implement the logic to fetch and display DICOM images here
            const content = document.getElementById('content');

            // 先删除旧的内容
            content.innerHTML = '';
            // 创建一个新的元素来显示 DICOM 图像
            const element = document.createElement('div');

            element.style.width = '500px';
            element.style.height = '500px';

            content.appendChild(element);

            const renderingEngineId = 'myRenderingEngine';
            const renderingEngine = new RenderingEngine(renderingEngineId);

            const viewportId = 'CT_AXIAL_STACK';

            const viewportInput = {
                viewportId,
                element,
                type: Enums.ViewportType.STACK,
            };

            renderingEngine.enableElement(viewportInput);

            const viewport = renderingEngine.getViewport(viewportId);


            viewport.setStack(['wadouri:'+'http://localhost:8081/1.2.840.113619.2.203.4.604660980.1627231180.252286.dcm']);

            viewport.render();
        }
    }
};
</script>

<style scoped></style>

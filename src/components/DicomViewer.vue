<template>
    <div class="w-full h-full">
        <div id="dcm_content" class="w-full h-full flex justify-center items-center"></div>
    </div>
</template>

<script>
import { init as coreInit, RenderingEngine, Enums } from '@cornerstonejs/core';
import { init as dicomImageLoaderInit } from '@cornerstonejs/dicom-image-loader';
import { init as cornerstoneToolsInit, ToolGroupManager, PanTool, ZoomTool, WindowLevelTool, LengthTool, annotation, Enums as csToolsEnums, addTool } from '@cornerstonejs/tools';

export default {
    name: 'DicomViewer',
    components: {},
    setup() {
        coreInit();
        dicomImageLoaderInit();
        cornerstoneToolsInit();
        return {};
    },
    data() {
        return {
            viewportId: 'CT_AXIAL_STACK', // 视图 ID
            renderingEngine: null, // 渲染引擎
            currentDicomImage: null // 当前加载的 DICOM 图像
        };
    },
    created() {},
    async mounted() {
        this.renderingEngine = await this.initRenderingEngine();
    },
    updated() {},
    methods: {
        // 初始化 DICOM 渲染引擎
        async initRenderingEngine() {
            // 捕获用于显示 DICOM 图像的 DOM
            const content = document.getElementById('dcm_content');

            // 在 DOM 内部创建一个新的元素来挂载 DICOM 图像
            const element = document.createElement('div');
            element.style.width = `${content.clientWidth}px`;
            element.style.height = `${content.clientHeight}px`;
            content.appendChild(element);

            // 创建一个渲染引擎
            const renderingEngineId = 'myRenderingEngine';
            const renderingEngine = new RenderingEngine(renderingEngineId);

            // 注册体积加载器
            const viewportInput = {
                viewportId: this.viewportId,
                element,
                type: Enums.ViewportType.STACK
            };
            renderingEngine.enableElement(viewportInput);

            return renderingEngine;
        },
        // 加载本地的 DICOM 图像
        async loadLocalDicom(blob) {
            this.currentDicomImage = blob;
            await this.loadDicomImage(blob);
        },
        // 加载 Web 的 DICOM 图像
        async loadWebDicom(url) {
            this.currentDicomImage = url;
            await this.loadDicomImage(url);
        },
        // DICOM 图像加载过程
        async loadDicomImage(wadouri) {
            // 使用渲染引擎获取视图对象
            const viewport = this.renderingEngine.getViewport(this.viewportId);

            // 根据 wadouri 地址将 DICOM 图像加载到画布中
            viewport.setStack(['wadouri:' + wadouri]);

            // 渲染视图
            viewport.render();
        },
        // 切换工具组
        switchToolGroup(type) {
            const toolGroupId = 'myToolGroup';
            // 如果工具组已存在，则清除当前工具组
            ToolGroupManager.destroyToolGroup(toolGroupId);
            const toolGroup = ToolGroupManager.createToolGroup(toolGroupId);
            if (type === 'pan') {
                // 拖动工具
                this.enablePanTool(toolGroup);
            } else if (type === 'zoom') {
                // 缩放工具
                this.enableZoomTool(toolGroup);
            } else if (type === 'windowLevel') {
                // 窗宽窗位
                this.enableWindowLevelTool(toolGroup);
            } else if (type === 'lengthTool') {
                // 长度测量
                this.enableLengthTool(toolGroup);
            }
        },
        // 启用拖动工具
        enablePanTool(toolGroup) {
            addTool(PanTool);
            toolGroup.addTool(PanTool.toolName);
            toolGroup.addViewport(this.viewportId);
            toolGroup.setToolActive(PanTool.toolName, {
                bindings: [
                    {
                        mouseButton: csToolsEnums.MouseBindings.Primary // 左键点击
                    }
                ]
            });
        },
        // 启用缩放工具
        enableZoomTool(toolGroup) {
            addTool(ZoomTool);
            toolGroup.addTool(ZoomTool.toolName);
            toolGroup.addViewport(this.viewportId);
            toolGroup.setToolActive(ZoomTool.toolName, {
                bindings: [
                    {
                        mouseButton: csToolsEnums.MouseBindings.Wheel // 鼠标滚轮
                    }
                ]
            });
        },
        // 启用窗宽窗位工具
        enableWindowLevelTool(toolGroup) {
            addTool(WindowLevelTool);
            toolGroup.addTool(WindowLevelTool.toolName);
            toolGroup.addViewport(this.viewportId);
            toolGroup.setToolActive(WindowLevelTool.toolName, {
                bindings: [
                    {
                        mouseButton: csToolsEnums.MouseBindings.Primary // 左键点击
                    }
                ]
            });
        },
        // 启用长度测量工具
        enableLengthTool(toolGroup) {
            addTool(LengthTool);
            toolGroup.addTool(LengthTool.toolName);
            toolGroup.addViewport(this.viewportId);
            toolGroup.setToolActive(LengthTool.toolName, {
                bindings: [
                    {
                        mouseButton: csToolsEnums.MouseBindings.Primary // 左键点击
                    }
                ]
            });
        },
        // 恢复设置
        async resetSettings() {
            // 清除所有工具组
            ToolGroupManager.destroy();
            // 清除所有注释
            annotation.state.removeAllAnnotations();
            // 捕获用于显示 DICOM 图像的 DOM
            const content = document.getElementById('dcm_content');
            // 清除当前内容
            content.innerHTML = '';
            // 重新初始化渲染引擎
            this.renderingEngine = await this.initRenderingEngine();
            // 重新加载当前 DICOM 图像
            await this.loadDicomImage(this.currentDicomImage);
        }
    }
};
</script>

<style scoped></style>

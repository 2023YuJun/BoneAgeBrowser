<template>
    <div class="navbar bg-sky-300 shadow-sm">
        <div class="navbar-start">
            <div class="avatar">
                <div class="w-10 rounded">
                    <img src="/logo.png" />
                </div>
            </div>
            <a class="mx-4 text-xl">骨龄评估系统</a>
        </div>
        <div class="navbar-center lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><a>序列</a></li>
                <li><a :class="{ 'menu-active': currentActiveToolGroup === 'pan' }" @click="switchToolGroup('pan')">移动</a></li>
                <li><a :class="{ 'menu-active': currentActiveToolGroup === 'zoom' }" @click="switchToolGroup('zoom')">缩放</a></li>
                <li><a :class="{ 'menu-active': currentActiveToolGroup === 'windowLevel' }" @click="switchToolGroup('windowLevel')">窗宽窗位</a></li>
                <li><a :class="{ 'menu-active': currentActiveToolGroup === 'lengthTool' }" @click="switchToolGroup('lengthTool')">长度测量</a></li>
                <li><a @click="resetSettings">恢复设置</a></li>
                <li><a>恢复AI结果</a></li>
                <li>
                    <details>
                        <summary>更多</summary>
                        <ul class="p-2">
                            <li><a>反色</a></li>
                            <li><a>顺时针旋转</a></li>
                            <li><a>逆时针旋转</a></li>
                            <li><a>水平翻转</a></li>
                            <li><a>垂直翻转</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <ul class="menu menu-horizontal px-1">
                <li><a>收藏病例</a></li>
                <li><a @click="$refs.boneAgeGuide.showModal()">中华05指南</a></li>
                <li><a @click="$refs.operationGuide.showModal()">操作指南</a></li>
                <li><a>返回列表</a></li>
            </ul>
        </div>
    </div>
    <BoneAgeGuide ref="boneAgeGuide" />
    <OperationGuide ref="operationGuide" />
</template>

<script>
import BoneAgeGuide from '@/components/BoneAgeGuide.vue';
import OperationGuide from '@/components/OperationGuide.vue';

export default {
    name: 'NavBar',
    components: {
        OperationGuide,
        BoneAgeGuide
    },
    emits: ['switch-tool-group', 'reset-settings'],
    setup() {
        return {};
    },
    data() {
        return {
            currentActiveToolGroup: null // 当前激活的工具组
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        // 切换工具组
        switchToolGroup(type) {
            this.currentActiveToolGroup = type;
            // 触发父组件事件，传递工具组类型
            this.$emit('switch-tool-group', type);
        },
        // 恢复设置
        resetSettings() {
            this.currentActiveToolGroup = null;
            this.$emit('reset-settings');
        }
    }
};
</script>

<style scoped></style>

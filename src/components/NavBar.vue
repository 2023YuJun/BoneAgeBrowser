<template>
    <div class="navbar bg-sky-300 shadow-sm">
        <div class="navbar-start">
            <div class="avatar">
                <div class="w-10 rounded">
                    <img src="/logo.png" />
                </div>
            </div>
            <a class="btn btn-ghost text-xl">骨龄评估系统</a>
        </div>
        <div class="navbar-center lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><a>序列</a></li>
                <li><a>移动</a></li>
                <li><a>缩放</a></li>
                <li><a>窗宽窗位</a></li>
                <li><a>长度测量</a></li>
                <li><a>恢复设置</a></li>
                <li><a>恢复AI结果</a></li>
                <li>
                    <details>
                        <summary>更多</summary>
                        <ul class="p-2">
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
        <div class="navbar-end">
            <ul class="menu menu-horizontal px-1">
                <li><a>收藏病例</a></li>
                <li><a>中华05指南</a></li>
                <li><a>操作指南</a></li>
                <li><a>返回列表</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
        };
    },
    created() { },
    mounted() { },
    updated() { },
    methods: {}
};
</script>

<style scoped></style>

<template>
    <div class="h-full flex flex-col bg-sky-50 shadow-sm">
        <!-- 模式选择按钮组 -->
        <div class="h-16 flex flex-row justify-center items-center gap-1">
            <button class="btn btn-sm btn-outline btn-info">RUS-CHN</button>
            <button class="btn btn-sm btn-outline btn-info">TW3-C-RUS</button>
            <button class="btn btn-sm btn-outline btn-info">TW3-C-CARPAL</button>
        </div>
        <!-- 信息输入区域 -->
        <div class="h-20 flex gap-4 shrink-0">
            <div class="p-4">
                <p class="">实际年龄：0岁0月</p>
                <p class="">骨龄年龄：0岁0月</p>
            </div>
            <div class="p-4">
                <p class="">性别：男</p>
                <p class="">计分：0</p>
            </div>
        </div>
        <!-- 骨龄列表 -->
        <div class="h-[48%] p-3">
            <div class="card h-full p-2 bg-base-100 shadow-sm">
                <div class="overflow-y-auto flex-1">
                    <table class="table table-sm table-pin-rows w-full">
                        <thead class="">
                            <tr>
                                <th>骨龄列表</th>
                                <th>
                                    <button class="btn btn-xs btn-outline btn-square">
                                        <svg class="icon" viewBox="-4 -4 32 32">
                                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="overflow-auto">
                            <tr v-for="(item, index) in boneData['RUS-CHN']" :key="index">
                                <td>{{ item.name }}</td>
                                <td>{{ item.score }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- 影像报告模块 -->
        <div class="h-[28%] p-3 shrink-0">
            <div class="card h-full p-2 bg-base-100 shadow-sm">
                <div class="h-12 flex flex-row justify-start items-center gap-1">
                    <button class="btn btn-sm btn-outline btn-info">影像所见</button>
                    <button class="btn btn-sm btn-outline btn-info">影像印象</button>
                    <button class="btn btn-sm btn-outline btn-square ml-auto">
                        <svg class="icon" viewBox="-4 -4 32 32">
                            <path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1z"/>
                        </svg>
                    </button>
                    <button class="btn btn-sm btn-outline btn-square">
                        <svg class="icon" viewBox="-4 -4 32 32">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
                        </svg>
                    </button>
                </div>
                <div class="mt-3">
                    <textarea class="w-full mx-auto textarea" placeholder=""></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBarRight',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            boneData: {
                'RUS-CHN': [
                    '桡骨', '尺骨', '第一掌骨', '第三掌骨', '第五掌骨',
                    '第一近节指骨', '第三近节指骨', '第五近节指骨',
                    '第三中节指骨', '第五中节指骨',
                    '第一远节指骨', '第三远节指骨', '第五远节指骨'
                ].map(name => ({ name, score: '待计算' })),
                'TW3-C-RUS': [
                    '骨头一', '桡骨', '尺骨', '第一掌骨', '第三掌骨', '第五掌骨',
                    '第一近节指骨', '第三近节指骨', '第五近节指骨',
                    '第三中节指骨', '第五中节指骨',
                    '第一远节指骨', '第三远节指骨', '第五远节指骨'
                ].map(name => ({ name, score: null })),
                'TW3-C-CARPAL': [
                    '头状骨', '钩骨', '三角骨', '月骨', '舟骨', '大多角骨', '小多角骨'
                ].map(name => ({ name, score: null }))
            }
        };
    },
    created() { },
    mounted() { },
    updated() { },
    methods: {}
};
</script>

<style scoped></style>

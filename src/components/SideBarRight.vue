<template>
    <div class="h-full flex flex-col bg-sky-50 shadow-sm">
        <!-- 模式选择按钮组 -->
        <div class="h-16 flex flex-row justify-center items-center gap-1">
            <button class="btn btn-sm btn-outline btn-info" @click="loadBoneInfo('RUS-CHN')">RUS-CHN</button>
            <button class="btn btn-sm btn-outline btn-info" @click="loadBoneInfo('TW3-C-RUS')">TW3-C-RUS</button>
            <button class="btn btn-sm btn-outline btn-info" @click="loadBoneInfo('TW3-C-CARPAL')">TW3-C-CARPAL</button>
        </div>
        <!-- 信息输入区域 -->
        <div class="h-20 flex gap-4 shrink-0">
            <div class="p-4">
                <p class="">实际年龄：{{ actualAge }}</p>
                <p class="">骨龄年龄：{{ boneAge }}</p>
            </div>
            <div class="p-4">
                <p class="">性别：{{ sex }}</p>
                <p class="">计分：{{ total }}</p>
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
                                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                                        </svg>
                                    </button>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="overflow-auto">
                            <tr v-for="(item, index) in currentBoneData" :key="index">
                                <td>{{ item.showName }}</td>
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
                            <path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1z" />
                        </svg>
                    </button>
                    <button class="btn btn-sm btn-outline btn-square">
                        <svg class="icon" viewBox="-4 -4 32 32">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
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
            currentMode: 'RUS-CHN', // 当前模式
            boneData: {
                'RUS-CHN': [
                    { name: 'Radius', showName: '桡骨', score: '待计算' },
                    { name: 'Ulna', showName: '尺骨', score: '待计算' },
                    { name: 'MCPFirst', showName: '第一掌骨', score: '待计算' },
                    { name: 'MCPThird', showName: '第三掌骨', score: '待计算' },
                    { name: 'MCPFifth', showName: '第五掌骨', score: '待计算' },
                    { name: 'PIPFirst', showName: '第一近节指骨', score: '待计算' },
                    { name: 'PIPThird', showName: '第三近节指骨', score: '待计算' },
                    { name: 'PIPFifth', showName: '第五近节指骨', score: '待计算' },
                    { name: 'MIPThird', showName: '第三中节指骨', score: '待计算' },
                    { name: 'MIPFifth', showName: '第五中节指骨', score: '待计算' },
                    { name: 'DIPFirst', showName: '第一远节指骨', score: '待计算' },
                    { name: 'DIPThird', showName: '第三远节指骨', score: '待计算' },
                    { name: 'DIPFifth', showName: '第五远节指骨', score: '待计算' }
                ],
                'TW3-C-RUS': [
                    { name: 'Radius', showName: '桡骨', score: '待计算' },
                    { name: 'Ulna', showName: '尺骨', score: '待计算' },
                    { name: 'MCPFirst', showName: '第一掌骨', score: '待计算' },
                    { name: 'MCPThird', showName: '第三掌骨', score: '待计算' },
                    { name: 'MCPFifth', showName: '第五掌骨', score: '待计算' },
                    { name: 'PIPFirst', showName: '第一近节指骨', score: '待计算' },
                    { name: 'PIPThird', showName: '第三近节指骨', score: '待计算' },
                    { name: 'PIPFifth', showName: '第五近节指骨', score: '待计算' },
                    { name: 'MIPThird', showName: '第三中节指骨', score: '待计算' },
                    { name: 'MIPFifth', showName: '第五中节指骨', score: '待计算' },
                    { name: 'DIPFirst', showName: '第一远节指骨', score: '待计算' },
                    { name: 'DIPThird', showName: '第三远节指骨', score: '待计算' },
                    { name: 'DIPFifth', showName: '第五远节指骨', score: '待计算' }
                ],
                // TW3-C-CARPAL 模式数据
                // 这里可以添加具体的 TW3-C-CARPAL 模
                'TW3-C-CARPAL': [
                    { name: 'Capitate', showName: '头状骨', score: '待计算' },
                    { name: 'Hamate', showName: '钩骨', score: '待计算' },
                    { name: 'Triquetrum', showName: '三角骨', score: '待计算' },
                    { name: 'Lunate', showName: '月骨', score: '待计算' },
                    { name: 'Scaphoid', showName: '舟骨', score: '待计算' },
                    { name: 'Trapezium', showName: '大多角骨', score: '待计算' },
                    { name: 'Trapezoid', showName: '小多角骨', score: '待计算' }
                ]
            },
            currentBoneData: [], // 当前骨龄数据
            actualAge: '0岁0月', // 实际年龄
            boneAge: '0岁0月', // 骨龄年龄
            sex: null, // 性别
            total: null // 计分
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        // 加载骨龄信息
        async loadBoneInfo(mode) {
            this.currentMode = mode;
            // 根据选择的模式获取对应的骨龄数据
            this.currentBoneData = this.boneData[mode] || [];
            await this.getBoneData();
            debugger;
            // 获取实际年龄
            this.actualAge = this.formatActualAge(this.$store.patient.birthDate);
            // 获取性别(M男F女,其他未知)
            this.sex = ((sex) => {
                if (sex === 'M') return '男';
                if (sex === 'F') return '女';
                return '未知';
            })(this.$store.patient.sex);
        },
        // 获取骨龄信息
        async getBoneData() {
            const inferenceID = this.$store.patient.inferenceID;
            // 获取患者推理信息
            const inferenceInfo = await this.$api.view.getInferenceInfo({ id: inferenceID });
            // 根据推理模式获取骨龄信息
            let result = [];
            if (this.currentMode === 'RUS-CHN') {
                result = await this.$api.view.getRUSCHNInfo({ id: inferenceInfo.RCResultID });
            } else if (this.currentMode === 'TW3-C-RUS') {
                result = await this.$api.view.getTW3CRUSInfo({ id: inferenceInfo.TCRResultID });
            }
            debugger;
            this.boneAge = this.formatBoneAge(result.BoneAge); // 获取骨龄年龄
            this.total = result.Total || null; // 获取骨龄计分
            // 处理获取到的骨龄数据
            this.currentBoneData.forEach((bone) => {
                if (result.hasOwnProperty(bone.name)) {
                    bone.score = result[bone.name];
                }
            });
            // 将骨龄数据中score为-1的项置为"待计算"
            this.currentBoneData.forEach((bone) => {
                if (bone.score === -1) {
                    bone.score = '待计算';
                }
            });
        },
        // 实际年龄格式转换
        formatActualAge(birthDate) {
            const today = new Date();
            const birth = new Date(birthDate);
            let age = today.getFullYear() - birth.getFullYear();
            const monthDiff = today.getMonth() - birth.getMonth();
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
                age--;
            }
            const months = monthDiff < 0 ? 12 + monthDiff : monthDiff;
            return `${age}岁${months}月`;
        },
        // 骨龄年龄格式转换
        formatBoneAge(age) {
            const years = Math.floor(age);
            const months = Math.round((age - years) * 12);
            if (months === 12) {
                return `${years + 1}岁0月`;
            }
            return `${years}岁${months}月`;
        }
    }
};
</script>

<style scoped></style>

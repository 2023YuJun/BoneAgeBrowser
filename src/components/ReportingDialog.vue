<template>
    <dialog id="reporting_dialog" class="modal">
        <div v-if="page == 1" class="modal-box">
            <form method="dialog">
                <div class="flex flex-row justify-start items-center mx-4">
                    <div class="avatar">
                        <div class="w-10 rounded">
                            <img src="/logo.png" />
                        </div>
                    </div>
                    <a class="mx-4 text-xl">骨龄评估系统</a>
                    <p class="text-gray-500">输入基本信息生成报告</p>
                </div>
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="my-10 mx-16 space-y-4">
                <div class="flex items-center">
                    <label for="father_height" class="w-1/2 text-ml font-medium text-gray-700">父亲身高：</label>
                    <input type="text" id="father_height" class="input input-sm" placeholder="" v-model="fatherHeight" />
                    <label for="father_height" class="ml-4 text-lg font-medium text-gray-700">cm</label>
                </div>
                <div class="flex items-center">
                    <label for="mother_height" class="w-1/2 text-ml font-medium text-gray-700">母亲身高：</label>
                    <input type="text" id="mother_height" class="input input-sm" placeholder="" v-model="motherHeight" />
                    <label for="mother_height" class="ml-4 text-lg font-medium text-gray-700">cm</label>
                </div>
                <div class="flex items-center">
                    <label for="child_height" class="w-1/2 text-ml font-medium text-gray-700">孩子身高：</label>
                    <input type="text" id="child_height" class="input input-sm" placeholder="" v-model="childHeight" />
                    <label for="child_height" class="ml-4 text-lg font-medium text-gray-700">cm</label>
                </div>
                <div class="flex items-center">
                    <label for="child_weight" class="w-1/2 text-ml font-medium text-gray-700">孩子体重：</label>
                    <input type="text" id="child_weight" class="input input-sm" placeholder="" v-model="childWeight" />
                    <label for="child_weight" class="ml-4 text-lg font-medium text-gray-700">kg</label>
                </div>
            </div>
            <!-- Action buttons -->
            <footer class="flex justify-end space-x-2">
                <button class="btn" @click="closeModal">取消</button>
                <button class="btn btn-info" @click="toReportPage(2)">生成报告</button>
            </footer>
        </div>
        <!-- Report page -->
        <div v-if="page == 2" class="modal-box">
            <form method="dialog">
                <div class="flex flex-row justify-start items-center mx-4">
                    <div class="avatar">
                        <div class="w-10 rounded">
                            <img src="/logo.png" />
                        </div>
                    </div>
                    <a class="mx-4 text-xl">骨龄评估系统</a>
                    <p class="text-gray-500">输入基本信息生成报告</p>
                </div>
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="my-10 mx-16 space-y-4">
                <div>
                    <p>基本信息：</p>
                    <p>- 性别：{{ reportParams.childSex }}</p>
                    <p>- 年龄：{{ reportParams.childAge }} 岁</p>
                </div>
                <div>
                    <p>测量数据：</p>
                    <p>- 身高：{{ reportParams.childHeight }} cm</p>
                    <p>- 体重：{{ reportParams.childWeight }} kg</p>
                    <p>- BMI：{{ reportParams.bmi }} ({{ reportParams.bmiCategory }})</p>
                </div>
                <div>
                    <p>遗传预期：</p>
                    <p>- 父亲身高：{{ reportParams.fatherHeight }} cm</p>
                    <p>- 母亲身高：{{ reportParams.motherHeight }} cm</p>
                    <p>- 遗传预测身高：{{ reportParams.cmh }} {{ reportParams.cmhRange }} cm</p>
                </div>
            </div>
            <!-- Action buttons -->
            <footer class="flex justify-end space-x-2">
                <button class="btn" @click="toReportPage(1)">返回</button>
                <button class="btn btn-info" @click="copyReportContent">复制内容</button>
            </footer>
        </div>
    </dialog>
</template>

<script>
export default {
    name: 'ReportingDialog',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            page: 1,
            fatherHeight: null,
            motherHeight: null,
            childHeight: null,
            childWeight: null,
            childSex: '未知',
            reportParams: {}, // 报告参数
            reportContent: '' // 报告内容
        };
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        showModal() {
            this.page = 1; // 重置页面
            const dialog = document.getElementById('reporting_dialog');
            dialog.showModal();
        },
        closeModal() {
            const dialog = document.getElementById('reporting_dialog');
            dialog.close();
        },
        // 切换到报告页面
        toReportPage(page) {
            this.page = page;
            if (page == 2) {
                this.generateReport();
            }
        },
        // 复制报告内容
        copyReportContent() {
            navigator.clipboard.writeText(this.reportContent);
        },
        // 生成报告
        generateReport() {
            // 获取患者信息
            const childSex = ((sex) => {
                if (sex === 'M') return '男';
                if (sex === 'F') return '女';
                return '男';
            })(this.$store.patient.sex);
            const childAge = this.$store.patient.age || 12;

            // 计算靶身高
            let cmh = 0;
            let cmhRange = '';
            if (childSex === '男') {
                cmh = (Number(this.fatherHeight) + Number(this.motherHeight) + 13) / 2;
                cmhRange = '±7.5';
            } else if (childSex === '女') {
                cmh = (Number(this.fatherHeight) + Number(this.motherHeight) - 13) / 2;
                cmhRange = '±6.0';
            }

            // 计算 BMI (保留两位小数)
            const bmi = Number(this.childWeight) / (Number(this.childHeight) / 100) ** 2;
            const bmiCategory = ((bmi) => {
                if (bmi < 18.5) return '偏瘦';
                else if (bmi < 24) return '正常';
                else if (bmi < 28) return '超重';
                else return '肥胖';
            })(bmi);

            // 生成报告内容
            this.reportParams = {
                childSex: childSex,
                childAge: childAge,
                childHeight: this.childHeight,
                childWeight: this.childWeight,
                bmi: bmi.toFixed(2),
                bmiCategory: bmiCategory,
                fatherHeight: this.fatherHeight,
                motherHeight: this.motherHeight,
                cmh: cmh.toFixed(1),
                cmhRange: cmhRange
            };
            this.reportContent = `基本信息：${childSex}，${childAge}岁\n测量数据：身高${this.childHeight}cm，体重${this.childWeight}kg，BMI${bmi.toFixed(2)} (${bmiCategory})\n遗传预期：父亲身高${this.fatherHeight}cm，母亲身高${this.motherHeight}cm，遗传预测身高${cmh.toFixed(1)}${cmhRange}cm\n`;
        }
    }
};
</script>

<style scoped></style>

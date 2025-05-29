<template>
    <dialog id="operation_guide" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <form method="dialog">
                <div class="flex flex-row justify-start items-center mx-4">
                    <div class="avatar">
                        <div class="w-10 rounded">
                            <img src="/logo.png" />
                        </div>
                    </div>
                    <a class="mx-4 text-xl">骨龄评估系统</a>
                    <h1 class="mx-4 text-gray-700 text-lg font-semibold">操作指南</h1>
                    <p class="mx-4 text-gray-500">本产品结果仅供医生参考，如结果与医生意见不同，请医生进行再次确认。</p>
                </div>
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <div class="card border-1 border-sky-500 my-10 mx-4 p-4">
                <div class="text-2xl font-semibold">工具指南说明</div>
                <div class="divider"></div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-gray-100 p-4 rounded-xl border-l-4 border-l-sky-500">
                        <p>评级列表评分不准反馈：</p>
                        <p class="text-gray-600">当某一骨头的评分值与您的判断不一致时，通过点击评分值右侧向下小箭头选择您认为正确的评级，骨龄和影像所见描述会联动变化。</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-xl border-l-4 border-l-sky-500">
                        <p>中华05指南：</p>
                        <p class="text-gray-600">在工具栏点击中华05指南按钮进入指南页面，或点击评级列表中某一骨头名称旁的指南按钮进入指南页面并定位到对应骨头。</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-xl border-l-4 border-l-sky-500">
                        <p>评估结果：</p>
                        <p class="text-gray-600">本产品骨龄评估结果，供经培训合格的医师使用，不能单独用作临床诊疗决策依据。</p>
                    </div>
                    <div class="bg-gray-100 p-4 rounded-xl border-l-4 border-l-sky-500">
                        <p>适用人群：</p>
                        <p class="text-gray-600">本产品适用于0.5-18岁人群，不适用于锥形骨骺、畸形骨骺、骨骺发育畸形人群。</p>
                    </div>
                </div>
            </div>
            <!-- Action buttons -->
            <footer class="flex justify-end space-x-2">
                <button class="btn btn-info" @click="closeModal">我已知晓</button>
            </footer>
        </div>
    </dialog>
</template>

<script>
export default {
    name: 'OperationGuide',
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
        showModal() {
            const dialog = document.getElementById('operation_guide');
            dialog.showModal();
        },
        closeModal() {
            const dialog = document.getElementById('operation_guide');
            dialog.close();
        }
    }
};
</script>

<style scoped></style>

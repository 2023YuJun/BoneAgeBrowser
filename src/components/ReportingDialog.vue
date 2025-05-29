<template>
    <dialog id="reporting_dialog" class="modal">
        <div class="modal-box">
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
                    <input type="text" id="father_height" class="input input-sm" placeholder="" />
                    <label for="father_height" class="ml-4 text-lg font-medium text-gray-700">cm</label>
                </div>
                <div class="flex items-center">
                    <label for="mother_height" class="w-1/2 text-ml font-medium text-gray-700">母亲身高：</label>
                    <input type="text" id="mother_height" class="input input-sm" placeholder="" />
                    <label for="mother_height" class="ml-4 text-lg font-medium text-gray-700">cm</label>
                </div>
                <div class="flex items-center">
                    <label for="child_height" class="w-1/2 text-ml font-medium text-gray-700">孩子身高：</label>
                    <input type="text" id="child_height" class="input input-sm" placeholder="" />
                    <label for="child_height" class="ml-4 text-lg font-medium text-gray-700">cm</label>
                </div>
                <div class="flex items-center">
                    <label for="child_weight" class="w-1/2 text-ml font-medium text-gray-700">孩子体重：</label>
                    <input type="text" id="child_weight" class="input input-sm" placeholder="" />
                    <label for="child_weight" class="ml-4 text-lg font-medium text-gray-700">kg</label>
                </div>
            </div>
            <!-- Action buttons -->
            <footer class="flex justify-end space-x-2">
                <button class="btn" @click="closeModal">取消</button>
                <button class="btn btn-info" @click="closeModal">生成报告</button>
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
        return {};
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        showModal() {
            const dialog = document.getElementById('reporting_dialog');
            dialog.showModal();
        },
        closeModal() {
            const dialog = document.getElementById('reporting_dialog');
            dialog.close();
        }
    }
};
</script>

<style scoped></style>

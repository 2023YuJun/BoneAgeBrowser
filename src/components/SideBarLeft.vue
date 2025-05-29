<template>
    <div class="h-full flex flex-col bg-sky-50 shadow-sm">
        <div class="card m-2 p-2 bg-base-100 shadow-sm flex flex-row items-center" @click="$emit('load-dicom')">
            <div class="flex-1 flex items-center">
                <div class="avatar">
                    <div class="w-24 rounded">
                        <img src="/preview-1.png" />
                    </div>
                </div>
            </div>
            <div class="flex-1 text-center">
                <p class="text-lg">Demo 1</p>
            </div>
        </div>
        <div class="card m-2 p-2 bg-base-100 shadow-sm flex flex-row items-center">
            <div class="flex-1 flex items-center">
                <div class="avatar">
                    <div class="w-24 rounded">
                        <img src="/preview-1.png" />
                    </div>
                </div>
            </div>
            <div class="flex-1 text-center">
                <p class="text-lg">Demo 2</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBarLeft',
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

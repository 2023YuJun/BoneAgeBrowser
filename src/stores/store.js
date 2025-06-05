import { patientStore } from '@/stores/patient';

// 注入所有 store 模块到 Vue 实例
export default {
    install(app) {
        app.config.globalProperties.$store = {
            patient: patientStore()
        };
    }
};

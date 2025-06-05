import request from '@/utils/request';

const moduleUrl = '/vue/view';

const view = {
    // 前端视图获取患者信息
    getPatientInfo(data) {
        return request.get(`${moduleUrl}/patientInfo`, data);
    },
    // 前端视图获取患者推理信息
    getInferenceInfo(data) {
        return request.get(`${moduleUrl}/inferenceInfo`, data);
    },
    // 前端视图获取检测信息
    getDetectionInfo(data) {
        return request.get(`${moduleUrl}/detectionInfo`, data);
    },
    // 前端视图获取TW3-C RUS信息
    getTW3CRUSInfo(data) {
        return request.get(`${moduleUrl}/tw3CRusResult`, data);
    },
    // 前端视图获取RUS-CHN信息
    getRUSCHNInfo(data) {
        return request.get(`${moduleUrl}/rusChnResult`, data);
    },
    // 更新TW3-C RUS信息
    updateTW3CRUSInfo(data) {
        return request.put(`/updateTw3CRusResult`, data);
    },
    // 更新RUS-CHN信息
    updateRUSCHNInfo(data) {
        return request.put(`/updateRusChnResult`, data);
    }
    // // 客户端获取前端链接
    // getFrontendUrl(data) {
    //     return request.get(`/frontendUrl`, data);
    // }
};

export default view;

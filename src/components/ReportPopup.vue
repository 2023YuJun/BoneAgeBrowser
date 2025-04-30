<!-- src/components/ReportPopup.vue -->
<template>
    <div class="popup-overlay" v-if="visible" @click.self="handleClose">
      <div class="popup-container">
        <!-- 顶部栏 -->
        <div class="popup-header">
          <div class="header-left">
            <img 
              class="logo" 
              :src="logo" 
              alt="系统LOGO"
            >
            <div class="header-content">
              <span class="system-name">骨龄评估系统</span>
              <span class="report-title">输入基本信息生成报告</span>
            </div>
          </div>
          <button class="close-btn" @click="handleClose">×</button>
        </div>
  
        <!-- 主要内容区域 -->
        <div class="main-content">
          <div class="input-group">
            <div class="input-item">
              <label>父亲身高：</label>
              <input type="number" class="report-input" placeholder="请输入"> cm
            </div>
            <div class="input-item">
              <label>目前身高：</label>
              <input type="number" class="report-input" placeholder="请输入"> cm
            </div>
            <div class="input-item">
              <label>孩子身高：</label>
              <input type="number" class="report-input" placeholder="请输入"> cm
            </div>
            <div class="input-item">
              <label>孩子体重：</label>
              <input type="number" class="report-input" placeholder="请输入"> kg
            </div>
          </div>
        </div>
  
        <!-- 底部栏 -->
        <div class="popup-footer">
          <button class="cancel-btn" @click="handleClose">取消</button>
          <button class="generate-btn">生成报告</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    visible: Boolean,
    logo: String
  })
  
  const emit = defineEmits(['close'])
  
  const handleClose = () => {
    emit('close')
  }
  </script>
  
  <style scoped>
  /* 基础弹窗样式 */
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-container {
    width: min(90vw, 600px);
    max-height: 90vh;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  /* 顶部栏样式 */
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    border-bottom: 1px solid #eee;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .logo {
    width: 40px;
    height: 40px;
  }
  
  .header-content {
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  
  .system-name {
    font-size: 1.2em;
    color: #2c3e50;
    font-weight: 500;
  }
  
  .report-title {
    color: #7f8c8d;
    font-size: 0.95em;
  }
  
  /* 主要内容区域 */
  .main-content {
    padding: 25px;
  }
  
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .input-item {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  label {
    width: 80px;
    text-align: right;
    color: #4a4a4a;
  }
  
  .report-input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #dcdde1;
    border-radius: 4px;
    width: 100%;
    max-width: 300px;
  }
  
  .report-input:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52,152,219,0.2);
  }
  
  /* 底部栏 */
  .popup-footer {
    padding: 15px 25px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    gap: 15px;
  }
  
  .cancel-btn, .generate-btn {
    padding: 8px 25px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .cancel-btn {
    background: #f8f9fa;
    color: #7f8c8d;
  }
  
  .cancel-btn:hover {
    background: #eee;
  }
  
  .generate-btn {
    background: #3498db;
    color: white;
  }
  
  .generate-btn:hover {
    background: #2980b9;
    transform: translateY(-1px);
  }
  
  /* 关闭按钮 */
  .close-btn {
    font-size: 24px;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    color: #7f8c8d;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .close-btn:hover {
    color: #e74c3c;
    transform: scale(1.1);
  }
  </style>
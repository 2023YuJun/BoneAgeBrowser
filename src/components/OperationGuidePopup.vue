<!-- src/components/OperationGuidePopup.vue -->
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
            <div class="header-title-group">
              <span class="system-name">骨龄评估系统</span>
              <div class="guide-title">
                <strong>操作指南</strong>
                <span class="disclaimer">本产品结果仅供医生参考，如结果与医生意见不同，请医生进行再次确认。</span>
              </div>
            </div>
          </div>
          <button class="close-btn" @click="handleClose">×</button>
        </div>
  
        <!-- 主内容区域 -->
        <div class="main-content">
          <div class="content-box">
            <h2 class="guide-subtitle"><strong>工具指南说明</strong></h2>
            <div class="guide-container">
              <div class="guide-row">
                <div class="guide-item">
                  <span class="item-label">a.</span>
                  <div class="item-content">
                    评级列表评分不准反馈：当某一骨头的评分值与您的判断不一致时，通过点击评分值右侧向下小箭头选择您认为正确的评级，骨龄和影像所见描述会联动变化。
                  </div>
                </div>
                
                <div class="guide-item">
                  <span class="item-label">b.</span>
                  <div class="item-content">
                    中华05指南：在工具栏点击中华05指南按钮进入指南页面，或点击评级列表中某一骨头名称旁的指南按钮进入指南页面并定位到对应骨头。
                  </div>
                </div>
              </div>
  
              <div class="guide-row">
                <div class="guide-item">
                  <span class="item-label">c.</span>
                  <div class="item-content">
                    本产品骨龄评估结果，供经培训合格的医师使用，不能单独用作临床诊疗决策依据。
                  </div>
                </div>
                
                <div class="guide-item">
                  <span class="item-label">d.</span>
                  <div class="item-content">
                    本产品适用于0.5-18岁人群，不适用于锥形骨骺、畸形骨骺、骨骺发育畸形人群。
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- 底部栏 -->
        <div class="popup-footer">
          <button class="confirm-btn" @click="handleClose">确认</button>
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
  /* 弹窗基础样式 */
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
    width: 1000px;
    height: 650px;  /* 可调节整体高度 */
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    flex-direction: column;
  }
  
  /* 顶部栏样式 */
  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 25px;
    border-bottom: 1px solid #eee;
    min-height: 80px;
  }
  
  .header-left {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 85%;
  }
  
  .logo {
    width: 45px;
    height: 45px;
  }
  
  .header-title-group {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  
  .system-name {
    font-size: 1.3em;
    color: #2c3e50;
    white-space: nowrap;
  }
  
  .guide-title {
    display: flex;
    align-items: baseline;
    gap: 20px;
  }
  
  .guide-title strong {
    font-size: 1.2em;
    color: #1a2634;
    font-weight: 600;
  }
  
  .disclaimer {
    font-size: 0.9em;
    color: #7f8c8d;
    max-width: 500px;
  }
  
  /* 主内容区域 */
  .main-content {
    flex: 1;
    padding: 20px 25px;
    overflow: auto;
  }
  
  .content-box {
    border: 2px solid #cde8ff;
    border-radius: 8px;
    padding: 25px;  /* 可调节内边距 */
    min-height: 300px;  /* 可调节最小高度 */
  }
  
  .guide-subtitle {
    font-size: 1.2em;
    color: #1a2634;
    font-weight: 600;
    margin-bottom: 25px;
    padding-bottom: 10px;
    border-bottom: 2px solid #eee;
  }
  
  /* 指南内容布局 */
  .guide-container {
    display: flex;
    flex-direction: column;
    gap: 10px;  /* 可调节行间距 */
  }
  
  .guide-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;  /* 可调节列间距 */
  }
  
  .guide-item {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    border-left: 4px solid #3498db;
    min-height: 10px;  /* 可调节条目高度 */
  }
  
  .item-label {
    display: block;
    font-weight: 600;
    color: #3498db;
    font-size: 1.1em;
    margin-bottom: 12px;
  }
  
  .item-content {
    line-height: 1.7;
    color: #4a4a4a;
    font-size: 0.95em;
  }
  
  /* 底部栏 */
  .popup-footer {
    padding: 15px 25px;
    border-top: 1px solid #eee;
    display: flex;
    justify-content: flex-end;
    background: #f8f9fa;
    border-radius: 0 0 8px 8px;
  }
  
  .confirm-btn {
    padding: 8px 25px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .confirm-btn:hover {
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
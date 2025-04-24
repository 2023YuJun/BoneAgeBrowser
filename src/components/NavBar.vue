<template>
    <nav class="navbar">
      <div class="left-section">
        <img class="logo" :src="siteInfo.logo" alt="Logo">
        <span class="site-name">{{ siteInfo.name }}</span>
        
        <!-- 导航按钮组 -->
        <div class="nav-buttons">
          <button 
            v-for="(button, index) in buttons" 
            :key="index"
            class="nav-button"
          :class="{ 'has-separator': button === '更多' }"
          @click="handleButtonClick(button)"
        >
          {{ button }}
          </button>
        </div>
      </div>

      <!-- 中华05指南弹窗 -->
      <GuidelinePopup 
      :visible="showGuideline" 
      :logo="siteInfo.logo"
      @close="showGuideline = false"
    />

     <!-- 添加操作指南弹窗 -->
     <OperationGuidePopup 
      :visible="showOperationGuide"
      :logo="siteInfo.logo"
      @close="showOperationGuide = false"
    />

    </nav>
</template>
  
<script setup>
import { ref } from 'vue'
import GuidelinePopup from './GuidelinePopup.vue'
import OperationGuidePopup from './OperationGuidePopup.vue'



  defineProps({
    siteInfo: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['toggle-left-sidebar'])
  
  const buttons = [
    '序列', '移动', '缩放', '窗宽窗位',
    '长度测量', '恢复设置', '恢复AI结果',
    '更多', '收藏病例', '中华05指南',
    '操作指南', '返回列表'
  ]

  const showGuideline = ref(false)
  const showOperationGuide = ref(false)
  
// 修改按钮处理函数
const handleButtonClick = (buttonName) => {
  if (buttonName === '序列') {
    emit('toggle-left-sidebar')
  } else if (buttonName === '中华05指南') {
    showGuideline.value = true
  } else if (buttonName === '操作指南') {
    showOperationGuide.value = true
  }
}
</script>
  
<style scoped>
  .navbar {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #9fb2c4;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0; /* 新增关键定位 */
  left: 0; /* 确保横向铺满 */
  right: 0; /* 确保横向铺满 */
  z-index: 1000;
  }
  
  .left-section {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  
  .logo {
    height: 40px;
    width: 40px;
  }
  
  .site-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 30px;
  }
  
  .nav-buttons {
    display: flex;
    gap: 15px;
  }
  
  .nav-button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    background: #3498db;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  
/* 为"更多"按钮添加特殊样式 */
.has-separator {
  position: relative;
  margin-right: 80px; /* 增加右侧间距 */
}

/* 添加分隔线伪元素 */
.has-separator::after {
  content: "";
  position: absolute;
  right: -48px; /* 调整到间隙中间位置 */
  top: 50%;
  transform: translateY(-50%);
  height: 80%;   /*  调整分隔线高度：修改height百分比 */
  width: 1px;
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 2px rgba(0,0,0,0.1);
}

/* 优化按钮悬停效果
.nav-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
} */
  .nav-button:hover {
    background: #2980b9;
  }


</style>
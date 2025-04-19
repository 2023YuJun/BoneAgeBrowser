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
            @click="handleButtonClick(button)"
          >
            {{ button }}
          </button>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
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
  
  const handleButtonClick = (buttonName) => {
    if (buttonName === '序列') {
      emit('toggle-left-sidebar')
    }
  }
  </script>
  
  <style scoped>
  .navbar {
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #2c3e50;
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
  
  .nav-button:hover {
    background: #2980b9;
  }
  </style>
<template>
    <transition name="slide">
      <aside v-if="visible" class="sidebar-left">
        <div class="sidebar-content">
          <!-- 左侧边栏内容（暂留空） -->
          <div class="placeholder">
            左侧边栏内容区域
          </div>
        </div>
      </aside>
    </transition>
  </template>
  
  <script setup>
  defineProps({
    visible: {
      type: Boolean,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .sidebar-left {
    width: 230px;
    height: calc(100vh - 60px);
    background: #ffffff;
    position: fixed;
    left: 0;
    top: 60px;
    box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    /* z-index: 999; */
  }
  
  .placeholder {
    padding: 20px;
    color: #7f8c8d;
  }
  
  /* 过渡动画 */
  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.3s ease;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    transform: translateX(-100%);
  }
  
  .slide-enter-to,
  .slide-leave-from {
    transform: translateX(0);
  }
  </style>
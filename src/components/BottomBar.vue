<!-- src/components/BottomBar.vue -->
<template>
    <div class="bottom-menu"
     :style="{
      left: leftPosition,
      right: rightPosition
    }">
      <label class="menu-item">
        <input 
          type="checkbox" 
          class="annotation-check"
          v-model="isAnnotationEnabled"
        >
        <span>骨骺点位标注</span>
      </label>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const isAnnotationEnabled = ref(false)
  </script>
  
  <style scoped>
  .bottom-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 380px; /* 匹配右侧边栏宽度 */
    height: 1.5em;
    background: #f8f9fa;
    border-top: 1px solid #dcdde1;
    display: flex;
    align-items: center;
    padding: 0 15px;
    z-index: 999;
    box-shadow: 0 -2px 5px rgba(0,0,0,0.05);
  }
  
  .menu-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 0.9em;
    color: #2c3e50;
  }
  
  .annotation-check {
    width: 14px;
    height: 14px;
    margin-left: 5px;
    cursor: pointer;
  }
  </style>
<!-- MoreMenu.vue -->
<!-- 导航栏中‘更多’ 的功能代码 -->
<template>
    <transition name="menu-fade">
      <div v-if="show" class="more-menu" v-click-outside="onClose">
        <button 
          v-for="(item, index) in menuItems"
          :key="index"
          class="menu-item"
          @click="handleSelect(item)"
        >
          {{ item }}
        </button>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    show: Boolean
  })
  
  const emit = defineEmits(['close'])
  
  const menuItems = [
    '反色',
    '顺时针旋转',
    '逆时针旋转',
    '水平翻转',
    '垂直翻转'
  ]
  
  const handleSelect = (item) => {
    // 后续可在此添加功能逻辑
    emit('close')
  }
  
  const onClose = () => {
    emit('close')
  }

  const vClickOutside = {
  mounted(el, binding) {
    el.clickOutsideEvent = event => {
      if (!el.contains(event.target)) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el) {
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
  </script>
  
  <style scoped>
  .more-menu {
    position: absolute;
    top: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 140px;
    background: white;
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1001;
  }
  
  .menu-item {
    width: 100%;
    padding: 10px 16px;
    text-align: center;
    background: transparent;
    border: none;
    color: #2c3e50;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .menu-item:hover {
    background: #f8f9fa;
    color: #3498db;
  }
  
  /* 复用原有动画效果 */
  .menu-fade-enter-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .menu-fade-leave-active {
    transition: opacity 0.2s, transform 0.2s;
  }
  
  .menu-fade-enter-from,
  .menu-fade-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  </style>
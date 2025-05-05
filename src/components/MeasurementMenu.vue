<!-- 导航栏中‘长度测量’ 的功能代码 -->
<template>
    <transition name="menu-fade">
      <div v-if="show" class="measurement-menu" v-click-outside="onClose">
        <button 
          v-for="item in menuItems"
          :key="item.value"
          class="menu-item"
          @click="handleSelect(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </transition>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    show: Boolean
  })
  
  
  const emit = defineEmits(['select', 'close'])
  
  // 菜单配置
  const menuItems = [
    { label: '长度测量', value: 'length' },
    { label: '角度测量', value: 'angle' },
    { label: '点测量', value: 'point' }
  ]
  
  const handleSelect = (value) => {
    const selectedItem = menuItems.find(item => item.value === value)
    emit('select', selectedItem) // 传递完整对象
    emit('close')
}
  
  const onClose = () => {
    emit('close')
  }
  
  // 点击外部关闭指令（独立封装）
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
  .measurement-menu {
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
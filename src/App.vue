<template>
  <div class="app-container">
    <NavBar :site-info="siteConfig" @toggle-left-sidebar="toggleLeftSidebar" />
    
    <div class="layout-wrapper">
      <SideBarLeft v-if="showLeftSidebar" :visible="showLeftSidebar" />
      
      <main class="content-container">
        <router-view />
        
      </main>
      
      <SideBarRight />
    </div>

    <BottomBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import SideBarLeft from './components/SideBarLeft.vue'
import SideBarRight from './components/SideBarRight.vue'
import BottomBar from './components/BottomBar.vue'

const siteConfig = {
  logo: './src/assets/logo.png',
  name: '骨龄评估系统'
}

const showLeftSidebar = ref(false)

const toggleLeftSidebar = () => {
  showLeftSidebar.value = !showLeftSidebar.value
}
</script>

<style>
:root {
  /* 动态尺寸系统 */
  --sidebar-width: clamp(300px, 25vw, 400px);
  --content-padding: clamp(1rem, 2vw, 1.5rem);
  --nav-height: 60px;
  --bottom-bar-height: 50px;
  
  /* 间距系统 */
  --space-unit: 0.5rem;
  --space-xs: calc(var(--space-unit));
  --space-sm: calc(var(--space-unit) * 2);
  --space-md: calc(var(--space-unit) * 3);
}

/* 基础重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: system-ui, -apple-system, Arial, sans-serif;
  line-height: 1.5;
}

/* 主容器 */
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #f8f9fa;
}

/* 布局容器 */
.layout-wrapper {
  flex: 1;
  display: grid;
  grid-template-columns: 
    minmax(230px, auto)   /* 左侧边栏 */
    1fr                   /* 主内容区 */
    var(--sidebar-width); /* 右侧边栏 */
  margin-top: var(--nav-height);
  position: relative;
}

/* 主内容区域 */
.content-container {
  padding: var(--content-padding);
  min-height: calc(100vh - var(--nav-height) - var(--bottom-bar-height));
  overflow: auto;
  background: white;
  box-shadow: 0 0 15px rgba(0,0,0,0.05);
}

/* 响应式断点 */
@media screen and (max-width: 1440px) {
  :root {
    --sidebar-width: clamp(280px, 22vw, 350px);
  }
}

@media screen and (max-width: 1024px) {
  .layout-wrapper {
    grid-template-columns: 1fr;
  }

  .content-container {
    margin-right: 0;
    grid-column: 1 / -1;
  }

  .sidebar-right {
    position: fixed;
    right: -100%;
    top: var(--nav-height);
    width: 80vw;
    height: calc(100vh - var(--nav-height));
    transition: right 0.3s ease;
    z-index: 1000;
  }

  .sidebar-right.active {
    right: 0;
  }
}

@media screen and (max-width: 768px) {
  :root {
    --sidebar-width: 100vw;
    --content-padding: 0.75rem;
  }

  .layout-wrapper {
    display: block;
  }
}

/* 滚动条优化 */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

/* 安全区域适配 */
@supports (padding: max(0px)) {
  .app-container {
    padding: 
      env(safe-area-inset-top, 0px)
      env(safe-area-inset-right, 0px)
      env(safe-area-inset-bottom, 0px)
      env(safe-area-inset-left, 0px);
  }
}

/* 过渡动画 */
.sidebar-transition {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
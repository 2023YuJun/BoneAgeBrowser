<template>
  <NavBar :site-info="siteConfig" @toggle-left-sidebar="toggleLeftSidebar" />
  <SideBarLeft v-if="showLeftSidebar" :visible="showLeftSidebar" />
  <main class="content-container">
    <router-view />
  </main>
  <SideBarRight />
</template>

<script setup>
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import SideBarLeft from './components/SideBarLeft.vue'
import SideBarRight from './components/SideBarRight.vue'

const siteConfig = {
  logo: './src/assets/logo.png',
  name: '医学影像系统'
}

const showLeftSidebar = ref(false)

const toggleLeftSidebar = () => {
  showLeftSidebar.value = !showLeftSidebar.value
}
</script>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.content-container {
  margin-right: 300px; /* 右侧边栏宽度 */
  margin-left: 0; /* 初始左侧边栏隐藏 */
  margin-top: 60px; /* 导航栏高度 */
  padding: 20px;
  min-height: calc(100vh - 60px);
  transition: margin-left 0.3s ease;
}

/* 当左侧边栏显示时调整内容区域 */
.content-container.with-left-sidebar {
  margin-left: 300px;
}
</style>
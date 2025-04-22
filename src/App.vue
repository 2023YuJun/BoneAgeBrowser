<template>
  <NavBar :site-info="siteConfig" @toggle-left-sidebar="toggleLeftSidebar" />

   <!-- 新增底部菜单 -->
   <BottomBar />

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
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.content-container {
  margin-right: 300px;
  padding: 20px;
  min-height: calc(100vh - 60px);
  transition: margin-left 0.3s ease;
  /* 直接通过定位避开导航栏 */
  position: relative;
  top: 60px; /* 用 top 替代 margin-top */
}

/* 当左侧边栏显示时调整内容区域 */
.content-container.with-left-sidebar {
  margin-left: 300px;
}

.content-container {
  margin-bottom: 1.5em; /* 为底部菜单留出空间 */
}

.SideBarLeft { /* 根据实际类名调整 */
  top: calc(60px + 1.5em); /* 导航栏高度 + 底部菜单高度 */
}
</style>
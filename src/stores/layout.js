// stores/layout.js
// 创建布局状态管理（Pinia）
// 优化底部菜单栏布局(但后面没有使用到)

import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    isLeftSidebarOpen: false,
    rightSidebarWidth: 380 // 默认与右侧边栏宽度一致
  }),
  actions: {
    setRightSidebarWidth(width) {
      this.rightSidebarWidth = width
    }
  }
})
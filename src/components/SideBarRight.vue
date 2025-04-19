<template>
  <aside class="sidebar-right">
    <div class="placeholder">
      右侧边栏内容区域
    </div>
  </aside>
</template>

<style scoped>
.sidebar-right {
  width: 300px;
  height: calc(100vh - 60px);
  background: #f5f6fa;
  position: fixed;
  right: 0;
  top: 60px;
  padding: 20px;
  border-left: 1px solid #dcdde1;
}

.placeholder {
  color: #7f8c8d;
  text-align: center;
  margin-top: 50px;
}
</style>
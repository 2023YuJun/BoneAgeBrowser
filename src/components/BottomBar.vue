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
  /* 新增边框样式 */
  border: 1px solid #dcdde1;      /* 整体边框 */
  border-radius: 4px 4px 0 0;     /* 顶部圆角 */
  box-shadow: 0 -2px 8px rgba(0,0,0,0.08); /* 增强立体感 */

  /* 保持原有定位 */
  position: fixed;
  bottom: 0;
  left: 235px;
  right: 405px;
  height: 1.5em;
  background: #ffffff;            /* 改为纯白背景 */
  /* z-index: 999; */

  /* 新增盒子模型计算方式 */
  box-sizing: border-box;         /* 确保边框包含在高度内 */
  
  /* 微调其他样式 */
  padding: 0 15px;
  display: flex;
  align-items: center;
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
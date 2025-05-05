<template>
    <nav class="navbar">
      <div class="left-section">
        <img class="logo" :src="siteInfo.logo" alt="Logo">
        <span class="site-name">{{ siteInfo.name }}</span>
        
        <!-- 导航按钮组 -->
        <div class="nav-buttons">
          <template v-for="(button, index) in buttons" :key="index">
            <!-- 长度测量按钮特殊处理 -->
            <div v-if="button === '长度测量'" class="measurement-wrapper">
              <button 
                class="nav-button"
                :class="{ 'dropdown-active': showMeasurementMenu }"
                @click.stop="handleButtonClick(button)"
              >
                {{ selectedMeasurement || button }} <!-- 动态显示选中项 -->
                <span class="dropdown-indicator">
                  ▼ <!-- 箭头符号 -->
                </span>
              </button>
              <MeasurementMenu 
                :show="showMeasurementMenu"
                @select="handleMeasurementSelect"
                @close="showMeasurementMenu = false"
              />
            </div>

            <div v-if="button === '更多'" class="more-wrapper">
              <button 
                class="nav-button has-separator" 
                :class="{ 'dropdown-active': showMoreMenu }"
                @click.stop="handleButtonClick(button)"
              >
                {{ button }}
                <span class="dropdown-indicator">▼</span>
              </button>
              <MoreMenu 
                :show="showMoreMenu"
                @close="showMoreMenu = false"
              />
            </div>

            <button
              v-else
              class="nav-button"
              :class="{ 'has-separator': button === '更多' }"
              @click="handleButtonClick(button)"
            >
              {{ button }}
            </button>
          </template>
        </div>
      </div>

      <!-- 中华05指南弹窗 -->
      <GuidelinePopup 
      :visible="showGuideline" 
      :logo="siteInfo.logo"
      @close="showGuideline = false"
    />

     <!-- 添加操作指南弹窗 -->
     <OperationGuidePopup 
      :visible="showOperationGuide"
      :logo="siteInfo.logo"
      @close="showOperationGuide = false"
    />

    </nav>
</template>
  
<script setup>
import { ref } from 'vue'
import GuidelinePopup from './GuidelinePopup.vue'
import OperationGuidePopup from './OperationGuidePopup.vue'
import MeasurementMenu from './MeasurementMenu.vue'
import MoreMenu from './MoreMenu.vue'


  defineProps({
    siteInfo: {
      type: Object,
      required: true
    }
  })
  
  const emit = defineEmits(['toggle-left-sidebar'])
  
  const buttons = [
    '序列', '移动', '缩放', '窗宽窗位',
    '长度测量', '恢复设置', '恢复AI结果',
    '更多', '收藏病例', '中华05指南',
    '操作指南', '返回列表'
  ]

  const showGuideline = ref(false)
  const showOperationGuide = ref(false)
  const showMeasurementMenu = ref(false)
  const showMoreMenu = ref(false)
  

  const handleButtonClick = (buttonName) => {
  // 关闭其他菜单
  if (buttonName !== '长度测量') showMeasurementMenu.value = false
  if (buttonName !== '更多') showMoreMenu.value = false

  switch(buttonName) {
    case '序列':
      emit('toggle-left-sidebar')
      break
    case '中华05指南':
      showGuideline.value = true
      break
    case '操作指南':
      showOperationGuide.value = true
      break
      case '长度测量':
      showMeasurementMenu.value = !showMeasurementMenu.value // 新增切换逻辑
      break
    case '更多':
      showMoreMenu.value = !showMoreMenu.value // 新增切换逻辑
      break
  }
}
// // 修改按钮处理函数
// const handleButtonClick = (buttonName) => {
//   if (buttonName === '序列') {
//     emit('toggle-left-sidebar')
//   } else if (buttonName === '中华05指南') {
//     showGuideline.value = true
//   } else if (buttonName === '操作指南') {
//     showOperationGuide.value = true
//   }
// }

// // 兼容原有按钮点击逻辑
// const handleMainButtonClick = (buttonName) => {
//   // 原有功能逻辑
//   switch(buttonName) {
//     case '中华05指南':
//       showGuideline.value = true
//       break
//     case '操作指南':
//       showOperationGuide.value = true
//       break
//     case '序列':
//       emit('toggle-left-sidebar')
//       break
//     case '长度测量':
//       showMeasurementMenu.value = !showMeasurementMenu.value
//       break
//     default:
//       // 其他按钮原有逻辑
//   }
// }

// 新增测量处理（不影响原有功能）
const handleMeasurementSelect = (type) => {
  console.log('执行测量:', type.label)
  selectedMeasurement.value = type.label // 只存储label字段
  showMeasurementMenu.value = false
}

const selectedMeasurement = ref(null)



</script>
  
<style scoped>
  .navbar {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background: #becede;
  color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0; /* 新增关键定位 */
  left: 0; /* 确保横向铺满 */
  right: 0; /* 确保横向铺满 */
  z-index: 1000;
  }
  
  .left-section {
    display: flex;
    align-items: center;
    gap: 20px;
    width: 100%;
  }
  
  .logo {
    height: 40px;
    width: 40px;
  }
  
  .site-name {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 30px;
  }
  
  .nav-buttons {
    display: flex;
    gap: 15px;
  }
  
  .nav-button {
    display: flex;
    align-items: center;
    gap: 8px; /* 调节文字与箭头间距 */
    padding: 8px 10px 8px 10px; /* 右侧增加留白 */
    border: none;
    border-radius: 4px;
    background: #3498db;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }
  
/* 为"更多"按钮添加特殊样式 */


.more-wrapper .has-separator::after {
  right: -30px; /* 根据新按钮宽度调整 */
  height: 70%; /* 优化分隔线高度 */
}

/* 确保按钮仍应用分隔线样式 */
.more-wrapper .nav-button {
  min-width: 80px;
  position: relative; /* 新增定位基准 */
}

/* 优化按钮悬停效果
.nav-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
} */
  .nav-button:hover {
    background: #2980b9;
  }

/* 新增样式（不影响原有结构） */
.has-dropdown {
  position: relative;
  padding-right: 28px !important;
}

.dropdown-indicator {
  position: static; /* 取消绝对定位 */
  right: 8px;
  top: 50%;
  transform: none;
  margin-left: 1px; /* 新增间距调节 */
  font-size: 0.7em;
  opacity: 0.8;
  transition: transform 0.2s;
}

.dropdown-active .dropdown-indicator {
  transform: rotate(180deg);
  opacity: 1;
}

/* 新增层级控制 */
.measurement-wrapper {
  position: relative;
  z-index: 1000;
}

/* 确保下拉菜单可见 */
.measurement-menu {
  z-index: 1001;
}

.measurement-wrapper .nav-button {
  min-width: 120px; /* 根据默认文本宽度设定 */
  justify-content: center; /* 文本居中 */
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 隐藏溢出内容 */
  text-overflow: ellipsis; /* 添加省略号（可选） */
}

 /* 新增’更多’的功能 */
/* 添加样式 */
.more-wrapper {
  position: relative;
  margin-right: 48px; /* 关键调整：直接控制容器右侧间距 */
  display: inline-flex;
  z-index: 1000;
}

/* 保持按钮宽度一致 */
.measurement-wrapper .nav-button {
  min-width: 120px; /* 保持长度测量按钮宽度 */
}

.more-wrapper .nav-button {
  min-width: 8px; /* 缩小更多按钮宽度 */
  padding: 8px 12px; /* 调整内边距 */
}

/* 分隔线定位修正 */
.more-wrapper .nav-button::after {
  content: "";
  position: absolute;
  right: -30px; /* 根据新间距调整 */
  top: 50%;
  transform: translateY(-50%);
  height: 70%;
  width: 1px;
  background: rgba(255, 255, 255, 0.5);
}
</style>
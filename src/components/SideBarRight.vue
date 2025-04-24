<!-- SideBarRight.vue -->
<template>
  <aside class="sidebar-right">
    <div class="controls-container">
      <!-- 模式选择按钮 -->
      <div class="button-group">
        <button 
          class="mode-button"
          :class="{ active: activeMode === 'RUS-CHN' }"
          @click="setMode('RUS-CHN')"
        >
          RUS-CHN
        </button>
        <button 
          class="mode-button"
          :class="{ active: activeMode === 'TW3-C-RUS' }"
          @click="setMode('TW3-C-RUS')"
        >
          TW3-C-RUS
        </button>
        <button 
        class="mode-button"
        :class="{ active: activeMode === 'TW3-C-CARPAL' }"
          @click="setMode('TW3-C-CARPAL')"
        >
        TW3-C-CARPAL
      </button>
      </div>

      <!-- 信息输入区域 -->
      <div class="compact-input-group">
        <div class="input-row">
          <!-- 实际年龄 -->
          <div class="input-item age-item">
            <span class="input-label">实际年龄：</span>
            <div class="age-inputs">
              <input 
                type="number" 
                class="age-input" 
                min="0" 
                max="99" 
                placeholder="0"
              >
              <span class="unit">岁</span>
              <input 
                type="number" 
                class="age-input" 
                min="0" 
                max="11" 
                placeholder="0"
              >
              <span class="unit">月</span>
            </div>
          </div>

          <!-- 性别 -->
          <div class="input-item gender-item">
            <span class="input-label">性别：</span>
            <select class="gender-select">
              <option value="">/</option>
              <option value="male">男</option>
              <option value="female">女</option>
            </select>
          </div>
        </div>
        
        <div class="input-row">
          <div class="input-item age-item">
            <span class="input-label">骨龄年龄：</span>
            <div class="age-inputs">
              <input 
                type="number" 
                class="age-input" 
                placeholder="0"
                disabled > <!-- 禁用输入，等待后端数据 -->
              
              <span class="unit">岁</span>
              <input 
                type="number" 
                class="age-input" 
                placeholder="0"
                disabled > <!-- 禁用输入，等待后端数据 -->

              <span class="unit">月</span>
            </div>
          </div>

          <div class="input-item gender-item">
            <span class="input-label">计分：</span>
            <input 
              type="text" 
              class="score-input" 
              placeholder="待计算" 
              disabled > 
            
          </div>
        </div>
        
        <!-- 骨龄列表 -->
        <div class="bone-list" v-if="activeMode">
          <!-- 标题行 -->
          <div class="bone-list-header">
            <span class="bone-list-title">骨龄列表</span>
            <button class="refresh-btn" @click="refreshScores">
              <svg class="refresh-icon" viewBox="0 0 24 24">
                <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
              </svg>
            </button>
          </div>
          <!-- 滚动容器 -->
          <div class="scroll-container">
            <div 
              class="bone-item"
              v-for="(item, index) in boneItems"
              :key="index"
            >
              <span class="bone-name">{{ item.name }}</span>
              <div class="bone-score">
                <!-- <span class="dash-line"></span> -->
                <span class="score-value">{{ item.score || '待计算' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- ========== 新增影像模块 ========== -->
      <div class="image-section">
        <!-- 影像操作按钮 -->
        <div class="image-header">
          <div class="image-buttons">
            <button 
              class="image-btn"
              :class="{ active: activeImageTab === 'view' }"
              @click="activeImageTab = 'view'"
            >影像所见</button>
            <button 
              class="image-btn"
              :class="{ active: activeImageTab === 'impression' }"
              @click="activeImageTab = 'impression'"
            >影像印象</button>
          </div>
          
          <!-- 新增操作按钮组 -->
          <div class="action-buttons">
            <button class="action-btn" @click="copyText">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M19 21H8V7h11m0-2H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2m-3-4H4a2 2 0 0 0-2 2v14h2V3h12V1z"/>
              </svg>
            </button>
            <button class="action-btn" @click="clearText">
              <svg class="icon" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- 可编辑文本区域 -->
        <div class="editable-content">
          <textarea
            v-if="activeImageTab === 'view'"
            v-model="viewContent"
            class="text-editor"
            placeholder="请输入影像所见描述..."
          ></textarea>
          <textarea
            v-if="activeImageTab === 'impression'"
            v-model="impressionContent"
            class="text-editor"
            placeholder="请输入影像印象分析..."
          ></textarea>
        </div>
      </div>

      <!-- ========== 新增报告按钮 ========== -->
      <button class="report-btn" @click="showReportPopup = true">
      生长发育报告
      </button>

      <!-- 新增报告弹窗 -->
      <ReportPopup 
        :visible="showReportPopup"
        :logo="siteConfig.logo"
        @close="showReportPopup = false"
      />


      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed, watch, onMounted} from 'vue'  // 必须导入 computed
import ReportPopup from './ReportPopup.vue'


// 新增站点配置（与App.vue保持一致）(生长发育报告)
const siteConfig = ref({
  logo: './src/assets/logo.png',
  name: '骨龄评估系统'
})

// 新增报告弹窗控制
const showReportPopup = ref(false)



// 模式管理
// 默认激活RUS-CHN模式
const activeMode = ref('RUS-CHN')
// ...其他脚本代码保持不变...
const setMode = (mode) => {
  activeMode.value = mode === activeMode.value ? null : mode
}

// 骨龄数据
const boneData = {
  'RUS-CHN': [
    '桡骨', '尺骨', '第一掌骨', '第三掌骨', '第五掌骨',
    '第一近节指骨', '第三近节指骨', '第五近节指骨',
    '第三中节指骨', '第五中节指骨',
    '第一远节指骨', '第三远节指骨', '第五远节指骨'
  ].map(name => ({ name, score: null })),

  'TW3-C-RUS': [
    '骨头一', '桡骨', '尺骨', '第一掌骨', '第三掌骨', '第五掌骨',
    '第一近节指骨', '第三近节指骨', '第五近节指骨',
    '第三中节指骨', '第五中节指骨',
    '第一远节指骨', '第三远节指骨', '第五远节指骨'
  ].map(name => ({ name, score: null })),

  'TW3-C-CARPAL':[
  '头状骨','钩骨','三角骨','月骨','舟骨','大多角骨','小多角骨'
  ].map(name => ({ name, score: null })),
}

// 当前显示的骨龄项
const boneItems = computed(() => {
  return activeMode.value ? boneData[activeMode.value] : []
})

// 刷新方法
const refreshScores = () => {
  console.log('刷新骨龄分数...')
  // 后续可添加后端请求逻辑
}

// ========== 新增本地存储逻辑 ==========
// 加载本地存储数据
const loadFromStorage = (key) => {
  return localStorage.getItem(key) || ''
}

// 保存到本地存储
const saveToStorage = (key, value) => {
  localStorage.setItem(key, value)
}

// ========== 影像模块逻辑 ==========
const activeImageTab = ref('view')
const viewContent = ref(loadFromStorage('medicalImageView'))     // 初始化时加载
const impressionContent = ref(loadFromStorage('medicalImageImpression'))

// 监听内容变化自动保存
watch([viewContent, impressionContent], ([newView, newImpression]) => {
  saveToStorage('medicalImageView', newView)
  saveToStorage('medicalImageImpression', newImpression)
})

// 新增操作逻辑
const copyText = async () => {
  try {
    const text = activeImageTab.value === 'view' 
      ? viewContent.value 
      : impressionContent.value
    await navigator.clipboard.writeText(text)
    alert('复制成功！')
  } catch (err) {
    alert('复制失败，请手动选择文本复制')
  }
}

// ========== 删除功能优化 ==========
const clearText = () => {
  // 确认对话框
  if (!confirm("确定要永久删除当前内容吗？")) return
  
  if (activeImageTab.value === 'view') {
    viewContent.value = ''
  } else {
    impressionContent.value = ''
  }
}



</script>



<style scoped>
/* 侧边栏容器 */
.sidebar-right {
  width: 380px;
  height: calc(100vh - 60px);
  background: #f5f6fa;
  position: fixed;
  right: 0;
  top: 60px;
  padding: 15px;
  border-left: 1px solid #dcdde1;
  display: block !important; /* 强制显示 */
}

/* 1. 骨龄列表容器 */
.bone-list {
  border: 1px solid #dcdde1; /* 添加包裹边框 */
  border-radius: 6px;
  padding: 0; /* 内部间距由子元素控制 */
  background: white;
  margin-top: 15px;
  height: 420px;     /* 固定高度 */
  display: flex;                /* 新增 */
  flex-direction: column;       /* 新增 */
}

/* 调整行距 */
.bone-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 100%;             /* 修改为100% */
  padding: 8px 6px;            /* 调整内边距 */
  margin: 0;                   /* 移除外边距 */
  border-bottom: 1px solid #f0f0f0;
}

/* 缩小字体间距 */
.bone-name {
  font-size: 0.9em;
  color: #2c3e50;
  width: 80px;
  text-align:left;
}

/* 4. 动态虚线实现 */
.bone-score {
  display: flex;
  align-items: center;
  flex: 1; /* 占据剩余空间 */
  min-width: 0; /* 允许内容收缩 */
}

/* 优化虚线样式 */
.dash-line {
  flex: 1;
  border-bottom: 1px dashed #c0c0c0;
  margin: 0 15px;
  position: relative;
  top: -2px; /* 垂直居中调整 */
}

.score-value {
  flex: 0 0 60px;            /* 固定右侧宽度 */
  text-align: right;
  color: #7f8c8d;
  min-width: 60px;
  font-family: monospace;
  font-size: 0.85em;
}

/* 激活按钮样式 */
.mode-button.active {
  background: #3498db;
  color: white;
  border-color: #2980b9;
}

/* 主内容容器 */
.controls-container {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

/* 按钮组样式 */
.button-group {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.mode-button {
  flex: 1;
  min-width: 110px;
  padding: 8px 12px;
  border: 1px solid #3498db;
  border-radius: 4px;
  background: #f8f9fa;
  cursor: pointer;
  font-size: 0.9em;
  white-space: nowrap;
  transition: all 0.2s;
}

.mode-button:hover {
  background: #3498db;
  color: white;
}

/* 输入区域样式 */
.input-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px; /* 增加行内间距 */
}

.age-item {
  flex: 2; /* 年龄区域占比更大 */
}

.gender-item {
  flex: 1; /* 性别区域占比更小 */
  margin-left: 30px; /* 新增左边距 */
}

.input-item {
  display: flex;
  align-items: center;
}

.input-label {
  flex-shrink: 0;
  width: 80px;
  font-size: 0.95em;
  color: #2c3e50;
}

.age-inputs {
  display: flex;
  align-items: center;
  gap: 2px;
}

.age-input {
  width: 38px;
  padding: 4px 2px;
  background: transparent;
  border: none;
  text-align: center;
}

.unit {
  color: #7f8c8d;
  font-size: 0.9em;
  margin: 0 2px 0 -4px;
}

/* 性别选择器优化 */
.gender-select {
  width: 50px;
  padding: 4px 18px 4px 4px;  /* 左侧padding从2px增加到4px */
  margin-left: -30px;  /* 新增负边距 */
  background: transparent;
  border: none;
  appearance: none;
  font-size: 0.95em;
}

.gender-item {
  position: relative;
  padding-right: 12px;
}

.gender-item::after {
  content: "▼";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.7em;
  color: #7f8c8d;
  pointer-events: none;
}

/* 聚焦状态优化 */
.age-input:focus,
.gender-select:focus {
  outline: none;
  background: #f0f8ff;
  border-radius: 2px;
}

/* 计分输入框样式 */
.score-input {
  width: 50px;
  padding: 4px 2px;
  margin-left: -30px;  /* 新增负边距 */
  background: transparent;
  border: none;
  text-align: center;
  color: #7f8c8d; /* 灰色提示文字 */
}

/* 调整新增行间距 */
.compact-input-group {
  display: flex;
  flex-direction: column;
  gap: 20px; /* 控制两行之间的垂直间距 */
}

/* 禁用状态样式 */
input:disabled {
  color: #7f8c8d;
  background-color: #f8f9fa;
  cursor: not-allowed;
}


/* 1. 骨龄列表标题行样式 */
.bone-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 15px; /* 统一内边距 */
  border-bottom: 2px solid #1a2634; /* 加深分隔线 */
  background: #f8f9fa;
  border-radius: 6px 6px 0 0; /* 顶部圆角 */
}

.bone-list-title {
  color: #1a2634; /* 原#2c3e50改为更深的蓝黑色 */
  font-weight: 700; /* 加粗 */
  font-size: 1em;
  letter-spacing: 0.5px;
}

/* 2. 刷新按钮优化 */
.refresh-btn {
  padding: 4px; /* 缩小按钮尺寸 */
  width: 28px;
  height: 28px;
  border: 1px solid #3498db;
  border-radius: 50%; /* 圆形按钮 */
  background: #a0c6eb;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  position: relative;
  top: -1px; /* 微调垂直对齐 */
}

.refresh-icon {
  width: 16px; /* 与文字大小匹配 */
  height: 16px;
  fill: #3498db;
  transition: transform 0.3s;
}

.refresh-btn:hover .refresh-icon {
  fill: white;
  transform: rotate(360deg); /* 悬停旋转动画 */
}

/* 3. 长文本显示优化 */
.bone-name {
  flex: 0 0 180px;            /* 固定左侧宽度 */
  white-space: nowrap;
  overflow: visible; /* 取消溢出隐藏 */
  text-overflow: clip; /* 取消省略号 */
  min-width: 180px; /* 保证最小显示宽度 */
  font-size: 0.92em;
  padding-right: 10px; /* 增加右侧间距 */
}

/* 4. 滚动容器优化 */
.scroll-container {
  flex: 1;                     
  max-height: none !important;  /* 移除max-height限制 */
  overflow-x: auto; /* 允许横向滚动 */
  overflow-y: auto;
  padding: 0 12px 12px; /* 底部留白 *//* 减少内边距 */
  box-sizing: border-box;       /* 新增 */
}

/* 5. 虚线样式微调 */
.dash-line {
  flex: 1;
  border-bottom: 1px dashed #c0c0c0;
  margin: 0 15px; /* 增加间距 */
}

/* ========== 影像模块样式 ========== */
/* 1. 影像模块头部布局 */
.image-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.action-buttons {
  display: flex;
  gap: 10px;
}

/* 2. 操作按钮样式 */
.action-btn {
  width: 32px;
  height: 32px;
  padding: 6px;
  border: 1px solid #dcdde1;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background: #f8f9fa;
  border-color: #3498db;
}

.action-btn .icon {
  width: 100%;
  height: 100%;
  fill: #7f8c8d;
}

.action-btn:hover .icon {
  fill: #3498db;
}

.image-section {
  margin-top: 25px;
  border: 2px solid #dcdde1;
  border-radius: 6px;
  padding: 15px;
  background: white;
}

.image-buttons {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
}

.image-btn {
  padding: 8px 20px;
  border: 1px solid #3498db;
  border-radius: 4px;
  background: #f8f9fa;
  color: #3498db;
  cursor: pointer;
  transition: all 0.2s;
}

.image-btn.active {
  background: #3498db;
  color: white;
}

.image-btn:hover:not(.active) {
  background: #e8f4fc;
}

/* 可编辑文本区域 */
.text-editor {
  width: 95%;
  margin-top: 1px;
  height: 140px;
  padding: 10px;
  border: 1px solid #dcdde1;
  border-radius: 4px;
  resize: vertical; /* 允许垂直调整大小 */
  font-family: Arial, sans-serif;
  line-height: 1.5;
}

.text-editor:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

/* ========== 报告按钮样式 ========== */
.report-btn {
  position: fixed;
  right: 30px;
  bottom: 20px;
  padding: 12px 25px;
  background: #2ecc71;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0 3px 6px rgba(0,0,0,0.1);
  transition: all 0.3s;
  z-index: 100; 
}

.report-btn:hover {
  background: #27ae60;
  transform: translateY(-2px);
  box-shadow: 0 5px 10px rgba(0,0,0,0.15);
}
</style>
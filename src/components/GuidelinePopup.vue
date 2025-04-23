<!-- 新建指南弹窗组件 -->
 <!-- src/components/GuidelinePopup.vue -->
<template>
    <div class="popup-overlay" v-if="visible" @click.self="handleClose">
      <div class="popup-container">
        <!-- 顶部栏 -->
        <div class="popup-header">
          <div class="header-left">
            <img class="logo" :src="logo" alt="Logo">
            <span class="system-name">骨龄评估系统</span>
            <div class="mode-buttons">
            <button 
              v-for="mode in modes"
              :key="mode"
              class="mode-btn"
              :class="{ 'active': activeMode === mode }"
              @click="activeMode = mode"
            >
              {{ mode }}
            </button>
          </div>
        </div>
          <button class="close-btn" @click="handleClose">×</button>
        </div>
  
        <!-- 中间区域 -->
      <div class="middle-section">
        <div class="bone-buttons">
          <button
            v-for="(bone, index) in currentBones"
            :key="index"
            class="bone-btn"
            :style="{ 
             width: activeMode === 'TW3-C-CARPAL' ? '100px' : 'auto' 
    }"
            @click="handleBoneClick(bone)" 
          >
            {{ bone }}
          </button>
        </div>
      </div>

      <!-- 主内容区域 -->
        <div class="main-content">
          <template v-if="selectedBone">
            <div class="grade-scroll-container">
              <div v-for="(grade, index) in currentGrades" 
                    :key="index"
                    class="grade-item">
                 <div class="grade-image-container">
                   <img :src="grade.image" 
                        :alt="`${selectedBone} ${grade.level}级`"
                        class="grade-image">
                   <span class="grade-level">等级 {{ grade.level }}</span>
                 </div>
                 <div class="grade-description">
                    {{ grade.description }}
                 </div>
              </div>
            </div>
          </template>
          <div v-else class="placeholder">
            <span>请选择要查看的骨骼</span>
          </div>
        </div>

       
      </div>
    </div>
</template>
  
<script setup>
import { ref, computed } from 'vue'
import boneGrades from '@/assets/guide-data/bone-data'

const props = defineProps({
  visible: Boolean,
  logo: String
})
  
  const emit = defineEmits(['close'])


// 模式数据
const modes = ['RUS-CHN', 'TW3-C-RUS', 'TW3-C-CARPAL']
const activeMode = ref('RUS-CHN')
  
// 骨骼数据
const boneData = {
  'RUS-CHN': [
    '桡骨', '尺骨', '第一掌骨', '第三掌骨', '第五掌骨',
    '第一近节指骨', '第三近节指骨', '第五近节指骨',
    '第三中节指骨', '第五中节指骨',
    '第一远节指骨', '第三远节指骨', '第五远节指骨'
  ],
  'TW3-C-RUS': [
    '骨头一', '桡骨', '尺骨', '第一掌骨', '第三掌骨', '第五掌骨',
    '第一近节指骨', '第三近节指骨', '第五近节指骨',
    '第三中节指骨', '第五中节指骨',
    '第一远节指骨', '第三远节指骨', '第五远节指骨'
  ],
  'TW3-C-CARPAL': [
    '头状骨','钩骨','三角骨','月骨','舟骨','大多角骨','小多角骨'
  ]
}

const currentBones = computed(() => boneData[activeMode.value])

const handleClose = () => {
emit('close')
}

// 新增状态管理
const selectedBone = ref(null)
const currentGrades = ref([])

// 点击骨头按钮的处理
const handleBoneClick = (boneName) => {
  selectedBone.value = boneName
  currentGrades.value = boneGrades[activeMode.value]?.[boneName] || []
}

</script>
  
<style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 2000;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-container {
    width: 1000px;
    height: 800px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
  
  /* 顶部区域 */
  .popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  height: 60px;
}

/* 修改顶部模式按钮居中 */
.mode-buttons {
  display: flex;
  gap: 15px;
  justify-content: center; /* 新增居中 */
  margin-left: 0; /* 移除左边距 */
  margin-right: 80px; 
  flex: 1; /* 占据剩余空间 */
}
  
.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  flex: 1;
}
  
  .logo {
    width: 30px;
    height: 30px;
  }
  
  .system-name {
    font-size: 1.1em;
    font-weight: 500;
    color: #2c3e50;
  }
  
  .close-btn {
    font-size: 24px;
    width: 40px;
    height: 40px;
    border: none;
    background: transparent;
    color: #7f8c8d;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .close-btn:hover {
    color: #e74c3c;
    transform: scale(1.1);
  }
  
  .mode-buttons {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding: 30px 0;
  }
  
  .mode-btn {
    padding: 12px 24px;
    border: 1px solid #3498db;
    border-radius: 4px;
    background: #f8f9fa;
    color: #3498db;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .mode-btn:hover {
    background: #3498db;
    color: white;
  }

/* 中间区域 */
/* 调整中间区域布局 */
.middle-section {
  height: 100px;
  padding: 10px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: center; /* 内容居中 */
}

.bone-buttons {
  display: grid;
  grid-template-columns: repeat(7, 1fr); /* 固定7列布局 */
  gap: 8px; /* 调节间隙 */
  padding: 0 1px; /* 减少两侧留白 */
  width: 100%;
  max-width: 850px; /* 限制最大宽度 */
}

/* 统一按钮样式 */
.bone-btn {
  width: 100px !important; /* 固定宽度 */
  height: 50px;
  padding: 6px 8px !important; /* 缩小内边距 */
  font-size: 0.9em; /* 缩小字体 */
  white-space: nowrap; /* 防止文字换行 */
  border: 1px solid #3498db; /* 与顶部按钮相同边框 */
  border-radius: 4px;
  background: #f8f9fa; /* 相同背景色 */
  color: #3498db; /* 相同文字颜色 */
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 20px !important; /* 圆角大小 */ /*  添加圆角 */
}

.bone-btn:hover {
  background: #3498db; /* 相同悬停效果 */
  color: white;
}

/* 特殊模式微调 */
.compact-mode {
  min-width: 90px; /* 腕骨模式特殊宽度 */
  padding: 6px 8px !important;
}

/* 主内容区域 */
.main-content {
  /* height: calc(710px - 60px - 100px - 2px); 总高 - 顶部 - 中间 - 边框 */
  height: calc(100% - 120px);
  padding: 20px;
}

/* 等级滚动容器 */
.grade-scroll-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  max-height: 580px;
  overflow-y: auto;
  padding-right: 10px;
}

/* 单个等级项 */
.grade-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* 图片容器 */
.grade-image-container {
  position: relative;
  height: 200px;
  background: #f8fafc;
}

.grade-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.grade-level {
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
}

/* 描述区域 */
.grade-description {
  padding: 15px;
  line-height: 1.6;
  font-size: 0.9em;
  border-top: 1px solid #f1f5f9;
  min-height: 80px;
}

.placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #7f8c8d;
  border: 2px dashed #dcdde1;
  border-radius: 4px;
}

/* 其他保持原有样式 */
.mode-btn.active {
  background: #3498db;
  color: white;
}

</style>
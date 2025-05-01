<!-- src/components/GuidelinePopup.vue -->
<template>
  <div class="popup-overlay" v-if="visible" @click.self="handleClose">
    <div class="popup-container">
      <!-- 顶部栏 -->
      <div class="popup-header">
        <div class="header-left">
          <img class="logo" :src="logo" alt="系统LOGO">
          <div class="title-group">
            <span class="system-name">骨龄评估系统</span>
            <span class="guide-title">中华05指南</span>
          </div>
          <div class="mode-buttons">
            <button 
              v-for="mode in modes"
              :key="mode"
              class="mode-btn"
              :class="{ 'active': activeMode === mode }"
              @click="switchMode(mode)"
            >
              {{ mode }}
            </button>
          </div>
        </div>
        <button class="close-btn" @click="handleClose">×</button>
      </div>

      <!-- 骨骼选择区 -->
      <div class="bone-selection">
        <button
          v-for="(bone, index) in currentBones"
          :key="index"
          class="bone-btn"
          :class="{ 'active': selectedBone === bone }"
          @click="selectBone(bone)"
        >
          {{ bone }}
        </button>
      </div>

      <!-- 主内容区 -->
      <div class="main-content">
        <div v-if="!selectedBone" class="empty-state">
          <div class="empty-icon">🦴</div>
          <p>请先选择要查看的骨骼</p>
        </div>

        <template v-else>
          <!-- 分页控制 -->
          <div class="pagination-control">
            <button 
              class="page-btn"
              :disabled="currentPage === 1"
              @click="prevPage"
            >
              ◀
            </button>
            <span class="page-indicator">
              第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
            </span>
            <button 
              class="page-btn"
              :disabled="currentPage === totalPages"
              @click="nextPage"
            >
              ▶
            </button>
          </div>

          <!-- 等级展示网格 -->
          <div class="grade-grid">
            <div 
              v-for="(grade, index) in paginatedGrades"
              :key="index"
              class="grade-card"
            >
              <div class="image-container">
                <img 
                  :src="getImagePath(grade.image)"
                  :alt="`${selectedBone} ${grade.level}级`"
                  class="grade-image"
                  @error="handleImageError"
                />
                <span class="grade-level">等级 {{ grade.level }}</span>
              </div>
              <div class="grade-info">
                <h3 class="grade-title">{{ grade.title }}</h3>
                <div class="detail-grid">
                  <div 
                    v-for="(detail, dIndex) in grade.details"
                    :key="dIndex"
                    class="detail-item"
                  >
                    <span class="detail-label">{{ detail.label }}：</span>
                    <span class="detail-value">{{ detail.value }}</span>
                  </div>
                </div>
                <p class="grade-desc">{{ grade.description }}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>

  
</template>

<script setup>
import { ref, computed, watch } from 'vue'

// 模拟数据 - 需要替换为实际数据源
const boneData = {
  'RUS-CHN': {
    '桡骨': [
      {
        level: '1',
        image: 'RUS-CHN-radius-1.jpg',
        description: '骨化中心仅可见一个钙化点，极少为多个，边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-radius-2.jpg',
        description: '骨化中心清晰可见，为圆盘形，有平滑连续的缘',
       
      },
      {
        level: '3',
        image: 'RUS-CHN-radius-3.jpg',
        description: '（1）骺最大直径为骨干宽的一半或一半以上。<br>（2）骺外侧端增大、变厚、圆滑；内侧端为锥形。（3）骺近侧面的 1/3 变平,并稍致密,骺和骨干之间的间隙变窄,约1mm。',
        
      },
      {
        level: '4',
        image: 'RUS-CHN-radius-4.jpg',
        description: '骺远侧缘内出现致密白线,为掌侧缘,在其远侧为背侧缘。',
      },
      {
        level: '5（0）',
        image: 'RUS-CHN-radius-5(0).jpg',
        
        description: '（1）骺近侧缘可区分为掌侧面和背侧面;掌侧面为该缘上不规则的致密白线。（2）骺内侧端向内侧和近侧生长,大部分近侧缘的形状和骨干相一致。',
       
      },
      {
        level: '5（2）',
        image: 'RUS-CHN-radius-5(2).jpg',
        description: '骺内侧端与骨干等宽',
      },
      {
        level: '6',
        image: 'RUS-CHN-radius-6.jpg',
        description: '（1）骺背侧面出现月骨和舟骨关节面,以一个小驼峰相连接。（2）骺内侧缘出现与尺骨骺相关节的掌侧面和背侧面:掌侧面或背侧面向内侧突出.（3）骺近侧缘稍凹。',
      },
      {
        level: '7(0)',
        image: 'RUS-CHN-radius-7(0).jpg',
        description: '骺在一侧(通常在内侧)覆盖骨干',
      },
      {
        level: '7(2)',
        image: 'RUS-CHN-radius-7(2).jpg',
        description: '骺在两侧覆盖骨干',
      },
      {
        level: '8(0)',
        image: 'RUS-CHN-radius-8(0).jpg',
        description: '骺和骨干开始融合',
      },
      {
        level: '8(1)',
        image: 'RUS-CHN-radius-8(1).jpg',
        description: '骺和骨干融合1/4',
      },
      {
        level: '8(2)',
        image: 'RUS-CHN-radius-8(2).jpg',
        description: '骺和骨干融合1/2',
      },
      {
        level: '8(3)',
        image: 'RUS-CHN-radius-8(3).jpg',
        description: '骺和骨干融合3/4',
      },
      {
        level: '8(4)',
        image: 'RUS-CHN-radius-8(4).jpg',
        description: '骺和骨干完全融合',
      },
      // 添加更多等级数据...
    ],

    '尺骨': [
      {
        level: '1',
        image: 'RUS-CHN-ulna-1.jpg',
        description: '骨化中心可见一个钙化点,极少为多个,边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-ulna-2.jpg',
        description: '骨化中心清晰可见,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-ulna-3.jpg',
        description: '（1）骺最大直径为骨干宽的一半或一半以上。（2）骺横向的内、外侧直径比纵向的远、近侧直径大得多。（3）骺近侧和远侧缘都变平,但并不一定平行;骺通常为楔形,尖端指向外侧',
      },
      {
        level: '4',
        image: 'RUS-CHN-ulna-4.jpg',
        description: '骺茎突可见为小而清晰的凸起',
      },
      {
        level: '5(0)',
        image: 'RUS-CHN-ulna-5(0).jpg',
        description: '（1）骺尺骨头清晰可辨,密度大于茎突(内侧关节面通常为致密的白线,而将尺骨头和茎突区分开来:尺骨头和茎突相接处的近侧或远侧缘通常出现凹陷)。（2）与桡骨骺相邻的缘变平。',
      },
      {
        level: '5(2)',
        image: 'RUS-CHN-ulna-5(2).jpg',
        description: '骺近侧缘在一侧与骨干等宽',
      },
      {
        level: '6',
        image: 'RUS-CHN-ulna-6.jpg',
        description: '（1）骺近侧缘在两侧与骨干等宽。（2）骺近侧缘和骨干远侧缘在中间1/3处重叠。'
      },
      {
        level: '7(0)',
        image: 'RUS-CHN-ulna-7(0).jpg',
        description: '骺和骨干开始融合',
      },
      {
        level: '7(1)',
        image: 'RUS-CHN-ulna-7(1).jpg',
        description: '骺和骨干融合1/4',
      },
      {
        level: '7(2)',
        image: 'RUS-CHN-ulna-7(2).jpg',
        description: '骺和骨干融合1/2',
      },
      {
        level: '7(3)',
        image: 'RUS-CHN-ulna-7(3).jpg',
        description: '骺和骨干融合3/4',
      },
      {
        level: '7(4)',
        image: 'RUS-CHN-ulna-7(4).jpg',
        description: '骺和骨干完全融合',
      },
      
      // 添加更多等级数据...
    ],

    '第一掌骨': [
      {
        level: '1',
        image: 'RUS-CHN-MCPFirst-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-MCPFirst-2.jpg',
        description: '骨化中心清晰可见,形状为圆形,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-MCPFirst-3.jpg',
        description: '骺最大直径为骨干宽的一半或一半以上',
      },
      {
        level: '4',
        image: 'RUS-CHN-MCPFirst-4.jpg',
        description: '（1）骺与骨干等宽。（2）骺近侧缘凹(开始出现掌侧面和背侧面)。',
      },
      {
        level: '5(0)',
        image: 'RUS-CHN-MCPFirst-5(0).jpg',
        description: '骺近侧面可区分为掌侧面和背侧面,并可见背侧面的全部长度:其鞍状关节面与大多角骨的相邻缘一致',
      },
      {
        level: '5(2)',
        image: 'RUS-CHN-MCPFirst-5(2).jpg',
        description: '骺内侧缘变平',
      },
      {
        level: '6(0)',
        image: 'RUS-CHN-MCPFirst-6(0).jpg',
        description: '骺在一侧覆盖骨干(由于拇指的转动内侧的覆盖通常比外侧更清晰)',
      },
      {
        level: '6(2)',
        image: 'RUS-CHN-MCPFirst-6(2).jpg',
        description: '骺在两侧覆盖骨干',
      },
      {
        level: '7(0)',
        image: 'RUS-CHN-MCPFirst-7(0).jpg',
        description: '骺和骨干开始融合',
      },
      {
        level: '7(2)',
        image: 'RUS-CHN-MCPFirst-7(2).jpg',
        description: '骺与骨干融合过半',
      },
      {
        level: '8',
        image: 'RUS-CHN-MCPFirst-8.jpg',
        description: '骺与骨干完全融合',
      },

      
      // 添加更多等级数据...
    ],

    '第三、第五掌骨': [
      {
        level: '1',
        image: 'RUS-CHN-MCP-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-MCP-2.jpg',
        description: '骨化中心清晰可见,为圆形,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-MCP-3.jpg',
        description: '骺横径为骨干宽的一半或一半以上',
      },
      {
        level: '4(0)',
        image: 'RUS-CHN-MCP-4(0).jpg',
        description: '骺外、内、近侧缘清晰可见,在相互连接处成角;骨骺由椭圆形或半圆形变为铲形或手指甲形',
      },
      {
        level: '4(2)',
        image: 'RUS-CHN-MCP-4(2).jpg',
        description: '骺外侧端与骨干等宽',
      },
      {
        level: '5',
        image: 'RUS-CHN-MCP-5.jpg',
        description: '骺可区分掌侧面和背侧面,掌侧缘可见为纵向的致密白线',
      },
      {
        level: '6',
        image: 'RUS-CHN-MCP-6.jpg',
        description: '骺等于或宽于骨干',
      },
      {
        level: '7(0)',
        image: 'RUS-CHN-MCP-.jpg',
        description: '骺和骨干开始融合(生长板软骨的暗带不足骨宽度的3/4)',
      },
      {
        level: '7(2)',
        image: 'RUS-CHN-MCP-.jpg',
        description: '骺和骨干融合过半',
      },
      {
        level: '8',
        image: 'RUS-CHN-MCP-8.jpg',
        description: '骺和骨干完全融合',
      },

       // 添加更多等级数据...
    ],

    '第一近节指骨': [
      {
        level: '1',
        image: 'RUS-CHN-PIPFirst-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个，边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-PIPFirst-2.jpg',
        description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘(可能出现多个骨化中心,但即使其直径之和超过骨干宽的一半,也为该等级)',
      },
      {
        level: '3',
        image: 'RUS-CHN-PIPFirst-3.jpg',
        description: '骺最大直径为骨干宽的一半或一半以上',
      },
      {
        level: '4(0)',
        image: 'RUS-CHN-PIPFirst-4(0).jpg',
        description: '（1）骺近侧缘凹,通常致密。（2）骺内侧端宽于外侧端,成楔形。',
      },
      {
        level: '4(2)',
        image: 'RUS-CHN-PIPFirst-4(2).jpg',
        description: '骺外侧端与骨干等宽',
      },
      {
        level: '5(0)',
        image: 'RUS-CHN-PIPFirst-5(0).jpg',
        description: '骺宽于骨干(通常在内侧)',
      },
      {
        level: '5(2)',
        image: 'RUS-CHN-PIPFirst-5(2).jpg',
        description: '骺内侧端呈方形(与骨干的形状密切相符)',
      },
      {
        level: '6(0)',
        image: 'RUS-CHN-PIPFirst-6(0).jpg',
        description: '骺在一侧覆盖骨干(内侧端比外侧端更清晰)',
      },
      {
        level: '6(2)',
        image: 'RUS-CHN-PIPFirst-6(2).jpg',
        description: '骺在两侧覆盖骨干',
      },
      {
        level: '7(0)',
        image: 'RUS-CHN-PIPFirst-7(0).jpg',
        description: '骺和骨干开始融合',
      },
      {
        level: '7(2)',
        image: 'RUS-CHN-PIPFirst-7(2).jpg',
        description: '骺与骨干融合过半',
      },
      {
        level: '8',
        image: 'RUS-CHN-PIPFirst-8.jpg',
        description: '骺与骨干完全融合',
      },
      

       // 添加更多等级数据...
    ],

    '第三、第五近节指骨': [
      {
        level: '1',
        image: 'RUS-CHN-PIP-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-PIP-2.jpg',
        description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-PIP-3.jpg',
        description: '骺最大直径为骨干的一半或一半以上',
      },
      {
        level: '4(0)',
        image: 'RUS-CHN-PIP-4(0).jpg',
        description: '骺近侧缘凹,明显致密',
      },
      {
        level: '4(2)',
        image: 'RUS-CHN-PIP-4(2).jpg',
        description: '骺在一侧与骨干等宽',
      },
      {
        level: '5(0)',
        image: 'RUS-CHN-PIP-5(0).jpg',
        description: '骺在两侧和骨干等宽',
      },
      {
        level: '5(2)',
        image: 'RUS-CHN-PIP-5(2).jpg',
        description: '骺外侧端呈方形(虽然尚未覆盖骨干,但在形状上密切相符)',
      },
      {
        level: '6(0)',
        image: 'RUS-CHN-PIP-6(0).jpg',
        description: '骺在一侧覆盖骨干',
      },
      {
        level: '6(2)',
        image: 'RUS-CHN-PIP-6(2).jpg',
        description: '骺在两侧覆盖骨干',
      },
      {
        level: '7(0)',
        image: 'RUS-CHN-PIP-7(0).jpg',
        description: '骺和骨干开始融合',
      },
      {
        level: '7(2)',
        image: 'RUS-CHN-PIP-7(2).jpg',
        description: '骺与骨干融合过半',
      },
      {
        level: '8',
        image: 'RUS-CHN-PIP-8.jpg',
        description: '骺和骨干完全融合',
      },


       // 添加更多等级数据...
    ],

    '第三、第五中节指骨': [
      {
        level: '1',
        image: 'RUS-CHN-radius-1.jpg',
        description: '骨化中心仅可见一个钙化点，极少为多个，边缘不清晰',
      },

       // 添加更多等级数据...
    ],

    '第一远节指骨': [
      {
        level: '1',
        image: 'RUS-CHN-radius-1.jpg',
        description: '骨化中心仅可见一个钙化点，极少为多个，边缘不清晰',
      },

       // 添加更多等级数据...
    ],

    '第三、第五远节指骨': [
      {
        level: '1',
        image: 'RUS-CHN-radius-1.jpg',
        description: '骨化中心仅可见一个钙化点，极少为多个，边缘不清晰',
      },

       // 添加更多等级数据...
    ],

  },

  'TW3-C-RUS': {
    '桡骨': [
      {
        level: '1',
        image: 'RUS-CHN-radius-1.jpg',
        description: '骨化中心仅可见一个钙化点，极少为多个，边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-radius-2.jpg',
        description: '骨化中心清晰可见，为圆盘形，有平滑连续的缘',
       
      },
      {
        level: '3',
        image: 'RUS-CHN-radius-3.jpg',
        description: '（1）骺最大直径为骨干宽的一半或一半以上。<br>（2）骺外侧端增大、变厚、圆滑；内侧端为锥形。（3）骺近侧面的 1/3 变平,并稍致密,骺和骨干之间的间隙变窄,约1mm。',
        
      },
      {
        level: '4',
        image: 'RUS-CHN-radius-4.jpg',
        description: '骺远侧缘内出现致密白线,为掌侧缘,在其远侧为背侧缘。',
      },
      {
        level: '5',
        image: 'RUS-CHN-radius-5(0).jpg',
        
        description: '（1）骺近侧缘可区分为掌侧面和背侧面;掌侧面为该缘上不规则的致密白线。（2）骺内侧端向内侧和近侧生长,大部分近侧缘的形状和骨干相一致。',
       
      },
      
      {
        level: '6',
        image: 'RUS-CHN-radius-6.jpg',
        description: '（1）骺背侧面出现月骨和舟骨关节面,以一个小驼峰相连接。（2）骺内侧缘出现与尺骨骺相关节的掌侧面和背侧面:掌侧面或背侧面向内侧突出.（3）骺近侧缘稍凹。',
      },
      {
        level: '7',
        image: 'RUS-CHN-radius-7(0).jpg',
        description: '骺在一侧(通常在内侧)覆盖骨干',
      },
      
      {
        level: '8',
        image: 'RUS-CHN-radius-8(0).jpg',
        description: '骺和骨干开始融合',
      },
     
      // 添加更多等级数据...
    ],

    '尺骨': [
      {
        level: '1',
        image: 'RUS-CHN-ulna-1.jpg',
        description: '骨化中心可见一个钙化点,极少为多个,边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-ulna-2.jpg',
        description: '骨化中心清晰可见,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-ulna-3.jpg',
        description: '（1）骺最大直径为骨干宽的一半或一半以上。（2）骺横向的内、外侧直径比纵向的远、近侧直径大得多。（3）骺近侧和远侧缘都变平,但并不一定平行;骺通常为楔形,尖端指向外侧',
      },
      {
        level: '4',
        image: 'RUS-CHN-ulna-4.jpg',
        description: '骺茎突可见为小而清晰的凸起',
      },
      {
        level: '5',
        image: 'RUS-CHN-ulna-5(0).jpg',
        description: '（1）骺尺骨头清晰可辨,密度大于茎突(内侧关节面通常为致密的白线,而将尺骨头和茎突区分开来:尺骨头和茎突相接处的近侧或远侧缘通常出现凹陷)。（2）与桡骨骺相邻的缘变平。',
      },
      
      {
        level: '6',
        image: 'RUS-CHN-ulna-6.jpg',
        description: '（1）骺近侧缘在两侧与骨干等宽。（2）骺近侧缘和骨干远侧缘在中间1/3处重叠。'
      },
      {
        level: '7',
        image: 'RUS-CHN-ulna-7(0).jpg',
        description: '骺和骨干开始融合',
      },
      
      // 添加更多等级数据...
    ],

    '第一掌骨': [
      {
        level: '1',
        image: 'RUS-CHN-MCPFirst-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-MCPFirst-2.jpg',
        description: '骨化中心清晰可见,形状为圆形,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-MCPFirst-3.jpg',
        description: '骺最大直径为骨干宽的一半或一半以上',
      },
      {
        level: '4',
        image: 'RUS-CHN-MCPFirst-4.jpg',
        description: '（1）骺与骨干等宽。（2）骺近侧缘凹(开始出现掌侧面和背侧面)。',
      },
      {
        level: '5',
        image: 'RUS-CHN-MCPFirst-5(0).jpg',
        description: '骺近侧面可区分为掌侧面和背侧面,并可见背侧面的全部长度:其鞍状关节面与大多角骨的相邻缘一致',
      },
      
      {
        level: '6',
        image: 'RUS-CHN-MCPFirst-6(0).jpg',
        description: '骺在一侧覆盖骨干(由于拇指的转动内侧的覆盖通常比外侧更清晰)',
      },
      
      {
        level: '7',
        image: 'RUS-CHN-MCPFirst-7(0).jpg',
        description: '骺和骨干开始融合',
      },
      
      {
        level: '8',
        image: 'RUS-CHN-MCPFirst-8.jpg',
        description: '骺与骨干完全融合',
      },

      // 添加更多等级数据...
    ],

    '第三、第五掌骨': [
      {
        level: '1',
        image: 'RUS-CHN-MCP-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-MCP-2.jpg',
        description: '骨化中心清晰可见,为圆形,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-MCP-3.jpg',
        description: '骺横径为骨干宽的一半或一半以上',
      },
      {
        level: '4',
        image: 'RUS-CHN-MCP-4(0).jpg',
        description: '骺外、内、近侧缘清晰可见,在相互连接处成角;骨骺由椭圆形或半圆形变为铲形或手指甲形',
      },
     
      {
        level: '5',
        image: 'RUS-CHN-MCP-5.jpg',
        description: '骺可区分掌侧面和背侧面,掌侧缘可见为纵向的致密白线',
      },
      {
        level: '6',
        image: 'RUS-CHN-MCP-6.jpg',
        description: '骺等于或宽于骨干',
      },
      {
        level: '7',
        image: 'RUS-CHN-MCP-.jpg',
        description: '骺和骨干开始融合(生长板软骨的暗带不足骨宽度的3/4)',
      },
      
      {
        level: '8',
        image: 'RUS-CHN-MCP-8.jpg',
        description: '骺和骨干完全融合',
      },

       // 添加更多等级数据...
    ],

    '第一近节指骨': [
      {
        level: '1',
        image: 'RUS-CHN-PIPFirst-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个，边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-PIPFirst-2.jpg',
        description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘(可能出现多个骨化中心,但即使其直径之和超过骨干宽的一半,也为该等级)',
      },
      {
        level: '3',
        image: 'RUS-CHN-PIPFirst-3.jpg',
        description: '骺最大直径为骨干宽的一半或一半以上',
      },
      {
        level: '4',
        image: 'RUS-CHN-PIPFirst-4(0).jpg',
        description: '（1）骺近侧缘凹,通常致密。（2）骺内侧端宽于外侧端,成楔形。',
      },
      
      {
        level: '5',
        image: 'RUS-CHN-PIPFirst-5(0).jpg',
        description: '骺宽于骨干(通常在内侧)',
      },
      
      {
        level: '6',
        image: 'RUS-CHN-PIPFirst-6(0).jpg',
        description: '骺在一侧覆盖骨干(内侧端比外侧端更清晰)',
      },
      
      {
        level: '7',
        image: 'RUS-CHN-PIPFirst-7(0).jpg',
        description: '骺和骨干开始融合',
      },
    
      {
        level: '8',
        image: 'RUS-CHN-PIPFirst-8.jpg',
        description: '骺与骨干完全融合',
      },
      

       // 添加更多等级数据...
    ],

    '第三、第五近节指骨': [
      {
        level: '1',
        image: 'RUS-CHN-PIP-1.jpg',
        description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰',
      },
      {
        level: '2',
        image: 'RUS-CHN-PIP-2.jpg',
        description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘',
      },
      {
        level: '3',
        image: 'RUS-CHN-PIP-3.jpg',
        description: '骺最大直径为骨干的一半或一半以上',
      },
      {
        level: '4',
        image: 'RUS-CHN-PIP-4(0).jpg',
        description: '骺近侧缘凹,明显致密',
      },
     
      {
        level: '5',
        image: 'RUS-CHN-PIP-5(0).jpg',
        description: '骺在两侧和骨干等宽',
      },
      
      {
        level: '6',
        image: 'RUS-CHN-PIP-6(0).jpg',
        description: '骺在一侧覆盖骨干',
      },
     
      {
        level: '7',
        image: 'RUS-CHN-PIP-7(0).jpg',
        description: '骺和骨干开始融合',
      },
      
      {
        level: '8',
        image: 'RUS-CHN-PIP-8.jpg',
        description: '骺和骨干完全融合',
      },
    ],
    
  },
  
  // 添加其他模式数据...
}

// 组件参数
const props = defineProps({
  visible: Boolean,
  logo: String
})

const emit = defineEmits(['close'])

// 响应式状态
const modes = ref(['RUS-CHN', 'TW3-C-RUS', 'TW3-C-CARPAL'])
const activeMode = ref('RUS-CHN')
const currentBones = computed(() => Object.keys(boneData[activeMode.value] || {}))
const selectedBone = ref(null)
const currentGrades = ref([])
const currentPage = ref(1)
const pageSize = 4 // 每页显示4个等级

// 计算属性
const paginatedGrades = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return currentGrades.value.slice(start, start + pageSize)
})

const totalPages = computed(() => 
  Math.ceil(currentGrades.value.length / pageSize)
)

// 方法
const switchMode = (mode) => {
  activeMode.value = mode
  selectedBone.value = null
  currentPage.value = 1
}

const selectBone = (bone) => {
  selectedBone.value = bone
  currentGrades.value = boneData[activeMode.value]?.[bone] || []
  currentPage.value = 1
}

const prevPage = () => currentPage.value > 1 && currentPage.value--
const nextPage = () => currentPage.value < totalPages.value && currentPage.value++

const getImagePath = (imgName) => {
  try {
    return new URL(`/src/assets/grades/${imgName}`, import.meta.url).href
  } catch {
    return '/fallback-image.jpg' // 备用图片路径
  }
}

const handleImageError = (event) => {
  event.target.src = '/image-error.jpg' // 错误处理图片
}

const handleClose = () => {
  emit('close')
  selectedBone.value = null
  currentPage.value = 1
}

// 监听模式变化
watch(activeMode, () => {
  selectedBone.value = null
  currentGrades.value = []
})
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
  height: 80vh;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%; /* 新增 */
  position: relative; /* 新增 */
}

.guide-title {
  font-size: 1.1em;
  color: #7f8c8d;
  margin-top: 2px;
  margin-left: 10px;
}

.logo {
  width: 36px;
  height: 36px;
}

.system-name {
  font-size: 1.2em;
  font-weight: 500;
  color: #2c3e50;
}

.mode-buttons {
  position: absolute; /* 新增定位 */
  left: 55%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
}

.mode-btn {
  padding: 8px 16px;
  border: 1px solid #3498db;
  border-radius: 20px;
  background: #f8f9fa;
  color: #3498db;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-btn.active,
.mode-btn:hover {
  background: #3498db;
  color: white;
}

.close-btn {
  font-size: 24px;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  color: #7f8c8d;
  cursor: pointer;
}

.close-btn:hover {
  color: #e74c3c;
}

.bone-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 24px;
  border-bottom: 1px solid #eee;
}

.bone-btn {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  background: #f8f9fa;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.bone-btn.active,
.bone-btn:hover {
  border-color: #3498db;
  background: #3498db;
  color: white;
}

.main-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #999;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.pagination-control {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 12px 0;
  margin-bottom: 16px;
}

.page-btn {
  padding: 8px 16px;
  border: 1px solid #3498db;
  border-radius: 4px;
  background: #f8f9fa;
  color: #3498db;
  cursor: pointer;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-indicator {
  color: #666;
}

.grade-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.grade-card {
  display: grid;
  grid-template-columns: 200px 1fr;
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.image-container {
  position: relative;
  background: #f8f9fa;
  min-height: 200px;
}

.grade-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 16px;
}

.grade-level {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.9em;
}

.grade-info {
  padding: 16px;
}

.grade-title {
  color: #2c3e50;
  margin-bottom: 12px;
  font-size: 1.1em;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-label {
  color: #3498db;
  font-weight: 500;
}

.detail-value {
  color: #666;
}

.grade-desc {
  color: #666;
  line-height: 1.6;
  font-size: 0.95em;
}

@media (max-width: 1024px) {
  .popup-container {
    width: 90%;
    height: 90vh;
  }

  .grade-grid {
    grid-template-columns: 1fr;
  }

  .grade-card {
    grid-template-columns: 1fr;
  }

  .image-container {
    height: 180px;
  }
}

@media (max-width: 768px) {
  .mode-buttons {
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .bone-selection {
    overflow-x: auto;
  }
}
</style>
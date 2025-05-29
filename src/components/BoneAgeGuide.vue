<template>
    <dialog id="bone_age_guide" class="modal">
        <div class="modal-box w-11/12 h-[90vh] max-w-5xl flex flex-col">
            <!-- 标题栏 -->
            <div>
                <div class="flex flex-row justify-start items-center mx-4">
                    <div class="avatar">
                        <div class="w-10 rounded">
                            <img src="/logo.png" />
                        </div>
                    </div>
                    <a class="mx-4 text-xl">骨龄评估系统</a>
                    <h1 class="mx-4 text-gray-700 text-lg font-semibold">中华05指南</h1>
                    <!-- 模式选择区 -->
                    <div class="mx-8 flex flex-row justify-center items-center gap-2">
                        <button v-for="mode in modes" :key="mode" class="btn btn-ml btn-outline btn-info rounded-full" :class="{ 'btn-active': activeMode === mode }" @click="switchMode(mode)">{{ mode }}</button>
                    </div>
                </div>
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="closeModal">✕</button>
            </div>
            <div class="divider"></div>
            <!-- 骨骼选择区 -->
            <div class="mx-4">
                <div class="flex flex-row justify-start items-center flex-wrap gap-2">
                    <button v-for="bone in bones" :key="bone" class="btn btn-ml btn-soft btn-info rounded-full text-gray-700" :class="{ 'btn-active': activeBone === bone }" @click="selectBone(bone)">{{ bone }}</button>
                </div>
            </div>
            <div class="divider"></div>
            <!-- 骨骼数据展示区 -->
            <div v-if="activeBone == null" class="mx-4 flex-1 flex flex-col justify-center items-center gap-4 h-64">
                <div class="text-5xl">🦴</div>
                <div class="text-xl font-semibold text-gray-500">请先选择要查看的骨骼</div>
            </div>
            <div v-else class="px-4 flex-1 overflow-y-scroll">
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="grade in grades" :key="grade.level" class="card card-side bg-base-200 shadow-sm">
                        <div class="w-46 h-46 relative">
                            <div class="absolute top-3 right-3">
                                <div class="px-2 py-1 rounded bg-zinc-700 text-white text-sm">等级 {{ grade.level }}</div>
                            </div>
                            <img :src="getImagePath(grade.image)" alt="" class="w-46 h-46 object-contain" />
                        </div>
                        <div class="flex-1 p-4">
                            <div class="text-gray-600">{{ grade.description }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</template>

<script>
export default {
    name: 'BoneAgeGuide',
    components: {},
    setup() {
        return {};
    },
    data() {
        return {
            modes: ['RUS-CHN', 'TW3-C-RUS', 'TW3-C-CARPAL'], // 模式选择列表
            grades: null, // 等级列表
            activeMode: 'RUS-CHN', // 当前模式
            activeBone: null, // 当前骨骼
            boneData: {
                // 骨骼数据
                'RUS-CHN': {
                    '桡骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-radius-1.jpg',
                            description: '骨化中心仅可见一个钙化点，极少为多个，边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-radius-2.jpg',
                            description: '骨化中心清晰可见，为圆盘形，有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-radius-3.jpg',
                            description: '（1）骺最大直径为骨干宽的一半或一半以上。（2）骺外侧端增大、变厚、圆滑；内侧端为锥形。（3）骺近侧面的 1/3 变平,并稍致密,骺和骨干之间的间隙变窄,约1mm。'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-radius-4.jpg',
                            description: '骺远侧缘内出现致密白线,为掌侧缘,在其远侧为背侧缘。'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-radius-5(0).jpg',
                            description: '（1）骺近侧缘可区分为掌侧面和背侧面;掌侧面为该缘上不规则的致密白线。（2）骺内侧端向内侧和近侧生长,大部分近侧缘的形状和骨干相一致。'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-radius-5(2).jpg',
                            description: '骺内侧端与骨干等宽'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-radius-6.jpg',
                            description: '（1）骺背侧面出现月骨和舟骨关节面,以一个小驼峰相连接。（2）骺内侧缘出现与尺骨骺相关节的掌侧面和背侧面:掌侧面或背侧面向内侧突出.（3）骺近侧缘稍凹。'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-radius-7(0).jpg',
                            description: '骺在一侧(通常在内侧)覆盖骨干'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-radius-7(2).jpg',
                            description: '骺在两侧覆盖骨干'
                        },
                        {
                            level: '8(0)',
                            image: 'RUS-CHN-radius-8(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '8(1)',
                            image: 'RUS-CHN-radius-8(1).jpg',
                            description: '骺和骨干融合1/4'
                        },
                        {
                            level: '8(2)',
                            image: 'RUS-CHN-radius-8(2).jpg',
                            description: '骺和骨干融合1/2'
                        },
                        {
                            level: '8(3)',
                            image: 'RUS-CHN-radius-8(3).jpg',
                            description: '骺和骨干融合3/4'
                        },
                        {
                            level: '8(4)',
                            image: 'RUS-CHN-radius-8(4).jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '尺骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-ulna-1.jpg',
                            description: '骨化中心可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-ulna-2.jpg',
                            description: '骨化中心清晰可见,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-ulna-3.jpg',
                            description: '（1）骺最大直径为骨干宽的一半或一半以上。（2）骺横向的内、外侧直径比纵向的远、近侧直径大得多。（3）骺近侧和远侧缘都变平,但并不一定平行;骺通常为楔形,尖端指向外侧'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-ulna-4.jpg',
                            description: '骺茎突可见为小而清晰的凸起'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-ulna-5(0).jpg',
                            description: '（1）骺尺骨头清晰可辨,密度大于茎突(内侧关节面通常为致密的白线,而将尺骨头和茎突区分开来:尺骨头和茎突相接处的近侧或远侧缘通常出现凹陷)。（2）与桡骨骺相邻的缘变平。'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-ulna-5(2).jpg',
                            description: '骺近侧缘在一侧与骨干等宽'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-ulna-6.jpg',
                            description: '（1）骺近侧缘在两侧与骨干等宽。（2）骺近侧缘和骨干远侧缘在中间1/3处重叠。'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-ulna-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '7(1)',
                            image: 'RUS-CHN-ulna-7(1).jpg',
                            description: '骺和骨干融合1/4'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-ulna-7(2).jpg',
                            description: '骺和骨干融合1/2'
                        },
                        {
                            level: '7(3)',
                            image: 'RUS-CHN-ulna-7(3).jpg',
                            description: '骺和骨干融合3/4'
                        },
                        {
                            level: '7(4)',
                            image: 'RUS-CHN-ulna-7(4).jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第一掌骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-MCPFirst-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-MCPFirst-2.jpg',
                            description: '骨化中心清晰可见,形状为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-MCPFirst-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-MCPFirst-4.jpg',
                            description: '（1）骺与骨干等宽。（2）骺近侧缘凹(开始出现掌侧面和背侧面)。'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-MCPFirst-5(0).jpg',
                            description: '骺近侧面可区分为掌侧面和背侧面,并可见背侧面的全部长度:其鞍状关节面与大多角骨的相邻缘一致'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-MCPFirst-5(2).jpg',
                            description: '骺内侧缘变平'
                        },
                        {
                            level: '6(0)',
                            image: 'RUS-CHN-MCPFirst-6(0).jpg',
                            description: '骺在一侧覆盖骨干(由于拇指的转动内侧的覆盖通常比外侧更清晰)'
                        },
                        {
                            level: '6(2)',
                            image: 'RUS-CHN-MCPFirst-6(2).jpg',
                            description: '骺在两侧覆盖骨干'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-MCPFirst-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-MCPFirst-7(2).jpg',
                            description: '骺与骨干融合过半'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-MCPFirst-8.jpg',
                            description: '骺与骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第三、第五掌骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-MCP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-MCP-2.jpg',
                            description: '骨化中心清晰可见,为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-MCP-3.jpg',
                            description: '骺横径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4(0)',
                            image: 'RUS-CHN-MCP-4(0).jpg',
                            description: '骺外、内、近侧缘清晰可见,在相互连接处成角;骨骺由椭圆形或半圆形变为铲形或手指甲形'
                        },
                        {
                            level: '4(2)',
                            image: 'RUS-CHN-MCP-4(2).jpg',
                            description: '骺外侧端与骨干等宽'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-MCP-5.jpg',
                            description: '骺可区分掌侧面和背侧面,掌侧缘可见为纵向的致密白线'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-MCP-6.jpg',
                            description: '骺等于或宽于骨干'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-MCP-7(0).jpg',
                            description: '骺和骨干开始融合(生长板软骨的暗带不足骨宽度的3/4)'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-MCP-7(2).jpg',
                            description: '骺和骨干融合过半'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-MCP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第一近节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-PIPFirst-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个，边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-PIPFirst-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘(可能出现多个骨化中心,但即使其直径之和超过骨干宽的一半,也为该等级)'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-PIPFirst-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4(0)',
                            image: 'RUS-CHN-PIPFirst-4(0).jpg',
                            description: '（1）骺近侧缘凹,通常致密。（2）骺内侧端宽于外侧端,成楔形。'
                        },
                        {
                            level: '4(2)',
                            image: 'RUS-CHN-PIPFirst-4(2).jpg',
                            description: '骺外侧端与骨干等宽'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-PIPFirst-5(0).jpg',
                            description: '骺宽于骨干(通常在内侧)'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-PIPFirst-5(2).jpg',
                            description: '骺内侧端呈方形(与骨干的形状密切相符)'
                        },
                        {
                            level: '6(0)',
                            image: 'RUS-CHN-PIPFirst-6(0).jpg',
                            description: '骺在一侧覆盖骨干(内侧端比外侧端更清晰)'
                        },
                        {
                            level: '6(2)',
                            image: 'RUS-CHN-PIPFirst-6(2).jpg',
                            description: '骺在两侧覆盖骨干'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-PIPFirst-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-PIPFirst-7(2).jpg',
                            description: '骺与骨干融合过半'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-PIPFirst-8.jpg',
                            description: '骺与骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第三、第五近节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-PIP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-PIP-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-PIP-3.jpg',
                            description: '骺最大直径为骨干的一半或一半以上'
                        },
                        {
                            level: '4(0)',
                            image: 'RUS-CHN-PIP-4(0).jpg',
                            description: '骺近侧缘凹,明显致密'
                        },
                        {
                            level: '4(2)',
                            image: 'RUS-CHN-PIP-4(2).jpg',
                            description: '骺在一侧与骨干等宽'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-PIP-5(0).jpg',
                            description: '骺在两侧和骨干等宽'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-PIP-5(2).jpg',
                            description: '骺外侧端呈方形(虽然尚未覆盖骨干,但在形状上密切相符)'
                        },
                        {
                            level: '6(0)',
                            image: 'RUS-CHN-PIP-6(0).jpg',
                            description: '骺在一侧覆盖骨干'
                        },
                        {
                            level: '6(2)',
                            image: 'RUS-CHN-PIP-6(2).jpg',
                            description: '骺在两侧覆盖骨干'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-PIP-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-PIP-7(2).jpg',
                            description: '骺与骨干融合过半'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-PIP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第三、第五中节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-MIP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-MIP-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-MIP-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4(0)',
                            image: 'RUS-CHN-MIP-4(0).jpg',
                            description: '骺近侧缘的中间部分变厚,朝向相邻指骨的末端生长,并按其滑车关节面成形(致密线为骺的背侧面:在它的一侧或两侧,掌侧面向近侧凸出,或掌侧面和背侧面的近侧缘重叠)'
                        },
                        {
                            level: '4(2)',
                            image: 'RUS-CHN-MIP-4(2).jpg',
                            description: '骺在外侧与骨干等宽'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-MIP-5(0).jpg',
                            description: '骺在两侧与骨干等宽'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-MIP-5(2).jpg',
                            description: '骺外侧端呈方形'
                        },
                        {
                            level: '6(0)',
                            image: 'RUS-CHN-MIP-6(0).jpg',
                            description: '骺在一侧覆盖骨干(通常在外侧)'
                        },
                        {
                            level: '6(2)',
                            image: 'RUS-CHN-MIP-6(2).jpg',
                            description: '骺在两侧覆盖骨干'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-MIP-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-MIP-7(2).jpg',
                            description: '骺与骨干融合过半'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-MIP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第一远节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-radius-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-radius-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-radius-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-radius-4.jpg',
                            description: '（1）骺与骨干等宽。（2）骺远侧缘变平,近侧缘成角(类似于中节、远节指骨骺在该等级上沿中心轴向下生长而出现的近侧缘形状变化。由于拇指的转动,这种变化通常发生在近侧缘的内侧)。'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-radius-5(0).jpg',
                            description: '（1）骺的近-外侧缘凹,按近节指骨头的形状成形(由于拇指内旋程度不同,关节面也可表现为近-外侧缘内的致密凹陷)。（2）在骺远侧缘上可见内、外侧面,远节指骨底与内、外侧面之间的鞍形相一致。（3）骺宽于骨干。'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-radius-5(2).jpg',
                            description: '骺外侧端呈方形'
                        },
                        {
                            level: '6(0)',
                            image: 'RUS-CHN-radius-6.jpg',
                            description: '骺在一侧覆盖骨干(由于拇指的内旋内侧端更清晰)'
                        },
                        {
                            level: '6(2)',
                            image: 'RUS-CHN-radius-6.jpg',
                            description: '骺在两侧覆盖骨干'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-radius-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-radius-7(2).jpg',
                            description: '骺与骨干融合过半'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-radius-8(0).jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第三、第五远节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-DIP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-DIP-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-DIP-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-DIP-4.jpg',
                            description: '（1）骺与骨干等宽。（2）骺近侧缘向中节指骨末端生长,但尚不能区分出掌侧面和背侧面。'
                        },
                        {
                            level: '5(0)',
                            image: 'RUS-CHN-DIP-5(0).jpg',
                            description: '骺近侧缘可区分为掌侧面和背侧面,并都按中节指骨的滑车关节面成形。背侧面致密白线近侧的凸出部分为掌侧面'
                        },
                        {
                            level: '5(2)',
                            image: 'RUS-CHN-DIP-5(2).jpg',
                            description: '骺外侧呈方形'
                        },
                        {
                            level: '6(0)',
                            image: 'RUS-CHN-DIP-6(0).jpg',
                            description: '骺在一侧覆盖骨干'
                        },
                        {
                            level: '6(2)',
                            image: 'RUS-CHN-DIP-6(2).jpg',
                            description: ':骺在两侧覆干骨干'
                        },
                        {
                            level: '7(0)',
                            image: 'RUS-CHN-DIP-7(0).jpg',
                            description: '骺与骨干开始融合'
                        },
                        {
                            level: '7(2)',
                            image: 'RUS-CHN-DIP-7(2).jpg',
                            description: '骺与骨干融合过半'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-DIP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ]
                },
                'TW3-C-RUS': {
                    '桡骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-radius-1.jpg',
                            description: '骨化中心仅可见一个钙化点，极少为多个，边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-radius-2.jpg',
                            description: '骨化中心清晰可见，为圆盘形，有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-radius-3.jpg',
                            description: '（1）骺最大直径为骨干宽的一半或一半以上。<br>（2）骺外侧端增大、变厚、圆滑；内侧端为锥形。（3）骺近侧面的 1/3 变平,并稍致密,骺和骨干之间的间隙变窄,约1mm。'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-radius-4.jpg',
                            description: '骺远侧缘内出现致密白线,为掌侧缘,在其远侧为背侧缘。'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-radius-5(0).jpg',
                            description: '（1）骺近侧缘可区分为掌侧面和背侧面;掌侧面为该缘上不规则的致密白线。（2）骺内侧端向内侧和近侧生长,大部分近侧缘的形状和骨干相一致。'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-radius-6.jpg',
                            description: '（1）骺背侧面出现月骨和舟骨关节面,以一个小驼峰相连接。（2）骺内侧缘出现与尺骨骺相关节的掌侧面和背侧面:掌侧面或背侧面向内侧突出.（3）骺近侧缘稍凹。'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-radius-7(0).jpg',
                            description: '骺在一侧(通常在内侧)覆盖骨干'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-radius-8(0).jpg',
                            description: '骺和骨干开始融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '尺骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-ulna-1.jpg',
                            description: '骨化中心可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-ulna-2.jpg',
                            description: '骨化中心清晰可见,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-ulna-3.jpg',
                            description: '（1）骺最大直径为骨干宽的一半或一半以上。（2）骺横向的内、外侧直径比纵向的远、近侧直径大得多。（3）骺近侧和远侧缘都变平,但并不一定平行;骺通常为楔形,尖端指向外侧'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-ulna-4.jpg',
                            description: '骺茎突可见为小而清晰的凸起'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-ulna-5(0).jpg',
                            description: '（1）骺尺骨头清晰可辨,密度大于茎突(内侧关节面通常为致密的白线,而将尺骨头和茎突区分开来:尺骨头和茎突相接处的近侧或远侧缘通常出现凹陷)。（2）与桡骨骺相邻的缘变平。'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-ulna-6.jpg',
                            description: '（1）骺近侧缘在两侧与骨干等宽。（2）骺近侧缘和骨干远侧缘在中间1/3处重叠。'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-ulna-7(0).jpg',
                            description: '骺和骨干开始融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第一掌骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-MCPFirst-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-MCPFirst-2.jpg',
                            description: '骨化中心清晰可见,形状为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-MCPFirst-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-MCPFirst-4.jpg',
                            description: '（1）骺与骨干等宽。（2）骺近侧缘凹(开始出现掌侧面和背侧面)。'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-MCPFirst-5(0).jpg',
                            description: '骺近侧面可区分为掌侧面和背侧面,并可见背侧面的全部长度:其鞍状关节面与大多角骨的相邻缘一致'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-MCPFirst-6(0).jpg',
                            description: '骺在一侧覆盖骨干(由于拇指的转动内侧的覆盖通常比外侧更清晰)'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-MCPFirst-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-MCPFirst-8.jpg',
                            description: '骺与骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第三、第五掌骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-MCP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-MCP-2.jpg',
                            description: '骨化中心清晰可见,为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-MCP-3.jpg',
                            description: '骺横径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-MCP-4(0).jpg',
                            description: '骺外、内、近侧缘清晰可见,在相互连接处成角;骨骺由椭圆形或半圆形变为铲形或手指甲形'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-MCP-5.jpg',
                            description: '骺可区分掌侧面和背侧面,掌侧缘可见为纵向的致密白线'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-MCP-6.jpg',
                            description: '骺等于或宽于骨干'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-MCP-.jpg',
                            description: '骺和骨干开始融合(生长板软骨的暗带不足骨宽度的3/4)'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-MCP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第一近节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-PIPFirst-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个，边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-PIPFirst-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘(可能出现多个骨化中心,但即使其直径之和超过骨干宽的一半,也为该等级)'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-PIPFirst-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-PIPFirst-4(0).jpg',
                            description: '（1）骺近侧缘凹,通常致密。（2）骺内侧端宽于外侧端,成楔形。'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-PIPFirst-5(0).jpg',
                            description: '骺宽于骨干(通常在内侧)'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-PIPFirst-6(0).jpg',
                            description: '骺在一侧覆盖骨干(内侧端比外侧端更清晰)'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-PIPFirst-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-PIPFirst-8.jpg',
                            description: '骺与骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第三、第五近节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-PIP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-PIP-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-PIP-3.jpg',
                            description: '骺最大直径为骨干的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-PIP-4(0).jpg',
                            description: '骺近侧缘凹,明显致密'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-PIP-5(0).jpg',
                            description: '骺在两侧和骨干等宽'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-PIP-6(0).jpg',
                            description: '骺在一侧覆盖骨干'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-PIP-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-PIP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                    ],
                    '第三、第五中节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-MIP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-MIP-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-MIP-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-MIP-4(0).jpg',
                            description: '骺近侧缘的中间部分变厚,朝向相邻指骨的末端生长,并按其滑车关节面成形(致密线为骺的背侧面:在它的一侧或两侧,掌侧面向近侧凸出,或掌侧面和背侧面的近侧缘重叠)'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-MIP-5(0).jpg',
                            description: '骺在两侧与骨干等宽'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-MIP-6(0).jpg',
                            description: '骺在一侧覆盖骨干(通常在外侧)'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-MIP-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-MIP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                    ],
                    '第一远节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-radius-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-radius-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-radius-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-radius-4.jpg',
                            description: '（1）骺与骨干等宽。（2）骺远侧缘变平,近侧缘成角(类似于中节、远节指骨骺在该等级上沿中心轴向下生长而出现的近侧缘形状变化。由于拇指的转动,这种变化通常发生在近侧缘的内侧)。'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-radius-5(0).jpg',
                            description: '（1）骺的近-外侧缘凹,按近节指骨头的形状成形(由于拇指内旋程度不同,关节面也可表现为近-外侧缘内的致密凹陷)。（2）在骺远侧缘上可见内、外侧面,远节指骨底与内、外侧面之间的鞍形相一致。（3）骺宽于骨干。'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-radius-6(0).jpg',
                            description: '骺在一侧覆盖骨干(由于拇指的内旋内侧端更清晰)'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-radius-7(0).jpg',
                            description: '骺和骨干开始融合'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-radius-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ],
                    '第三、第五远节指骨': [
                        {
                            level: '1',
                            image: 'RUS-CHN-DIP-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'RUS-CHN-DIP-2.jpg',
                            description: '骨化中心清晰可见,为圆盘形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'RUS-CHN-DIP-3.jpg',
                            description: '骺最大直径为骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'RUS-CHN-DIP-4.jpg',
                            description: '（1）骺与骨干等宽。（2）骺近侧缘向中节指骨末端生长,但尚不能区分出掌侧面和背侧面。'
                        },
                        {
                            level: '5',
                            image: 'RUS-CHN-DIP-5(0).jpg',
                            description: '骺近侧缘可区分为掌侧面和背侧面,并都按中节指骨的滑车关节面成形。背侧面致密白线近侧的凸出部分为掌侧面'
                        },
                        {
                            level: '6',
                            image: 'RUS-CHN-DIP-6(0).jpg',
                            description: '骺在一侧覆盖骨干'
                        },
                        {
                            level: '7',
                            image: 'RUS-CHN-DIP-7(0).jpg',
                            description: '骺与骨干开始融合'
                        },
                        {
                            level: '8',
                            image: 'RUS-CHN-DIP-8.jpg',
                            description: '骺和骨干完全融合'
                        }
                        // 添加更多等级数据...
                    ]
                },
                'TW3-C-CARPAL': {
                    头状骨: [
                        {
                            level: '1',
                            image: 'TW3-C-CARPAL-capitate-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'TW3-C-CARPAL-capitate-2.jpg',
                            description: '骨化中心清晰可见,为椭圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'TW3-C-CARPAL-capitate-3.jpg',
                            description: '（1）骨化中心最大直径为桡骨宽的一半或一半以上。（2）骨化中心与钩骨相邻缘变平,或仅稍凹。（3）骨化中心与第二掌骨相邻缘也开始与钩骨缘不同,因而骨化中心近似D形'
                        },
                        {
                            level: '4',
                            image: 'TW3-C-CARPAL-capitate-4.jpg',
                            description: '（1）骨化中心钩骨缘凹,稍致密。（2）骨化中心增长,纵向直径明显大于横向直径,但小于近侧缘到桡骨骨干之间的距离。'
                        },
                        {
                            level: '5',
                            image: 'TW3-C-CARPAL-capitate-5.jpg',
                            description: '骨化中心纵向直径等于或大于近侧缘到桡骨干的距离'
                        },
                        {
                            level: '6',
                            image: 'TW3-C-CARPAL-capitate-6.jpg',
                            description: '（1）骨化中心远侧的外侧缘(第二和第三掌骨关节面)致密。（2）骨化中心在钩骨缘(钩骨关节面)凹的中部出现致密白线。'
                        },
                        {
                            level: '7',
                            image: 'TW3-C-CARPAL-capitate-7.jpg',
                            description: '骨化中心第二和第三掌骨关节面可区分为掌侧面和背侧面:上一等级中远侧的外侧缘致密白线已经到了边缘的内部'
                        }
                        // 添加更多等级数据...
                    ],
                    钩骨: [
                        {
                            level: '1',
                            image: 'TW3-C-CARPAL-hamate-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'TW3-C-CARPAL-hamate-2.jpg',
                            description: '骨化中心清晰可见,为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'TW3-C-CARPAL-hamate-3.jpg',
                            description: '（1）骨化中心最大直径为桡骨骨干宽的一半或一半以上。（2）骨化中心三角骨关节面变平,形状为D形,直线端与手的长轴成斜线方向，'
                        },
                        {
                            level: '4',
                            image: 'TW3-C-CARPAL-hamate-4.jpg',
                            description: '（1）骨化中心头状骨缘按头状骨的钩骨关节面成形(通常的形式为,在该缘的一半处或向下 2/3 处微凸,在凸的远侧和近侧的缘变平)。（2）骨化中心可区分出掌骨缘和头状骨缘,形状由D形变为三角形。'
                        },
                        {
                            level: '5',
                            image: 'TW3-C-CARPAL-hamate-5.jpg',
                            description: '骨化中心三角骨缘凹(由于从上一等级开始明显朝向第五掌骨底生长)'
                        },
                        {
                            level: '6',
                            image: 'TW3-C-CARPAL-hamate-6.jpg',
                            description: '骨化中心第四掌骨关节面可区分为掌侧面和背侧面,沿骨的远侧缘或在远侧缘以内可见致密白线'
                        },
                        {
                            level: '7',
                            image: 'TW3-C-CARPAL-hamate-7.jpg',
                            description: '（1）骨化中心开始出现钩的致密轮廓线。（2）骨化中心可区分出第四和第五掌骨关节面:横向的为第四掌骨关节面,与手纵轴成斜线方向的为第五掌骨关节面。'
                        },
                        {
                            level: '8',
                            image: 'TW3-C-CARPAL-hamate-8.jpg',
                            description: '骨化中心钩骨的钩已完全可见'
                        }
                        // 添加更多等级数据...
                    ],
                    三角骨: [
                        {
                            level: '1',
                            image: 'TW3-C-CARPAL-triquetral-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'TW3-C-CARPAL-triquetral-2.jpg',
                            description: '骨化中心清晰可见,为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'TW3-C-CARPAL-triquetral-3.jpg',
                            description: '（1）骨化中心最大直径为尺骨骨干宽的一半或一半以上。（2）骨化中心与钩骨相邻的缘变平。'
                        },
                        {
                            level: '4',
                            image: 'TW3-C-CARPAL-triquetral-4.jpg',
                            description: '骨化中心增长,纵向直径明显大于横向直径(从上一等级开始,在内-远侧缘生长最快)'
                        },
                        {
                            level: '5',
                            image: 'TW3-C-CARPAL-triquetral-5.jpg',
                            description: '骨化中心月骨缘变平,与钩骨缘形成稍大于90°的角,一条缘或两条缘致密'
                        },
                        {
                            level: '6',
                            image: 'TW3-C-CARPAL-triquetral-6.jpg',
                            description: '骨化中心钩骨缘或月骨缘可见掌侧面和背侧面,上一等级所见的缘上致密白线已经到了缘内'
                        },
                        {
                            level: '7',
                            image: 'TW3-C-CARPAL-triquetral-7.jpg',
                            description: '骨化中心的远侧部分增宽,内侧缘凹'
                        }
                        // 添加更多等级数据...
                    ],
                    月骨: [
                        {
                            level: '1',
                            image: 'TW3-C-CARPAL-lunate-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'TW3-C-CARPAL-lunate-2.jpg',
                            description: '骨化中心清晰可见,为椭圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'TW3-C-CARPAL-lunate-3.jpg',
                            description: '（1）骨化中心最大直径为尺骨骨干宽的一半或一半以上。（2）骨化中心的远侧缘致密。'
                        },
                        {
                            level: '4',
                            image: 'TW3-C-CARPAL-lunate-4.jpg',
                            description: '（1）骨化中心远侧部分可见掌侧面或背侧面,其中一个面或两个面由二者汇合处的致密线向远侧凸出:背侧面可能朝向舟骨凸出,但未形成下一等级的马鞍形。（2）骨化中心与桡骨相邻的缘变平。'
                        },
                        {
                            level: '5',
                            image: 'TW3-C-CARPAL-lunate-5.jpg',
                            description: '（1）骨化中心远侧关节面形成与头状骨相关节的马鞍形,背侧部分超过了鞍的掌侧部分(致密的)的外侧缘,但是不足掌侧缘到舟骨距离的一半。（2）骨化中心舟骨和三角骨缘变平、稍致密。'
                        },
                        {
                            level: '6',
                            image: 'TW3-C-CARPAL-lunate-6.jpg',
                            description: '（1）骨化中心头状骨鞍的背侧面进一步增大,超过了鞍的掌侧缘到舟骨距离的一半。（2）骨化中心舟骨缘(仍为直线)和骨缘成角。'
                        },
                        {
                            level: '7',
                            image: 'TW3-C-CARPAL-lunate-7.jpg',
                            description: '（1）骨化中心头状骨鞍的背侧面向外侧延伸,与舟骨缘接触或重叠(根据个体形状和位置不同,掌侧面或背侧面或二者也与头状骨接触或重叠)。（2）骨化中心舟骨缘凹。'
                        }
                        // 添加更多等级数据...
                    ],
                    舟骨: [
                        {
                            level: '1',
                            image: 'TW3-C-CARPAL-scaphoid-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'TW3-C-CARPAL-scaphoid-2.jpg',
                            description: '骨化中心清晰可见,为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'TW3-C-CARPAL-scaphoid-3.jpg',
                            description: '骨化中心最大直径为尺骨骨干宽的一半或一半以上'
                        },
                        {
                            level: '4',
                            image: 'TW3-C-CARPAL-scaphoid-4.jpg',
                            description: '骨化中心掌侧面的致密白线外部,可见头状骨关节面的背侧面'
                        },
                        {
                            level: '5',
                            image: 'TW3-C-CARPAL-scaphoid-5.jpg',
                            description: '（1）骨化中心头状骨关节面的掌侧面和背侧面凹。（2）骨化中心大多角骨和小多角骨缘变平'
                        },
                        {
                            level: '6',
                            image: 'TW3-C-CARPAL-scaphoid-6.jpg',
                            description: '（1）骨化中心头状骨关节面的背侧面超过致密白线,朝向月骨和头状骨的近侧部分。（2）骨化中心月骨缘的头状骨端比桡骨骺端更接近中轴线,仅这条缘的头状骨端与月骨相接触。'
                        },
                        {
                            level: '7',
                            image: 'TW3-C-CARPAL-scaphoid-7.jpg',
                            description: '（1）骨化中心头状骨关节面与头状骨密切一致。（2）骨化中心月骨缘改变了方向,它的桡骨骺端和头状骨端同样接近手的中轴线:该缘远侧的大部分与月骨相接触。（3）骨化中心的远侧部分向外侧增长,桡骨茎突关节面出现,使外侧缘远侧部分凹或出现明显的远侧头。'
                        }
                        // 添加更多等级数据...
                    ],
                    大多角骨: [
                        {
                            level: '1',
                            image: 'TW3-C-CARPAL-trapezium-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰'
                        },
                        {
                            level: '2',
                            image: 'TW3-C-CARPAL-trapezium-2.jpg',
                            description: '骨化中心清晰可见,为圆形,有平滑连续的缘'
                        },
                        {
                            level: '3',
                            image: 'TW3-C-CARPAL-trapezium-3.jpg',
                            description: '（1）骨化中心最大直径为第一掌骨骨干宽的一半或一半以上。（2）骨化中心第一掌骨缘和(或)舟骨缘变平:两缘之间的距离小于与其成直角的直径'
                        },
                        {
                            level: '4',
                            image: 'TW3-C-CARPAL-trapezium-4.jpg',
                            description: '第二掌骨与大多角骨之间的距离小于大多角骨最大直径的1/3。'
                        },
                        {
                            level: '5',
                            image: 'TW3-C-CARPAL-trapezium-5.jpg',
                            description: '骨化中心第一掌骨缘明显凹,在中心部分稍致密'
                        },
                        {
                            level: '6',
                            image: 'TW3-C-CARPAL-trapezium-6.jpg',
                            description: '（1）骨化中心远侧缘与第二掌骨底的外侧尖顶稍重叠。（2）骨化中心舟骨缘变平、致密。该缘的掌侧面和背侧面由与小多角骨重叠之外的部分所组成。'
                        },
                        {
                            level: '7',
                            image: 'TW3-C-CARPAL-trapezium-7.jpg',
                            description: '（1）骨化中心桡侧端的远侧部分出现直线缘,在与第一掌骨关节面的相接处形成尖角。（2）骨化中心第一掌骨关节面可区分为掌侧面和背侧面,与第一掌骨骺的马鞍形相致'
                        },
                        {
                            level: '8',
                            image: 'TW3-C-CARPAL-trapezium-8.jpg',
                            description: '骨化中心桡侧缘向外凸出面将该缘分为两部分,远侧部分朝向外侧,近侧部分朝向桡骨茎突:近侧部分稍凹,或变平'
                        }
                        // 添加更多等级数据...
                    ],
                    小多角骨: [
                        {
                            level: '1',
                            image: 'TW3-C-CARPAL-trapezoid-1.jpg',
                            description: '骨化中心仅可见一个钙化点,极少为多个,边缘不清晰。'
                        },
                        {
                            level: '2',
                            image: 'TW3-C-CARPAL-trapezoid-2.jpg',
                            description: '骨化中心清晰可见,为圆形,有平滑连续的缘。'
                        },
                        {
                            level: '3',
                            image: 'TW3-C-CARPAL-trapezoid-3.jpg',
                            description: '骨化中心最大直径为第一掌骨骨干宽的一半或一半以上。'
                        },
                        {
                            level: '4',
                            image: 'TW3-C-CARPAL-trapezoid-4.jpg',
                            description: '骨化中心头状骨缘和(或)第二掌骨底内侧缘变平。'
                        },
                        {
                            level: '5',
                            image: 'TW3-C-CARPAL-trapezoid-5.jpg',
                            description: '（1）沿骨化中心头状骨缘和(或)第二掌骨底内侧缘出现致密白线;其中一个缘可区分为掌侧面和背侧面。（2）骨化中心远侧缘形成了与第二掌骨底凹陷部相关节的圆顶;但尚不能区分出掌侧面和背侧面。'
                        },
                        {
                            level: '6',
                            image: 'TW3-C-CARPAL-trapezoid-6.jpg',
                            description: '在骨化中心第二掌骨关节面掌侧面的致密线远侧,可见背侧面:头状骨关节面的背侧面亦可见(这些背侧面分别与第二掌骨缘和头状骨缘接近,或相互重叠)。'
                        },
                        {
                            level: '7',
                            image: 'TW3-C-CARPAL-trapezoid-7.jpg',
                            description: '骨化中心近侧缘的背侧面凹,致密的掌侧面仍然为直线。'
                        }
                        // 添加更多等级数据...
                    ]
                }
                // 添加其他模式数据...
            }
        };
    },
    computed: {
        // 当前模式的骨骼列表
        bones() {
            return Object.keys(this.boneData[this.activeMode] || []);
        }
    },
    created() {},
    mounted() {},
    updated() {},
    methods: {
        showModal() {
            const dialog = document.getElementById('bone_age_guide');
            dialog.showModal();
        },
        closeModal() {
            const dialog = document.getElementById('bone_age_guide');
            this.activeMode = 'RUS-CHN';
            this.activeBone = null;
            this.grades = [];
            dialog.close();
        },
        switchMode(mode) {
            this.activeMode = mode;
            this.activeBone = null;
        },
        selectBone(bone) {
            this.activeBone = bone;
            this.grades = this.boneData[this.activeMode][bone] || [];
        },
        getImagePath(imgName) {
            return `/bone-age-grades/${imgName}`;
        }
    }
};
</script>

<style scoped></style>

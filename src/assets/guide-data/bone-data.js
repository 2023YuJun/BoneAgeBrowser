// # 骨头等级数据
export default {
  'RUS-CHN': {
    '桡骨': [
      {
        level: 'A',
        // 使用 import + 动态路径
        image: new URL('../../../images/bone-grades/rus-chn/radius/grade-a.jpg', import.meta.url).href,
        description: '桡骨远端骨骺未出现...'
      },
      // 其他等级...
    ]
  },
  'TW3-C-CARPAL': {
    '头状骨': [
      {
        level: '1',
        image: new URL('../../../images/bone-grades/tw3-c-carpal/capitate/grade-1.jpg', import.meta.url).href,
        description: '头状骨初始骨化阶段...'
      }
    ]
  }
}
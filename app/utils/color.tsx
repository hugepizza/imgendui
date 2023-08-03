// 辅助函数：用于计算变暗后的颜色
// 辅助函数：用于计算变暗后的颜色
const darkenColor = (color:string, amount:number) => {
    // 这里假设颜色值是 RGB 格式，例如 #RRGGBB
    const colorValue = color.replace("#", "");
    const r = parseInt(colorValue.slice(0, 2), 16);
    const g = parseInt(colorValue.slice(2, 4), 16);
    const b = parseInt(colorValue.slice(4, 6), 16);
  
    const darkenR = Math.max(r - amount, 0);
    const darkenG = Math.max(g - amount, 0);
    const darkenB = Math.max(b - amount, 0);
  
    return `#${darkenR.toString(16).padStart(2, '0')}${darkenG.toString(16).padStart(2, '0')}${darkenB.toString(16).padStart(2, '0')}`;
  };
  

// 将自定义方法挂载到 window 对象
window.myCustomMethod = () => {
  console.log('Custom method called from the frontend!');
  alert('Custom method called from the frontend!');
  // 这里可以执行任何 Node.js 代码
};

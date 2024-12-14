function getDayOfWeek(year, month, day) {
  // 创建 Date 对象时，月份是从 0（1月）开始计算的，所以需要减 1
  const date = new Date(year, month - 1, day);
  const daysOfWeek = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return daysOfWeek[date.getDay()];
}

export {
  getDayOfWeek
};
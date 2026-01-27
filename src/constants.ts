/**
 * 天干速查表
 */
export const HEAVENLY_STEMS = [
  "甲",
  "乙",
  "丙",
  "丁",
  "戊",
  "己",
  "庚",
  "辛",
  "壬",
  "癸",
] as const;

/**
 * 地支速查表
 */
export const EARTHLY_BRANCHES = [
  "子",
  "丑",
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
] as const;

/** 十二生肖（按地支顺序） */
export const ZODIAC = [
  "鼠",
  "牛",
  "虎",
  "兔",
  "龙",
  "蛇",
  "马",
  "羊",
  "猴",
  "鸡",
  "狗",
  "猪",
] as const;

/**
 * 每月地支（按月序）
 */
export const MONTHLY_EARTHLY_BRANCHES = [
  "寅",
  "卯",
  "辰",
  "巳",
  "午",
  "未",
  "申",
  "酉",
  "戌",
  "亥",
  "子",
  "丑",
] as const;

/** 五虎遁速查表，按天干从甲开始 */
export const FIVE_TIGER = [
  "丙",
  "戊",
  "庚",
  "壬",
  "甲",
  "丙",
  "戊",
  "庚",
  "壬",
  "甲",
];

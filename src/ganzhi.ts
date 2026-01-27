import {
  FIVE_TIGER,
  HEAVENLY_STEMS,
  MONTHLY_EARTHLY_BRANCHES,
} from "./constants";
import { lunar2solar, normalizeDateStr } from "./convertor";
import {
  EarthlyBranch,
  HeavenlyStem,
  HeavenlyStemAndEarthlyBranch,
  HeavenlyStemAndEarthlyBranchDate,
  Options,
} from "./types";
import { Lunar, Solar } from "lunar-typescript";
import { fixIndex } from "./utils";

/**
 * 通过农历获取生辰干支
 *
 * @param dateStr 农历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @param isLeap 是否为闰月
 * @returns HeavenlyStemAndEarthlyBranchResult
 */
export const getHeavenlyStemAndEarthlyBranchByLunarDate = (
  dateStr: string,
  timeIndex: number,
  isLeap?: boolean,
  options: Options = { year: "normal", month: "exact" },
): HeavenlyStemAndEarthlyBranchDate => {
  const solarDate = lunar2solar(dateStr, isLeap);

  return getHeavenlyStemAndEarthlyBranchBySolarDate(
    solarDate.toString(),
    timeIndex,
    options,
  );
};

/**
 * 将阳历转化为干支纪年
 *
 * @param dateStr 公历日期 YYYY-MM-DD
 * @param timeIndex 时辰索引【0～12】
 * @returns HeavenlyStemAndEarthlyBranchResult
 */
export const getHeavenlyStemAndEarthlyBranchBySolarDate = (
  dateStr: string | Date,
  timeIndex: number,
  options: Options = { year: "exact" },
): HeavenlyStemAndEarthlyBranchDate => {
  const [year, month, date] = normalizeDateStr(dateStr);
  const solar = Solar.fromYmdHms(
    year,
    month,
    date,
    Math.max(timeIndex * 2 - 1, 0),
    30,
    0,
  );
  const lunar = solar.getLunar();
  const yearlyGan =
    options?.year === "normal"
      ? lunar.getYearGan()
      : lunar.getYearGanByLiChun();
  const yearlyZhi =
    options?.year === "normal"
      ? lunar.getYearZhi()
      : lunar.getYearZhiByLiChun();

  const yearly: HeavenlyStemAndEarthlyBranch = [
    yearlyGan as HeavenlyStem,
    yearlyZhi as EarthlyBranch,
  ];
  // 如果是初一换干支的话需要自己起五虎遁
  const monthly: HeavenlyStemAndEarthlyBranch = calculateMonthlyGanZhi(yearlyGan as HeavenlyStem, lunar, options?.month);
  const daily: HeavenlyStemAndEarthlyBranch = [
    lunar.getDayGanExact() as HeavenlyStem,
    lunar.getDayZhiExact() as EarthlyBranch,
  ];
  const hourly: HeavenlyStemAndEarthlyBranch = [
    lunar.getTimeGan() as HeavenlyStem,
    lunar.getTimeZhi() as EarthlyBranch,
  ];

  return {
    yearly,
    monthly,
    daily,
    hourly,
    toString() {
      return `${yearly.join("")} ${monthly.join("")} ${daily.join(
        "",
      )} ${hourly.join("")}`;
    },
  };
};

function calculateMonthlyGanZhi(
  yearlyGan: HeavenlyStem,
  lunar: Lunar,
  monthlyDivide: "normal" | "exact" = "exact",
) {
  if (monthlyDivide === "exact") {
    // 按节气
    return [
      lunar.getMonthGanExact() as HeavenlyStem,
      lunar.getMonthZhiExact() as EarthlyBranch,
    ] as HeavenlyStemAndEarthlyBranch;
  }

  // 按初一
  const fixLeap = lunar.getMonth() < 0 && lunar.getDay() > 15 ? 1 : 0;

  const gan =
    HEAVENLY_STEMS[
      fixIndex(
        HEAVENLY_STEMS.indexOf(
          FIVE_TIGER[HEAVENLY_STEMS.indexOf(yearlyGan)] as HeavenlyStem,
        ) +
          Math.abs(lunar.getMonth()) -
          1 +
          fixLeap,
        10,
      )
    ];

  const zhi =
    MONTHLY_EARTHLY_BRANCHES[Math.abs(lunar.getMonth()) - 1 + fixLeap];

  return [gan, zhi] as HeavenlyStemAndEarthlyBranch;
}

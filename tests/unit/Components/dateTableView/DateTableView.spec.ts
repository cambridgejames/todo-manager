import { DateViewData } from "@/components/ui/dateTableView/src/type";
import { initTableContent, wheelDown, wheelUp } from "@/components/ui/dateTableView/src/TableContentManager";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

import dataTestInitTableContent from "./data_testInitTableContent.json";
import dateTestViewUp from "./data_testWheelUp.json";
import dateTestViewDown from "./data_testWheelDown.json";

describe("TableContentManager.ts", (): void => {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // 2023年3月12日 凌晨0时48分51秒 GMT+0800
  const date = utcToZonedTime(zonedTimeToUtc(new Date(1678553331143), timezone), "Asia/Shanghai");

  /**
   * 测试初始化日历面板内容
   */
  it("testInitTableContent", (): void => {
    const accept: DateViewData = initTableContent(date);
    const expected: DateViewData = dataTestInitTableContent as DateViewData;
    expect(accept).toStrictEqual(expected);
  });

  /**
   * 测试向下滚动及切换当前月
   */
  it("testWheelDown", (): void => {
    const accept: DateViewData = initTableContent(date);
    wheelUp(accept, date);
    wheelUp(accept, date);
    wheelUp(accept, date);
    const expected: DateViewData = dateTestViewUp as DateViewData;
    expect(accept).toStrictEqual(expected);
  });

  /**
   * 测试向上滚动及切换当前月
   */
  it("testWheelDown", (): void => {
    const accept: DateViewData = initTableContent(date);
    wheelDown(accept, date);
    wheelDown(accept, date);
    wheelDown(accept, date);
    const expected: DateViewData = dateTestViewDown as DateViewData;
    expect(accept).toStrictEqual(expected);
  });
});

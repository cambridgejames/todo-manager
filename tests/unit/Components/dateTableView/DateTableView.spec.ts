import { DateViewData } from "@/components/ui/dateTableView/src/type";
import { initTableContent } from "@/components/ui/dateTableView/src/TableContentManager";

import dataTestInitTableContent from "./data_testInitTableContent.json";
import { utcToZonedTime, zonedTimeToUtc } from "date-fns-tz";

describe("TableContentManager.ts", (): void => {
  /**
   * 测试初始化日历面板内容
   */
  it("testInitTableContent", (): void => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const date = utcToZonedTime(zonedTimeToUtc(new Date(1678553331143), timezone), "Asia/Shanghai");
    const accept: DateViewData = initTableContent(date); // 2023年3月12日 凌晨0时48分51秒 GMT+0800
    const expected: DateViewData = dataTestInitTableContent as DateViewData;
    expect(accept).toStrictEqual(expected);
  });
});

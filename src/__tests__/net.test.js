const { check, checkResult } = require("../net");

describe("checkResult", () => {
  test("should check result", async () => {
    const result = await checkResult(["https://www.baidu.com/"]);
    expect(result).toEqual([{ url: "https://www.baidu.com/", success: true }]);
  });
});

describe("check", () => {
  test("should check result", async () => {
    const result = await check("https://www.baidu.com/");
    expect(result).toEqual({ url: "https://www.baidu.com/", success: true });
  });
});

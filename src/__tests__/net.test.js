const { check, checkResult } = require("../net");

describe("checkResult", () => {
  test("should check result", async () => {
    const result = await checkResult(["https://www.baidu.com/"]);
    expect(result).toEqual([
      { url: "https://www.baidu.com/", success: true, message: "ok" }
    ]);
  });

  test("should call callback", async () => {
    const a = {
      cb: () => {}
    };
    const spy = jest.spyOn(a, "cb");
    await checkResult(["https://www.baidu.com/"], a.cb);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

describe("check", () => {
  test("should check result", async () => {
    const result = await check("https://www.baidu.com/");
    expect(result).toEqual({
      url: "https://www.baidu.com/",
      success: true,
      message: "ok"
    });
  });

  test("should call callback", async () => {
    const a = {
      cb: () => {}
    };
    const spy = jest.spyOn(a, "cb");
    await check("https://www.baidu.com/", a.cb);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});

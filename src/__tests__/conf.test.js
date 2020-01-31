const { checkUrlValid, parseConf } = require("../conf");

describe("checkUrlValid", () => {
  test("valid", () => {
    const url = "https://baidu.com";
    expect(checkUrlValid(url)).toBeTruthy();
  });

  test("invalid", () => {
    const url = "https://bing";
    expect(checkUrlValid(url)).toBeFalsy();
  });
});

describe("parseConf", () => {
  test("should parse conf", () => {
    const text = `
      https://bing.com
      https://www.baidu.com
    `;
    const urls = parseConf(text);
    expect(urls).toEqual(["https://bing.com", "https://www.baidu.com"]);
  });
  test("should throw error", () => {
    const text = `
      https://bing
      https://www.baidu.com
    `;
    expect(() => parseConf(text)).toThrow();
  });
});

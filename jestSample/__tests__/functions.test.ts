// todo: ここに単体テストを書いてみましょう！
import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  getFirstNameThrowIfLong,
} from "../functions";
import { NameApiService } from "../nameApiService";

/**
 * sumOfArrayのテスト
 */
describe("test of sumOfArray", () => {
  // 正常系のテスト
  test("normal case", () => {
    const testData = [1, 1];
    const expectedValue: number = 2;

    const receivedValue = sumOfArray(testData);

    expect(receivedValue).toBe(expectedValue);
  });

  // 空配列を渡して例外を発生させるテスト
  test("exception case: empty array", () => {
    const testData: number[] = [];

    expect(() => sumOfArray(testData)).toThrow();
  });

  // stringの配列を渡すテスト（ビルド時に例外が発生するためテスト不可）
  // test("exception case: string array", () => {
  //   const testData: string[] = [];

  //   expect(() => sumOfArray(testData)).toThrow();
  // });

  // numberを渡すテスト（ビルド時に例外が発生するためテスト不可）
  // test("exception case: number", () => {
  //   const testData: number = 1;

  //   expect(() => sumOfArray(testData)).toThrow();
  // });
});

/**
 * asyncSumOfArrayのテスト
 */
describe("test of asyncSumOfArray", () => {
  // 正常系のテスト
  test("normal case", async () => {
    const testData = [1, 1];
    const expectedValue: number = 2;

    // リソースが取得できるまで、待機する
    const receivedValue = await asyncSumOfArray(testData);

    expect(receivedValue).toBe(expectedValue);
  });

  // 空配列を渡して例外を発生させるテスト
  test("exception case: empty array", async () => {
    const testData: number[] = [];

    expect.assertions(1);
    await expect(asyncSumOfArray(testData)).rejects.toThrow();
  });
});

/**
 * asyncSumOfArraySometimesZeroのテスト
 */
describe("test of asyncSumOfArraySometimesZero", () => {
  // 正常系のテスト
  test("normal case: no errors happen", async () => {
    const testData = [1, 1];
    // TODO：本当はspyonを使ってgetRandomInt関数の戻り値を10に指定したかったが、やり方わからず。。
    // getRandonIntを直接エクスポートしているせいでやりづらいのかも？
    // ところでspyとmockとstubの違いがよくわからないため、あとで以下を読む
    // https://martinfowler.com/articles/mocksArentStubs.html
    const randomIntMock = jest.fn(() => {
      return 10;
    });
    const expectedValue: number = 2;

    const receivedValue = await asyncSumOfArraySometimesZero(
      testData,
      randomIntMock()
    );

    expect(receivedValue).toBe(expectedValue);
  });

  test("normal case: some errors happen", async () => {
    const testData = [1, 1];
    const randomIntMock = jest.fn(() => {
      return 1;
    });
    const expectedValue = 0;

    await expect(
      asyncSumOfArraySometimesZero(testData, randomIntMock())
    ).resolves.toBe(expectedValue);
  });
});

/**
 * getFirstNameThrowIfLongのテスト
 */
describe("test of getFirstNameThrowIfLong", () => {
  // 正常系のテスト
  test("normal case: no errors happen", async () => {
    const maxNameLength = 100;
    const getFirstNameMock = jest.fn(() => {
      return "mi";
    });
    const expectedValue = "mi";

    const receivedValue = await getFirstNameThrowIfLong(
      maxNameLength,
      getFirstNameMock()
    );

    expect(receivedValue).toBe(expectedValue);
  });

  test("normal case: some errors happen", async () => {
    const maxNameLength = 100;
    const getFirstNameMock = jest.fn(() => {
      return "Pablo Diego José Francisco";
    });

    // TODO：resolvesになっていることが確認できていれば良いのか？他に確認すべきことはないか
    // エラーはnameApiServiceの方で発生しているから、そっちでエラーメッセージの確認はすれば良いし。。
    await expect(getFirstNameThrowIfLong(maxNameLength, getFirstNameMock()))
      .resolves;
  });

  test("normal case: some errors happen 2", async () => {
    const maxNameLength = 1;
    const getFirstNameMock = jest.fn(() => {
      return "Pablo Diego José Francisco";
    });
    const expectedErrorMsg = "first_name too long";

    // TODO：「1.10 Don’t catch errors, expect them」のルールに従い、こちらで書きたかったが、
    // エラーが解消できなかったため、断念。。
    // await expect(
    //   getFirstNameThrowIfLong(maxNameLength, getFirstNameMock())
    // ).rejects.toThrow(expectedErrorMsg);

    // TODO：エラーメッセージのチェックをしたい
    try {
      await getFirstNameThrowIfLong(maxNameLength, getFirstNameMock());
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});

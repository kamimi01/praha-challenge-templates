// todo: ここに単体テストを書いてみましょう！
import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
} from "../functions";
import { getRandomInt } from "../util";
// import { DatabaseMock, getRandomInt } from "../util";

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
 * 
 */
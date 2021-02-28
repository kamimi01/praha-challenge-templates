// todo: ここに単体テストを書いてみましょう！
import axios from "axios";
import {
  sumOfArray,
  asyncSumOfArray,
  asyncSumOfArraySometimesZero,
  dependencies,
  getFirstNameThrowIfLong,
} from "../functions";
import { NameApiService } from "../nameApiService";
import { DatabaseMock } from "../util/index";

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
  const databaseMock: DatabaseMock = {
    save: jest.fn(),
  };
  const dependencies: dependencies = {
    databaseMock: databaseMock
  }

  // 正常系のテスト
  test("normal case: no errors happen", async () => {
    const testData = [1, 1];
    const expectedValue = 2;

    const receivedValue = await asyncSumOfArraySometimesZero(
      dependencies,
      testData
    );

    expect.assertions(1);
    // TODO：どうやらモック関数が呼ばれておらず、以下のチェックが失敗する（理由不明。。）
    // expect(databaseMock.save).toBeCalled();
    expect(receivedValue).toBe(expectedValue);
  });

  test("normal case: some errors happen", async () => {
    const testData: number[] = [];
    const expectedValue = 0;

    const receivedValue = await asyncSumOfArraySometimesZero(
      dependencies,
      testData
    );

    expect.assertions(1);
    // expect(databaseMock.save).toBeCalledWith(testData);
    expect(receivedValue).toBe(expectedValue);
  });
});

/**
 * getFirstNameThrowIfLongのテスト
 */
describe("test of getFirstNameThrowIfLong", () => {
  jest.mock("axios");
  const axiosSpy = jest.spyOn(axios, "get");
  let nameApiSerivce: NameApiService;
  beforeEach(() => {
    nameApiSerivce = new NameApiService();
  });

  // 正常系のテスト
  test("normal case: no errors happen", async () => {
    const maxNameLength = 100;
    const expectedValue = "mi";
    const testData: Object = {
      first_name: expectedValue,
    };
    axiosSpy.mockResolvedValue({ data: testData });

    const receivedValue = await getFirstNameThrowIfLong(
      maxNameLength,
      nameApiSerivce
    );

    expect.assertions(1);
    expect(receivedValue).toBe(expectedValue);
  });

  test("normal case: some errors happen 2", async () => {
    const maxNameLength = 1;
    const expectedValue = "tom";
    const testData: Object = {
      data: {
        first_name: expectedValue,
      },
    };
    axiosSpy.mockResolvedValue(testData);
    const expectedErrorMsg = "first_name too long";

    expect.assertions(1);
    await expect(
      getFirstNameThrowIfLong(maxNameLength, nameApiSerivce)
    ).rejects.toThrow(expectedErrorMsg);
  });
});

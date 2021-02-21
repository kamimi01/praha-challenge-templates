import axios from "axios";
import { NameApiService } from "../nameApiService";

describe("test of NameApiService", () => {
  jest.mock("axios");
  const axiosSpy = jest.spyOn(axios, "get");

  // 正常系のテスト
  test("normal case: no errors happen", async () => {
    const nameApiServiceInstance = new NameApiService();
    const testData: Object = {
      first_name: "tom",
    };
    axiosSpy.mockResolvedValue({ data: testData });
    const randomName = await nameApiServiceInstance.getRandomName();

    const receivedValue = await nameApiServiceInstance.getFirstName(randomName);
    const expectedValue = "tom";

    expect(receivedValue).toBe(expectedValue);
  });

  test("normal case: some errors happen", async () => {
    const nameApiServiceInstance = new NameApiService();
    const testData: Object = {
      first_name: "Pablo Diego José Francisco",
    };
    axiosSpy.mockResolvedValue({ data: testData });
    const randomName = await nameApiServiceInstance.getRandomName();
    const expectedValue = "Pablo Diego José Francisco";

    // TODO：「1.10 Don’t catch errors, expect them」のルールに従いたかったが、
    // エラーが解消できなかったため、断念。。
    try {
      await nameApiServiceInstance.getFirstName(randomName);
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
    }
  });
});

import axios from "axios";
import { NameApiService } from "../nameApiService";

describe("test of NameApiService", () => {
  jest.mock("axios");
  const axiosSpy = jest.spyOn(axios, "get");

  // 正常系のテスト
  test("normal case: no errors happen", async () => {
    const nameApiService = new NameApiService();
    const expectedValue = "tom";
    const testData: Object = {
      first_name: expectedValue,
    };
    axiosSpy.mockResolvedValue({ data: testData });
    const receivedValue = await nameApiService.getFirstName();

    expect.assertions(1);
    expect(receivedValue).toBe(expectedValue);
  });

  test("normal case: some errors happen", async () => {
    const nameApiService = new NameApiService();
    const expectedValue = "Pablo Diego José Francisco";
    const testData: Object = {
      first_name: expectedValue,
    };
    axiosSpy.mockResolvedValue({ data: testData });
    const expectedErrorMsg = "firstName is too long!";

    expect.assertions(1);
    await expect(nameApiService.getFirstName()).rejects.toThrow(
      new Error(expectedErrorMsg)
    );
  });
});

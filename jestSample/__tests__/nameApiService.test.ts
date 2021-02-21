import axios from "axios";
import { NameApiService } from "../nameApiService";

describe("test of NameApiService", () => {
  jest.mock("axios");
  const axiosSpy = jest.spyOn(axios, "get");

  // 正常系のテスト（ビルドエラーがまだ解消できてません、、）
  // test("normal case: no errors happen", async () => {
  //   const nameApiServiceInstance = new NameApiService();
  //   const randomName = jest.fn(() => {
  //     const data: Object = {
  //       firstName: "tom",
  //     };
  //     return data;
  //   });
  //   const receivedValue = await nameApiServiceInstance.getFirstName(
  //     // nameApiServiceInstance.getRandomName()
  //     randomName()
  //   );
  //   const expectedValue = "kamimi";

  //   expect(receivedValue).toBe(expectedValue);
  // });

  // test("normal case: some errors happen", async () => {
  //   const nameApiServiceInstance = new NameApiService();
  //   const receivedValue = await nameApiServiceInstance.getFirstName(
  //     nameApiServiceInstance.getRandomName()
  //   );
  //   const expectedValue = "kamimi";

  //   expect(receivedValue).toBe(expectedValue);
  // });
});

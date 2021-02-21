import axios from "axios";

export class NameApiService {
  private MAX_LENGTH = 4;
  public constructor() {}

  public async getRandomName(): Promise<any> {
    const { data } = await axios.get(
      "https://random-data-api.com/api/name/random_name"
    );
    return { data };
  }

  public async getFirstName(randomName: Promise<any>): Promise<string> {
    // 依存性オブジェクトを外出しするため、以下のコードを削除
    // const { data } = await axios.get(
    //   "https://random-data-api.com/api/name/random_name"
    // );
    const { data } = await randomName;
    const firstName = data.first_name as string;

    if (firstName.length > this.MAX_LENGTH) {
      throw new Error("firstName is too long!");
    }

    return firstName;
  }
}

import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";

// number型の配列の要素を全て足した結果を返す
export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

export const asyncSumOfArraySometimesZero = (
  numbers: number[],
  databaseMock: DatabaseMock
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      databaseMock = new DatabaseMock();
      databaseMock.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      resolve(0);
    }
  });
};

export const getFirstNameThrowIfLong = (
  maxNameLength: number,
  randomName: string
): string => {
  const nameApiSerivce = new NameApiService(); // fixme: この関数をテストするには、NameApiServiceの使い方を変える必要がありそう！ヒント：依存性の注入
  // 依存性オブジェクトとして引数から取得するので以下を削除
  // const firstName = await nameApiSerivce.getFirstName();

  if (randomName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return randomName;
};

import { NameApiService } from "./nameApiService";
import { DatabaseMock } from "./util";

// number型の配列の要素を全て足した結果を返す
export const sumOfArray = (numbers: number[]): number => {
  return numbers.reduce((a: number, b: number): number => a + b, 0);
};

export const asyncSumOfArray = (numbers: number[]): Promise<number> => {
  return new Promise((resolve): void => {
    resolve(sumOfArray(numbers));
  });
};

// 依存するオブジェクトが増加した場合、ここに追加していく
export type dependencies = {
  databaseMock: DatabaseMock;
};

export const asyncSumOfArraySometimesZero = (
  dependencies: dependencies,
  numbers: number[]
): Promise<number> => {
  return new Promise((resolve): void => {
    dependencies.databaseMock.save(numbers);
    resolve(sumOfArray(numbers));
    // try {
    //   dependencies.databaseMock = new DatabaseMock();
    //   dependencies.databaseMock.save(numbers);
    //   resolve(sumOfArray(numbers));
    // } catch (error) {
    //   resolve(0);
    // }
  });
};

export const getFirstNameThrowIfLong = async (
  maxNameLength: number,
  nameApiSerivce: NameApiService
): Promise<string> => {
  nameApiSerivce = new NameApiService();
  const firstName = await nameApiSerivce.getFirstName();

  if (firstName.length > maxNameLength) {
    throw new Error("first_name too long");
  }
  return firstName;
};

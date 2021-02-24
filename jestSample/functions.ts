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
  databaseMock: DatabaseMock,
  numbers: number[]
): Promise<number> => {
  return new Promise((resolve): void => {
    try {
      databaseMock = new DatabaseMock();
      databaseMock.save(numbers);
      resolve(sumOfArray(numbers));
    } catch (error) {
      console.log(error)
      resolve(0);
    }
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

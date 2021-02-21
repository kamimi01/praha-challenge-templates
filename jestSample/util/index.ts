// 依存性オブジェクトをエクスポートして単体テストで扱えるようにする
export const getRandomInt = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export class DatabaseMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // 依存性オブジェクトであるgetRandomIntを注入する
  public save(_: number[], randomInt: number): void {
    // memo: 課題のために、あえて時々saveが失敗するようにしている
    // 修正前コード
    // if (getRandomInt(10) < 2) {
    //   throw new Error("fail!");
    // }

    // 修正後コード
    if (randomInt < 2) {
      throw new Error("fail!");
    }
  }
}

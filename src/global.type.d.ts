/* eslint-disable @typescript-eslint/no-unused-vars */

declare global {
  interface Array<T> {
    move(from: number, to: number): void;
  }
}
Array.prototype.move = function (from: number, to: number) {
  this.splice(to, 0, this.splice(from, 1)[0]);
};
export {};
// export 를 해줘야 global scope 로 들어감

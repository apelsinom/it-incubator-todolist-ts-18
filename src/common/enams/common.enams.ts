/*export const ResultCode = {
  Success: 0,
  Error: 1,
  Captcha: 10,
} as const;*/
export enum ResultCode {
  Success,
  Error,
  Captcha = 10,
}

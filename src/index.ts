export interface TokenData {
  [symbol: string]: Token;
}

export interface Token {
  address: string;
  decimals: number;
  logoURL: string;
  color: string;
}

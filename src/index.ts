export interface AllTokens {
  [symbol: string]: Token;
}

export interface Token {
  name: string;
  address: string;
  decimals: number;
  symbol: string;
  logoURL: string;
  color: string;
  overlayTextColor: "#fff" | "#000";
}


export interface MezoParams {
  userTokens: number | string;
  expectedMarketCap: number | string;
}

export interface EstimationResults {
  estimatedValueUsd: number;
  tokenPriceAtMcap: number;
}

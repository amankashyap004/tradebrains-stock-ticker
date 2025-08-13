// Types for Search API response
export interface StockSearchResult {
  type: string;
  symbol: string | null;
  company: string;
}

// Types for Prices API response
export interface StockPrice {
  open: number;
  high: number;
  close: number;
  low: number;
  date: string; // e.g., "2025-08-13 12:51:00+05:30"
  volume: number;
  value: number;
  change: number;
  percent: number;
  prev_close: number;
}

// Types for Movers/Ticker API response
export interface MoverCompany {
  id: number;
  company_id: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  change: number;
  percent: number;
  date: string; // e.g., "2025-08-13T12:29:59Z"
  symbol: string;
  comp_name: string;
  scripcode: number;
  prev_close: number;
  mcap: number;
  pe: number;
  roe_ttm: number;
  roce_ttm: number;
}

export interface MarketMovers {
  name: string;
  index_name: string;
  total_count: number;
  losers_count: number;
  gainers_count: number;
  gainers: MoverCompany[];
  losers: MoverCompany[];
  exchange: string;
  volume_movers: MoverCompany[];
}

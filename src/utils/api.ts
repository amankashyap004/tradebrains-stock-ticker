import axios from "axios";
import { StockSearchResult, StockPrice, MarketMovers } from "../types";

const BASE_URL = "https://portal.tradebrains.in";

export const searchStocks = async (
  keyword: string,
  length: number = 4
): Promise<StockSearchResult[]> => {
  try {
    const response = await axios.get<StockSearchResult[]>(
      `${BASE_URL}/api/assignment/search`,
      {
        params: { keyword, length },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Search API error:", error);
    return [];
  }
};

export const getStockPrices = async (
  symbol: string,
  days: number = 1,
  type: string = "INTRADAY",
  limit: number = 50
): Promise<StockPrice[]> => {
  try {
    const response = await axios.get<StockPrice[]>(
      `${BASE_URL}/api/assignment/stock/${symbol}/prices`,
      {
        params: { days, type, limit },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Prices API error:", error);
    return [];
  }
};

export const getTickerData = async (): Promise<MarketMovers> => {
  try {
    const response = await axios.get<MarketMovers>(
      `${BASE_URL}/api/assignment/index/NIFTY/movers/`
    );
    return response.data;
  } catch (error) {
    console.error("Ticker API error:", error);
    return {
      name: "",
      index_name: "",
      total_count: 0,
      losers_count: 0,
      gainers_count: 0,
      gainers: [],
      losers: [],
      exchange: "",
      volume_movers: [],
    };
  }
};

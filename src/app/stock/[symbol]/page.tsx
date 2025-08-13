"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";
import Button from "@/components/ui/Button";
import StockGraph from "@/components/StockGraph";
import Loading from "@/components/common/Loading";
import ApiError from "@/components/errors/ApiError";
import Container from "@/components/common/Container";
import StockError from "@/components/errors/StockError";
import { useFavorites } from "@/context/FavoritesContext";
import { getStockPrices, searchStocks } from "@/utils/api";
import { StockPrice } from "@/types";

export default function StockDetails() {
  const router = useRouter();
  const params = useParams();
  const symbol = params?.symbol as string | undefined;

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const [stockData, setStockData] = useState<StockPrice | null>(null);
  const [returns, setReturns] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [companyName, setCompanyName] = useState<string>(
    symbol?.toUpperCase() || "Stock"
  );

  useEffect(() => {
    if (!symbol) {
      setError("No stock symbol provided.");
      setLoading(false);
      return;
    }

    const fetchStockData = async () => {
      try {
        setLoading(true);
        // Fetch price data for 1D (default)
        const prices = await getStockPrices(symbol, 1, "INTRADAY", 50);
        if (prices.length > 0) {
          setStockData(prices[0]);
        } else {
          setError("No price data available for this stock.");
        }

        // Fetch company name from Search API
        const searchResults = await searchStocks(symbol, 1);
        if (searchResults.length > 0 && searchResults[0].company) {
          setCompanyName(searchResults[0].company);
        }

        // Fetch returns for multiple timeframes
        const periods = [
          { label: "1D", days: 1, type: "INTRADAY", limit: 2 },
          { label: "1W", days: 7, type: "DAILY", limit: 2 },
          { label: "1M", days: 30, type: "DAILY", limit: 2 },
          { label: "3M", days: 90, type: "DAILY", limit: 2 },
          { label: "6M", days: 180, type: "DAILY", limit: 2 },
          { label: "1Y", days: 365, type: "DAILY", limit: 2 },
          { label: "5Y", days: 1825, type: "DAILY", limit: 2 },
        ];

        const returnsData: Record<string, number> = {};
        for (const p of periods) {
          const data = await getStockPrices(symbol, p.days, p.type, p.limit);
          if (data.length >= 2) {
            const oldPrice = data[data.length - 1].close;
            const newPrice = data[0].close;
            const changePercent = ((newPrice - oldPrice) / oldPrice) * 100;
            returnsData[p.label] = changePercent;
          } else {
            returnsData[p.label] = 0;
          }
        }
        setReturns(returnsData);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to load stock data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStockData();
  }, [symbol]);

  if (!symbol) {
    return (
      <Container>
        <StockError />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ApiError error={{ message: error }} />
      </Container>
    );
  }

  if (loading) {
    return (
      <Container className="">
        <Loading className="w-40 md:w-60" />
      </Container>
    );
  }

  return (
    <div className="w-full">
      <Head>
        <title>
          {companyName} ({symbol}) - Stock Details
        </title>
        <meta
          name="keywords"
          content={`stock, ${symbol}, ${companyName}, price, chart`}
        />
        <meta
          name="description"
          content={`Details and price chart for ${companyName} (${symbol})`}
        />
      </Head>

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 w-full">
          <section className="lg:col-span-2 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-semibold">
                {companyName}
              </h1>
              <p className="text-shadow-sm text-gray-300">{symbol}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                onClick={() =>
                  isFavorite(symbol)
                    ? removeFavorite(symbol)
                    : addFavorite({
                        type: "stock",
                        symbol,
                        company: companyName,
                      })
                }
                variant={isFavorite(symbol) ? "danger" : "default"}
              >
                {isFavorite(symbol)
                  ? "Remove from Favorites"
                  : "Add to Favorites"}
              </Button>
              <Button onClick={() => router.back()}>Back</Button>
            </div>
          </section>
          <section>
            <StockGraph symbol={symbol} />
          </section>
          <section className="space-y-4 md:space-y-8">
            <div className="border border-gray-700 rounded-lg shadow-lg p-4">
              <h2 className="text-xl md:text-2xl font-semibold mb-4">
                Price Details
              </h2>
              {stockData && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
                  <div className="bg-gray-900 text-white p-3 border border-gray-700 rounded-lg shadow-lg">
                    <p>
                      <strong>Close Price:</strong> ₹
                      {stockData.close.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-900 text-white p-3 border border-gray-700 rounded-lg shadow-lg">
                    <p>
                      <strong>Change:</strong> {stockData.change > 0 ? "+" : ""}
                      {stockData.change.toFixed(2)} (
                      {stockData.percent.toFixed(2)}
                      %)
                    </p>
                  </div>
                  <div className="bg-gray-900 text-white p-3 border border-gray-700 rounded-lg shadow-lg">
                    <p>
                      <strong>Open:</strong> ₹{stockData.open.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-900 text-white p-3 border border-gray-700 rounded-lg shadow-lg">
                    <p>
                      <strong>High:</strong> ₹{stockData.high.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-900 text-white p-3 border border-gray-700 rounded-lg shadow-lg">
                    <p>
                      <strong>Low:</strong> ₹{stockData.low.toFixed(2)}
                    </p>
                  </div>
                  <div className="bg-gray-900 text-white p-3 border border-gray-700 rounded-lg shadow-lg">
                    <p>
                      <strong>Volume:</strong>{" "}
                      {stockData.volume.toLocaleString()}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {Object.keys(returns).length > 0 && (
              <div className="border border-gray-700 rounded-lg shadow-lg p-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-4">
                  Stock Returns
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-4">
                  {Object.entries(returns).map(([label, value]) => (
                    <div
                      key={label}
                      className={`p-3 rounded text-center ${
                        value >= 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <p className="font-bold">{label}</p>
                      <p>
                        {value >= 0 ? "+" : ""}
                        {value.toFixed(2)}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </Container>
    </div>
  );
}

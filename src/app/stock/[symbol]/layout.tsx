import React, { ReactNode } from "react";
import { Metadata } from "next";
import Container from "@/components/common/Container";
import { searchStocks } from "@/utils/api";
import { StockSearchResult } from "@/types";

interface StockLayoutProps {
  children: ReactNode;
  params: { symbol: string };
}

export async function generateMetadata({
  params,
}: {
  params: { symbol: string };
}): Promise<Metadata> {
  const symbol = params.symbol?.toUpperCase();
  let companyName = "Stock";

  try {
    const results: StockSearchResult[] = await searchStocks(symbol, 1);
    if (results.length > 0 && results[0].company) {
      companyName = results[0].company;
    }
  } catch (err) {
    console.error("Failed to fetch stock metadata:", err);
  }

  return {
    title: `${companyName} | ${symbol} - Stock Details`,
    description: `View detailed price chart and information for ${companyName} (${symbol}).`,
    keywords: `stocks, ${symbol}, ${companyName}, finance, chart, price`,
  };
}

export default function StockLayout({
  children,
}: StockLayoutProps) {
  return <Container>{children}</Container>;
}

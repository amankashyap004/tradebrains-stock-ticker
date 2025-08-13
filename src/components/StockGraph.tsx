"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  // Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "./common/Loading";
import { getStockPrices } from "../utils/api";
import { StockPrice } from "@/types";

interface StockGraphProps {
  symbol: string;
}

const StockGraph: React.FC<StockGraphProps> = ({ symbol }) => {
  const [data, setData] = useState<StockPrice[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [timeRange, setTimeRange] = useState<string>("1D");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let days, type, limit;
        switch (timeRange) {
          case "1D":
            days = 1;
            type = "INTRADAY";
            limit = 50;
            break;
          case "1W":
            days = 7;
            type = "DAILY";
            limit = 50;
            break;
          case "1M":
            days = 30;
            type = "DAILY";
            limit = 30;
            break;
          case "3M":
            days = 90;
            type = "DAILY";
            limit = 90;
            break;
          case "6M":
            days = 180;
            type = "DAILY";
            limit = 180;
            break;
          case "1Y":
            days = 365;
            type = "DAILY";
            limit = 365;
            break;
          case "MAX":
            days = 3650; // Approx 10 years
            type = "DAILY";
            limit = 3650;
            break;
          default:
            days = 1;
            type = "INTRADAY";
            limit = 50;
        }
        const prices: StockPrice[] = await getStockPrices(
          symbol,
          days,
          type,
          limit
        );
        setData(prices.reverse());
      } catch (error) {
        console.error("Error fetching graph data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [symbol, timeRange]);

  // Format date for X-axis (e.g., "13:34" for 1D, "MM-DD" for others)
  const formatDate = (date: string) => {
    const d = new Date(date);
    if (timeRange === "1D") {
      return d.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
    }
    return d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit" });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as StockPrice;
      return (
        <div className="bg-gray-900 text-white text-sm p-3 border border-gray-700 rounded-lg shadow-lg">
          <p>{formatDate(label)}</p>
          <p>Close: ₹{data.close.toFixed(2)}</p>
          <p>Open: ₹{data.open.toFixed(2)}</p>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="text-center flex flex-col justify-center items-center h-[350px] lg:h-[450px]">
        <Loading className="w-36 md:w-40" />
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center text-red-500 bg-gray-100 p-4 rounded-lg">
        No price data available for graph.
      </div>
    );
  }

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.close));
    const dataMin = Math.min(...data.map((i) => i.close));
    if (dataMax <= 0) return 0;
    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className="relative w-full">
      <div className="h-[350px] lg:h-[450px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl overflow-hidden">
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 15, left: 15, bottom: 20 }}
          >
            <defs>
              <linearGradient id="closeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4bc0c0" stopOpacity={0.8} />
                <stop
                  offset={`${Math.min(1, off) * 100}%`}
                  stopColor="#4bc0c0"
                  stopOpacity={0.4}
                />
                <stop offset="100%" stopColor="#4bc0c0" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="transparent" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              stroke="#ccc"
              fontSize={12}
              interval="preserveStartEnd"
              hide={true}
            />
            <YAxis
              domain={["dataMin - 10", "dataMax + 10"]}
              stroke="#ccc"
              fontSize={12}
              tickFormatter={(value) => `₹${value.toFixed(2)}`}
              hide={true}
            />
            <Tooltip
              content={<CustomTooltip />}
              animationDuration={100}
              isAnimationActive={true}
              trigger="hover"
              cursor={{ stroke: "#8884d8", strokeWidth: 1, opacity: 0.3 }}
              // position={{ y: 50 }}
            />
            {/* <Legend
              verticalAlign="top"
              height={36}
              wrapperStyle={{ color: '#fff', fontSize: '14px' }}
            /> */}
            <Area
              type="monotone"
              dataKey="close"
              stroke="#4bc0c0"
              fillOpacity={1}
              fill="url(#closeGradient)"
              name="Close Price"
            />
            {/* <Area
              type="monotone"
              dataKey="open"
              stroke="#8884d8"
              strokeOpacity={0}
              fillOpacity={0}
              name="Open Price"
            /> */}
          </AreaChart>
        </ResponsiveContainer>

        <div className="w-full px-4 flex justify-between gap-2 z-50 overflow-auto">
          {["1D", "1W", "1M", "3M", "6M", "1Y", "MAX"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`text-sm font-semibold px-2 py-1 rounded transition-all duration-500 bg-gradient-to-br cursor-pointer
            ${
              timeRange === range
                ? "from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600"
                : "from-gray-900 to-gray-700 text-gray-300 hover:from-gray-800 hover:to-gray-600"
            }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* <div className="absolute top-4 right-4 text-center text-white mt-2">
        Time Range: {formatDate(data[0].date)} -{" "}
        {formatDate(data[data.length - 1].date)}
      </div> */}
    </div>
  );
};

export default StockGraph;

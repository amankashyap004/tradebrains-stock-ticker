"use client";

import { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { getTickerData } from "@/utils/api";
import { MoverCompany } from "@/types";

const TickerBar = () => {
  const [movers, setMovers] = useState<MoverCompany[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTickerData();
        const gainers = Array.isArray(data.gainers) ? data.gainers : [];
        const losers = Array.isArray(data.losers) ? data.losers : [];
        setMovers([...gainers, ...losers]);
      } catch (err) {
        console.error("Ticker API Error:", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#1f2333] py-2 text-white">
      <Marquee pauseOnHover speed={50} gradient={false}>
        {movers.length > 0 ? (
          movers.map((mover) => {
            const isGainer = mover.change > 0;
            return (
              <div
                key={mover.symbol}
                className={`flex items-center justify-center gap-1 mx-8 text-sm font-semibold`}
              >
                <span>{mover.symbol}</span>
                <span>₹{mover.close?.toFixed(2)}</span>
                <span className={isGainer ? "text-green-500" : "text-red-500"}>
                  {isGainer ? "+" : "-"}
                  {isGainer ? mover.high?.toFixed(2) : mover.low?.toFixed(2)}
                </span>
                <span className={isGainer ? "text-green-500" : "text-red-500"}>
                  ({isGainer ? "+" : ""}
                  {mover.change?.toFixed(2)}%)
                </span>
                {isGainer ? (
                  <FaCaretUp className="mb-1 text-2xl md:text-3xl text-green-500" />
                ) : (
                  <FaCaretDown className="mb-1 text-2xl md:text-3xl text-red-500" />
                )}
              </div>
            );
          })
        ) : (
          <span className="mx-4">No market movers available</span>
        )}
      </Marquee>
    </div>
  );
};

export default TickerBar;

"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoSearchSharp } from "react-icons/io5";
import { searchStocks } from "@/utils/api";
import { StockSearchResult } from "@/types";

const defaultStocks: StockSearchResult[] = [
  { company: "Reliance Industries Ltd", symbol: "RELIANCE", type: "Stock" },
  { company: "HDFC Bank Ltd", symbol: "HDFCBANK", type: "Stock" },
  { company: "Bharti Airtel Ltd", symbol: "BHARTIARTL", type: "Stock" },
  { company: "Tata Consultancy Services Ltd", symbol: "TCS", type: "Stock" },
];

interface SearchBarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export default function SearchBar({ mobile = false, onClose }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StockSearchResult[]>(defaultStocks);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const debounce = setTimeout(async () => {
      if (query.length > 2) {
        const data = await searchStocks(query);
        setResults(data);
      } else {
        setResults(defaultStocks);
      }
    }, 1000);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelect = (symbol: string) => {
    setQuery("");
    setResults(defaultStocks);
    router.push(`/stock/${symbol}`);
    if (onClose) onClose();
    setIsOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={`relative w-full ${mobile ? "" : "max-w-md"}`}
    >
      <div
        className={`flex items-center px-4 border border-[#545E78] rounded-full bg-transparent`}
        onClick={() => setIsOpen(true)}
      >
        <IoSearchSharp className="text-2xl text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search"
          className="w-full px-2 py-2 focus:outline-none bg-transparent text-white"
        />
      </div>

      {isOpen && results.length > 0 && (
        <ul
          className={`absolute mt-2 w-full rounded-lg border border-[#545E78] bg-[#292E3F] overflow-hidden z-50 ${
            mobile ? "" : "max-h-60 overflow-auto"
          }`}
        >
          {results.map((stock) => (
            <li
              key={stock.symbol}
              onClick={() => handleSelect(stock?.symbol || "")}
              className="flex justify-between px-4 py-2.5 text-sm cursor-pointer border-b border-[#545E78]/70 hover:bg-[#545E78]/50"
            >
              <div className="flex flex-col items-start justify-start">
                <span className="text-white">{stock.company}</span>
                <span className="text-[#6DB8FD]">{stock.symbol}</span>
              </div>
              <span className="text-white">{stock.type}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

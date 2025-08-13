import React from "react";
import Head from "next/head";
import Container from "@/components/common/Container";
import Favorites from "@/components/Favorites";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Stock Ticker App</title>
      </Head>
      <Container>
        <div className="flex flex-col gap-8 w-full">
          <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 px-4 py-8 md:py-16 text-center text-white rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-4xl font-semibold mb-4">
              Find Real-Time Stock Prices
            </h1>
            <p className="md:text-lg mb-6 md:mb-8 text-gray-300 max-w-xl mx-auto">
              Search for your favorite stocks and track their live market
              performance instantly.
            </p>
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
          <div id="favorites" className="w-full scroll-mt-20 md:scroll-mt-28">
            <Favorites />
          </div>
        </div>
      </Container>
    </div>
  );
}

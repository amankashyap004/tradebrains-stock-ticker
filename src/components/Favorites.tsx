"use client";

import React from "react";
import Link from "next/link";
import Button from "./ui/Button";
import { useFavorites } from "@/context/FavoritesContext";

interface FavoriteItem {
  type: string;
  symbol: string;
  company: string;
}

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="p-4 border border-gray-400/20 rounded-lg">
      <div className="mb-4">
        <h3 className="text-xl font-semibold ">Favorites</h3>
        <p className="text-sm text-gray-400">
          List of all your favorite stocks
        </p>
      </div>
      {favorites.length === 0 ? (
        <div className="py-8">
          <p className="text-gray-500">No favorites added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <div
              key={fav.symbol}
              className="bg-gradient-to-r from-blue-950 to-blue-950 rounded-lg shadow p-4 flex flex-col justify-between"
            >
              <div className="flex justify-between gap-4">
                <div>
                  <h4 className="text-lg font-semibold">{fav.company}</h4>
                  <p className="text-sm text-gray-200">{fav.symbol}</p>
                </div>
                <span className="text-xs font-semibold uppercase">
                  {fav.type}
                </span>
              </div>
              <div className="mt-6 flex justify-between">
                <Link href={`/stock/${fav.symbol}`} className="">
                  <Button>View</Button>
                </Link>
                <Button
                  onClick={() => removeFavorite(fav.symbol)}
                  variant="danger"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

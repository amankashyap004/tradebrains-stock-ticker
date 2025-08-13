"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface FavoriteItem {
  type: string;
  symbol: string;
  company: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addFavorite: (fav: FavoriteItem) => void;
  removeFavorite: (symbol: string) => void;
  isFavorite: (symbol: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(stored);
  }, []);

  const saveFavorites = (newFavs: FavoriteItem[]) => {
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  const addFavorite = (fav: FavoriteItem) => {
    if (!favorites.some((f) => f.symbol === fav.symbol)) {
      saveFavorites([...favorites, fav]);
    }
  };

  const removeFavorite = (symbol: string) => {
    saveFavorites(favorites.filter((f) => f.symbol !== symbol));
  };

  const isFavorite = (symbol: string) => {
    return favorites.some((f) => f.symbol === symbol);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}

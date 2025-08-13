"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose, IoSearchSharp } from "react-icons/io5";
import Button from "@/components/ui/Button";
import Container from "./Container";
import SearchBar from "../SearchBar";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Stock Ticker", href: "/" },
  { label: "Favorites", href: "/#favorites" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#292E3F] shadow-lg z-50">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex gap-4 md:w-1/3">
            <Link href="/" className="w-24 lg:w-28">
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={200}
                height={100}
                quality={100}
                className="object-contain w-full h-full"
              />
            </Link>
            <div className="hidden lg:block w-full">
              <SearchBar />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 md:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white text-sm font-medium hover:underline"
              >
                {item.label}
              </Link>
            ))}
            <Button>Login</Button>
          </nav>

          {/* Mobile Icons */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              className="text-white text-2xl"
              onClick={() => setMobileSearch(true)}
            >
              <IoSearchSharp />
            </button>
            <button
              className="text-white text-2xl"
              onClick={() => setIsOpen(true)}
            >
              <IoMenu />
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Search */}
      <div
        className={`fixed top-0 left-0 right-0 bg-[#292E3F] p-4 transform transition-transform duration-300 z-50 ${
          mobileSearch ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <span className="text-white font-semibold">Search</span>
          <button
            className="text-white text-2xl"
            onClick={() => setMobileSearch(false)}
          >
            <IoClose />
          </button>
        </div>
        <SearchBar mobile onClose={() => setMobileSearch(false)} />
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-[#292E3F]/30 backdrop-blur-xl shadow-lg transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <Link href="/" className="w-24">
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={200}
              height={100}
              quality={100}
              className="object-contain w-full h-full"
            />
          </Link>
          <button
            className="text-white text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            <IoClose />
          </button>
        </div>
        <nav className="flex flex-col gap-4 p-4">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white text-base font-medium hover:underline"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Button>Login</Button>
        </nav>
      </div>

      {/* Overlay */}
      {(isOpen || mobileSearch) && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => {
            setIsOpen(false);
            setMobileSearch(false);
          }}
        ></div>
      )}
    </header>
  );
}

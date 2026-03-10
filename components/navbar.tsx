"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Apple, Search, ShoppingBag, Menu, X } from "lucide-react";

const navItems = [
    { label: "商店", href: "https://www.google.com/" },
    { label: "Mac", href: "#" },
    { label: "iPad", href: "#" },
    { label: "iPhone", href: "#" },
    { label: "Watch", href: "#" },

];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 12);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            {/* Main Navbar */}
            <header
                className={`fixed inset-x-0 top-0 z-50  border-black/5 bg-[#ffffff]/10 backdrop-blur-xl transition-all duration-300 ease-out ${scrolled
                        ? "h-[52px] shadow-[0_8px_30px_rgba(0,0,0,0.10)]"
                        : "h-[72px] shadow-none"
                    }`}
            >
                <div className="mx-auto flex h-full w-full max-w-[1200px] items-center justify-between px-4 md:px-6">
                    {/* Mobile Navbar */}
                    <div className="flex w-full items-center justify-between md:hidden">
                        <Link href="#" className="text-black">
                            <Apple className="h-5 w-5 stroke-[1.8]" />
                        </Link>

                        <div className="flex items-center gap-5">
                            <button type="button" aria-label="搜尋" className="text-black">
                                <Search className="h-5 w-5 stroke-[1.8]" />
                            </button>

                            <button type="button" aria-label="購物袋" className="text-black">
                                <ShoppingBag className="h-5 w-5 stroke-[1.8]" />
                            </button>

                            <button
                                type="button"
                                aria-label="開啟選單"
                                className="text-black"
                                onClick={() => setMobileOpen(true)}
                            >
                                <Menu className="h-6 w-6 stroke-[1.8]" />
                            </button>
                        </div>
                    </div>

                    {/* Desktop Navbar */}
                    <nav className="hidden h-full w-full items-center justify-between md:flex">
                        <Link href="#" className="text-black">
                            <Apple className="h-4 w-4 stroke-[1.8]" />
                        </Link>

                        <div className="flex items-center gap-7 lg:gap-9">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="text-[12px] font-normal text-black/80 transition-colors duration-200 hover:text-black"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center gap-5 text-black">
                            <button type="button" aria-label="搜尋">
                                <Search className="h-4 w-4 stroke-[1.8]" />
                            </button>
                            <button type="button" aria-label="購物袋">
                                <ShoppingBag className="h-4 w-4 stroke-[1.8]" />
                            </button>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Mobile Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/25 transition-opacity duration-300 md:hidden ${mobileOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }`}
                onClick={() => setMobileOpen(false)}
            />

            {/* Mobile Slide Panel */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 h-screen w-full bg-[#f5f5f7] transition-transform duration-300 ease-out md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Top bar: only X */}
                <div className="flex h-[72px] items-center justify-end px-4">
                    <button
                        type="button"
                        aria-label="關閉選單"
                        className="text-black"
                        onClick={() => setMobileOpen(false)}
                    >
                        <X className="h-6 w-6 stroke-[1.8]" />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="px-8 pb-10 pt-2">
                    <ul className="space-y-5">
                        {navItems.map((item, index) => (
                            <li
                                key={item.label}
                                className={`transition-all duration-300 ${mobileOpen
                                        ? "translate-x-0 opacity-100"
                                        : "-translate-x-4 opacity-0"
                                    }`}
                                style={{
                                    transitionDelay: mobileOpen ? `${index * 35}ms` : "0ms",
                                }}
                            >
                                <Link
                                    href={item.href}
                                    className="block text-[28px] font-semibold tracking-[-0.03em] text-[#1d1d1f]"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    );
}
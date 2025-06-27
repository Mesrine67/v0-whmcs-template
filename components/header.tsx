"use client"

import { useState } from "react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { Menu, User, ShoppingCart, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations()

  const navigation = [
    { name: t("navigation.home"), href: "/" },
    { name: t("navigation.webHosting"), href: "/hosting" },
    { name: t("navigation.vps"), href: "/vps" },
    { name: t("navigation.fivem"), href: "/fivem" },
    { name: t("navigation.dedicated"), href: "/dedicated" },
    { name: t("navigation.domains"), href: "/domains" },
    { name: t("navigation.support"), href: "/support" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-10 w-auto">
              <svg viewBox="0 0 200 60" className="h-10 w-auto">
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                </defs>
                <path
                  d="M20 15 L35 10 L50 15 L50 35 C50 45 35 50 35 50 C35 50 20 45 20 35 Z"
                  fill="url(#logoGradient)"
                />
                <path d="M25 20 L45 20 M25 25 L45 25 M25 30 L45 30" stroke="white" strokeWidth="2" />
                <circle cx="42" cy="22" r="1.5" fill="white" />
                <circle cx="42" cy="27" r="1.5" fill="white" />
                <path d="M52 15 L58 12 L64 15 L61 18 L58 15 L55 18 Z" fill="url(#logoGradient)" />
                <text x="70" y="25" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#1e293b">
                  Heberg
                </text>
                <text x="70" y="42" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="normal" fill="#0ea5e9">
                  TonServ
                </text>
              </svg>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Menu Compte */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex">
                <User className="h-4 w-4 mr-2" />
                {t("navigation.myAccount")}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link href="/client-area">{t("navigation.clientArea")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/login">{t("navigation.login")}</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/register">{t("navigation.register")}</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/terms">Conditions Générales</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/privacy">Confidentialité</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
            <Link href="/whmcs/cart.php">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t("navigation.order")}
            </Link>
          </Button>

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <Link href="/client-area" className="block text-sm font-medium">
                    {t("navigation.clientArea")}
                  </Link>
                  <Link href="/login" className="block text-sm font-medium">
                    {t("navigation.login")}
                  </Link>
                  <Link href="/register" className="block text-sm font-medium">
                    {t("navigation.register")}
                  </Link>
                </div>
                <div className="border-t pt-4">
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

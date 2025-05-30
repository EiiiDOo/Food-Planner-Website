import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NavBar } from "../components/Navbar";
import { MealsForSearchContextProvider } from "../context/MealsForSearchContext";
import { AuthContextProvider } from "../context/AuthContext";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Planner",
  description: "Developed by Ahmed Eid",
};

const loading = (
  <div className="min-h-screen w-full flex items-center justify-center relative">
    <span className="loading  loading-bars absolute top-1/2 right-1/2 translate-x-1/2 translate-y-1/2 "></span>
  </div>
);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-logo-color cursor-default `}
      >
        <AuthContextProvider>
          <MealsForSearchContextProvider>
            <NavBar />

            <Suspense fallback={loading}>{children}</Suspense>
          </MealsForSearchContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}

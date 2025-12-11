import "./globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Todo App",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              borderRadius: "12px",
              background: "#ffffff",
              color: "#333",
              border: "1px solid #e5e7eb",
              padding: "12px 14px",
            },
          }}
        />
      </body>
    </html>
  );
}

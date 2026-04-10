import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { isAdminEmail } from "@/lib/auth/admin";
import { getSession } from "@/lib/auth/session";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TempTicket — onward travel proof for nomads",
  description:
    "Real, verifiable flight reservations for onward-travel checks. Built for digital nomads.",
  icons: {
    icon: "/favicon.ico",
    apple: "/tempticket.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  const showAdmin = session ? isAdminEmail(session.email) : false;

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakarta.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-0 min-h-dvh flex-col bg-background text-foreground">
        <Providers>
          <SiteHeader
            email={session?.email ?? null}
            showAdmin={showAdmin}
          />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <Toaster richColors position="top-center" />
        </Providers>
      </body>
    </html>
  );
}

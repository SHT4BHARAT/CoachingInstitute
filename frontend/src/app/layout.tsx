import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, Noto_Sans_Devanagari, JetBrains_Mono } from 'next/font/google';
import '@/styles/tokens.css';
import './globals.css';
import 'katex/dist/katex.min.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { AuthProvider } from '@/context/AuthContext';
import { RoleSwitcherBanner } from '@/components/common/RoleSwitcherBanner';
import { Header } from '@/components/common/Header';
import { CommandPalette } from '@/components/common/CommandPalette';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400','500','600','700','800','900'],
  style: ['normal','italic'],
  display: 'swap',
});
const ibmPlex = IBM_Plex_Sans({
  subsets: ['latin'],
  variable: '--font-family-base',
  weight: ['400','500','600','700'],
  display: 'swap',
});
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-family-mono',
  weight: ['400','500','700'],
  display: 'swap',
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  variable: '--font-family-devanagari',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'MahaShiksha (महा-शिक्षा) — Maharashtra EdTech Platform',
  description: 'Enterprise digital coaching platform for Maharashtra State Board (10th/12th) & MHT-CET with DRM protection and AI doubt resolution.',
};

export const viewport = {
  themeColor: '#FDF6E3',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className={`${fraunces.variable} ${ibmPlex.variable} ${jetbrains.variable} ${notoDevanagari.variable}`} style={{ colorScheme: 'light' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <LanguageProvider>
          <AuthProvider>
            <RoleSwitcherBanner />
            <Header />
            <CommandPalette />
            <main id="main-content" tabIndex={-1} className="main-content-area">{children}</main>
          </AuthProvider>
        </LanguageProvider>
        <style>{`html{scroll-padding-top:80px} .skip-link{position:absolute;left:-9999px;top:8px;z-index:10000;padding:8px 16px;background:var(--ink-register);color:#FDF6E3;border-radius:8px;font-weight:700;font-size:0.85rem} .skip-link:focus{left:12px} #main-content:focus{outline:none} #main-content:focus-visible{outline:2px solid var(--laterite);outline-offset:2px}`}</style>
      </body>
    </html>
  );
}

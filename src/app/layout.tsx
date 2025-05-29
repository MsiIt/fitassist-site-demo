import '../../styles/globals.scss'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "~/app/Header";
import Footer from "~/app/Footer";
import { ThemeProvider } from '@mui/material/styles'
import theme from "../../styles/theme";
import {Suspense} from "react";
import {Metrika} from "~/app/components/Metrika";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fit Assist: Приложение-помощник. Вместе к лучшей версии себя.",
  description: "Начни свой путь к лучшей версии себя с нашим приложением. Тренируйся вместе с нами и достигай новых высот каждый день!",
  icons: {
    icon: '/images/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={inter.className}>
    <head>
      {/* Google Tag Manager */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-11433813440"
      >
      </script>

      <script
        dangerouslySetInnerHTML={{
          __html: `setTimeout(function() {
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-11433813440');
      
            // Additional event pushed after GTM initialization
            dataLayer.push({'event': 'afterLoad'});
            }, 1500);`,
        }}
      />
    </head>
    <ThemeProvider theme={theme}>
      <body style={{height: '100vh', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>

      <Suspense>
        <Metrika />
      </Suspense>

      <Header/>

      {children}

      <Footer/>

      </body>
    </ThemeProvider>
    </html>
  );
}

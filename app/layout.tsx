import type { Metadata } from 'next';
import '@fontsource/ibm-plex-sans-arabic/400.css';
import '@fontsource/ibm-plex-sans-arabic/500.css';
import '@fontsource/ibm-plex-sans-arabic/600.css';
import '@fontsource/ibm-plex-sans-arabic/700.css';
import './globals.css';
export const metadata: Metadata = {title:'أزهلها | صيانة سيارتك، بكل بساطة',description:'قارن الأسعار، اختر الورشة المناسبة، واحجز بكل سهولة. نموذج تفاعلي ببيانات تجريبية.'};
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="ar" dir="rtl"><body>{children}</body></html>}

import './globals.css';
import { Inter } from 'next/font/google';
import Header from './components/Header'; // Import the header

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PatientSense AI',
  description: 'Empathetic AI health monitoring',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* Add the header here */}
        {children}
      </body>
    </html>
  );
}

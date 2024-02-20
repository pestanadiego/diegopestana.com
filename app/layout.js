import "./globals.css";

export const metadata = {
  title: "Diego Pestana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

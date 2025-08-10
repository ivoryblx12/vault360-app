export const metadata = { title: 'Vault360' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{fontFamily:'system-ui,Segoe UI,Roboto,Arial',maxWidth:900,margin:'24px auto',padding:'0 16px'}}>
        {children}
      </body>
    </html>
  );
}

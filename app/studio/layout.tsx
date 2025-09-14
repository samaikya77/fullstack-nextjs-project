export const metadata={
    title:"Studio Layout",
    description: "Layout for the studio section of the application",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
    
  );
} 

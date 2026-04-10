export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden [padding-top:env(safe-area-inset-top,0px)]">
      {children}
    </div>
  );
}

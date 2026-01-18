// app/dashboard/messages/layout.tsx
export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
}
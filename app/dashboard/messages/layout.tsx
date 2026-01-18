// app/dashboard/messages/layout.tsx

export default function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Break out of dashboard layout completely
  // Messages needs full screen without padding/constraints
  return (
    <div className="fixed inset-0 z-50">
      {children}
    </div>
  );
}
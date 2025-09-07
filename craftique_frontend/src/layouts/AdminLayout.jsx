function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#333] text-white p-4 text-lg font-semibold">
        Admin Dashboard
      </header>
      <main className="p-4">{children}</main>
    </div>
  );
}

export default AdminLayout;

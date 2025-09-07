const TopNav = () => {
  const profile = {
    name: localStorage.getItem("username") || "Artisan",
    image: "/profile-placeholder.jpg", // Replace with real profile image logic
  };

  return (
    <header style={{ background: "#fff", padding: "12px 24px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontSize: "20px", fontWeight: "bold", color: "#4b2e1f" }}>
        <img src="/logo192.png" alt="Craftique" style={{ height: "28px", verticalAlign: "middle", marginRight: "10px" }} />
        Craftique
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span>{profile.name}</span>
        <img src={profile.image} alt="Profile" style={{ height: "32px", width: "32px", borderRadius: "50%", objectFit: "cover" }} />
      </div>
    </header>
  );
};

export default TopNav;

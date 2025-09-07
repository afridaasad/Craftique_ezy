const Footer = () => {
  return (
    <footer style={{ background: "#f4e3d3", textAlign: "center", padding: "12px", fontSize: "14px" }}>
      <p>Craftique by Afreeda &middot;
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>LinkedIn</a> &middot;
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>GitHub</a> &middot;
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>Instagram</a>
      </p>
    </footer>
  );
};

const linkStyle = { marginLeft: "8px", marginRight: "8px", color: "#4b2e1f", textDecoration: "none" };

export default Footer;

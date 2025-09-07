const ChatbotIcon = () => {
  const openChat = () => {
    alert("Chatbot will open here."); // Replace with actual modal/popup logic
  };

  return (
    <button
      onClick={openChat}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#4b2e1f",
        color: "white",
        borderRadius: "50%",
        border: "none",
        width: "50px",
        height: "50px",
        fontSize: "20px",
        cursor: "pointer",
        zIndex: 999,
      }}
      title="Ask Craftique Assistant"
    >
      💬
    </button>
  );
};

export default ChatbotIcon;

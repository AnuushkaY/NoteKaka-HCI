// NoteKaka HCI - Login Component with Local Storage
import React, { useState } from "react";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("finlit_user");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FAF7F2",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: "20px",
    },
    card: {
      backgroundColor: "#FFFFFF",
      padding: "36px 30px",
      borderRadius: "20px",
      boxShadow: "0 4px 16px rgba(28, 43, 30, 0.08)",
      maxWidth: "420px",
      width: "100%",
      border: "1px solid #DFD7CC",
      textAlign: "center",
    },
    badge: {
      fontSize: "36px",
      marginBottom: "10px",
    },
    title: {
      color: "#1E4D2B",
      fontSize: "24px",
      margin: "0 0 8px 0",
      fontWeight: "800",
    },
    subtitle: {
      color: "#4A5B4D",
      fontSize: "14px",
      margin: "0 0 20px 0",
      lineHeight: "1.5",
    },
    inputGroup: {
      textAlign: "left",
      marginBottom: "16px",
    },
    label: {
      display: "block",
      fontSize: "13px",
      fontWeight: "700",
      color: "#1C2B1E",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "10px",
      border: "2px solid #DFD7CC",
      fontSize: "15px",
      boxSizing: "border-box",
      outline: "none",
    },
    button: {
      width: "100%",
      padding: "14px",
      borderRadius: "30px",
      border: "none",
      backgroundColor: "#1E4D2B",
      color: "#FFFFFF",
      fontSize: "16px",
      fontWeight: "700",
      cursor: "pointer",
      marginTop: "10px",
    },
    alert: {
      padding: "10px 14px",
      borderRadius: "8px",
      fontSize: "13px",
      marginBottom: "16px",
      textAlign: "left",
    },
    alertError: {
      backgroundColor: "#FEF2F2",
      color: "#B91C1C",
      border: "1px solid #FCA5A5",
    },
    alertSuccess: {
      backgroundColor: "#E8F5EE",
      color: "#1B7A42",
      border: "1px solid #86EFAC",
    },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage("");
    setIsError(false);

    if (!identifier.trim() || !password) {
      setIsError(true);
      setMessage("कृपया यूज़रनेम/मोबाइल और पासवर्ड दोनों भरें।");
      return;
    }

    try {
      const stored = localStorage.getItem("finlit_registered_users");
      const users = stored
        ? JSON.parse(stored)
        : [
            {
              id: "demo_1",
              name: "रामेश्वर किसान",
              username: "ramesh",
              password: "password123",
              role: "farmer",
            },
          ];

      const cleanId = identifier.trim().toLowerCase();
      const matched = users.find(
        (u) =>
          (u.username && u.username.toLowerCase() === cleanId) ||
          (u.phone && u.phone === cleanId)
      );

      if (!matched) {
        setIsError(true);
        setMessage("खाता नहीं मिला। कृपया पहले साइन अप करें या ramesh से जाँचें।");
        return;
      }

      if (matched.password !== password) {
        setIsError(true);
        setMessage("गलत पासवर्ड! कृपया दोबारा प्रयास करें।");
        return;
      }

      localStorage.setItem("finlit_user", JSON.stringify(matched));
      setCurrentUser(matched);
      setIsError(false);
      setMessage(`लॉगिन सफल! स्वागत है ${matched.name || matched.username} जी।`);
    } catch (err) {
      setIsError(true);
      setMessage("लोकल स्टोरेज पढ़ने में त्रुटि।");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("finlit_user");
    setCurrentUser(null);
    setMessage("लॉगआउट सफल।");
  };

  if (currentUser) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <div style={styles.badge}>🌱</div>
          <h1 style={styles.title}>NoteKaka</h1>
          <p style={styles.subtitle}>आप सफलतापूर्वक लॉगिन हैं (Local Storage):</p>
          <div
            style={{
              padding: "10px",
              backgroundColor: "#EAF2EC",
              borderRadius: "10px",
              marginBottom: "16px",
              fontWeight: "700",
              color: "#1E4D2B",
            }}
          >
            👤 {currentUser.name || currentUser.username} ({currentUser.role || "learner"})
          </div>
          <button style={styles.button} onClick={handleLogout}>
            लॉगआउट करें (Log Out)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.badge}>🔑</div>
        <h1 style={styles.title}>NoteKaka Login</h1>
        <p style={styles.subtitle}>
          गाँव-कस्बों की वित्तीय समझ - लोकल स्टोरेज आधारित सुरक्षित लॉगिन
        </p>

        {message && (
          <div
            style={{
              ...styles.alert,
              ...(isError ? styles.alertError : styles.alertSuccess),
            }}
          >
            {isError ? "⚠️ " : "✅ "}
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>मोबाइल नंबर या यूज़रनेम</label>
            <input
              style={styles.input}
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="उदा. 9876543210 या ramesh"
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>पासवर्ड</label>
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="पासवर्ड दर्ज करें"
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            लॉगिन करें (Login) →
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

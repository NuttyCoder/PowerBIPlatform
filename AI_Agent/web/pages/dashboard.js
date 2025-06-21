/* Power BI iframe embed with auth check */
export default function Dashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>Your Personalized Dashboard</h1>
      <p>Below is your Power BI embedded dashboard:</p>
      <iframe
        title="Power BI Report"
        width="1000"
        height="600"
        src="https://app.powerbi.com/view?r=YOUR-POWER-BI-LINK"
        frameBorder="0"
        allowFullScreen={true}
        style={{ border: "1px solid #ccc" }}
      ></iframe>
    </div>
  );
}
""",
    "pages/login.js": """
export default function Login() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Login to JRW Portal</h1>
      <p>For now, use Microsoft login via SharePoint or Teams access control.</p>
      <p>This placeholder can be replaced with Microsoft Entra ID or Firebase Auth.</p>
    </div>
  );
}

/* Subscription tiers and links */
export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Welcome to JRW Sales Forecast Portal</h1>
      <p>Select your plan:</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "30px" }}>
        {["Basic", "Pro", "Enterprise"].map((tier) => (
          <div key={tier} style={{ border: "1px solid #ccc", padding: "20px", background: "#fff" }}>
            <h2>{tier}</h2>
            <p>{tier === "Basic" ? "View only" : tier === "Pro" ? "Includes KPIs" : "Custom dashboards"}</p>
            <a href={"https://buy.stripe.com/test_" + tier.toLowerCase()} style={{
              display: "inline-block",
              padding: "10px 20px",
              backgroundColor: "#0078D4",
              color: "white",
              textDecoration: "none"
            }}>
              <a href="https://buy.stripe.com/..." className="button">Subscribe</a>

            </a>
          </div>
        ))}
      </div>

      <p style={{ marginTop: "40px" }}>
        <a href="/dashboard">Access My Dashboard</a>
      </p>
    </main>
  );
}

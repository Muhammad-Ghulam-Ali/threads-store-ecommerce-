import { useState, useEffect, useRef } from "react";

// ─── Fraud scoring logic (deterministic but looks ML) ───────────────────────
function computeFraudSignals(order) {
  const signals = [];
  let score = 0;

  const highRiskCities = ["karachi", "lahore", "islamabad"];
  const cityLower = (order.city || "").toLowerCase();
  const isHighRiskCity = highRiskCities.includes(cityLower);

  const amount = order.totalAmount || 0;
  if (amount > 15000) { score += 28; signals.push({ label: "High transaction value", weight: 28, type: "gnn", risk: "high" }); }
  else if (amount > 8000) { score += 12; signals.push({ label: "Elevated transaction value", weight: 12, type: "gnn", risk: "medium" }); }

  if (order.payment === "Bank Transfer") { score += 22; signals.push({ label: "Bank transfer — low traceability", weight: 22, type: "symbolic", risk: "high" }); }
  else if (order.payment === "Easypaisa" || order.payment === "JazzCash") { score += 8; signals.push({ label: "Mobile wallet payment", weight: 8, type: "symbolic", risk: "low" }); }
  else if (order.payment === "Cash on Delivery") { score -= 5; signals.push({ label: "COD — lower fraud risk", weight: -5, type: "symbolic", risk: "safe" }); }

  if (isHighRiskCity && amount > 10000) { score += 15; signals.push({ label: "High-value order in metro city", weight: 15, type: "gnn", risk: "medium" }); }

  const emailDomain = (order.email || "").split("@")[1] || "";
  const suspiciousDomains = ["yopmail.com", "mailinator.com", "tempmail.com", "guerrillamail.com"];
  if (suspiciousDomains.includes(emailDomain)) { score += 35; signals.push({ label: "Disposable email detected", weight: 35, type: "symbolic", risk: "high" }); }

  const phone = (order.phoneNumber || "").replace(/\s/g, "");
  if (phone.startsWith("+92300000") || phone === "03000000000") { score += 20; signals.push({ label: "Suspicious phone pattern", weight: 20, type: "gnn", risk: "high" }); }

  if (order.instructions && order.instructions.length > 80) { score += 8; signals.push({ label: "Unusually long order note", weight: 8, type: "symbolic", risk: "medium" }); }

  if (order.items && order.items.length > 4) { score += 10; signals.push({ label: "Large item count", weight: 10, type: "gnn", risk: "medium" }); }

  score = Math.min(Math.max(score, 3), 97);
  return { score, signals };
}

function getRiskLevel(score) {
  if (score >= 65) return { label: "HIGH RISK", color: "#ef4444", bg: "rgba(239,68,68,0.1)", border: "#ef4444" };
  if (score >= 35) return { label: "MEDIUM RISK", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "#f59e0b" };
  return { label: "LOW RISK", color: "#10b981", bg: "rgba(16,185,129,0.1)", border: "#10b981" };
}

// ─── GNN Graph Visualization ─────────────────────────────────────────────────
function GNNGraph({ order, animate }) {
  const nodes = [
    { id: "user", label: "USER", x: 50, y: 50, icon: "👤" },
    { id: "device", label: "DEVICE", x: 20, y: 20, icon: "📱" },
    { id: "ip", label: "IP NODE", x: 80, y: 20, icon: "🌐" },
    { id: "merchant", label: "MERCHANT", x: 50, y: 80, icon: "🏪" },
    { id: "payment", label: "PAYMENT", x: 20, y: 70, icon: "💳" },
    { id: "email", label: "EMAIL", x: 80, y: 70, icon: "✉️" },
  ];
  const edges = [
    ["user", "device"], ["user", "ip"], ["user", "merchant"],
    ["user", "payment"], ["user", "email"], ["device", "ip"],
    ["payment", "merchant"], ["email", "merchant"],
  ];

  const { score } = computeFraudSignals(order);
  const risk = getRiskLevel(score);

  return (
    <div style={{ position: "relative", width: "100%", paddingBottom: "62%", background: "rgba(12,12,12,0.6)", borderRadius: 12, border: "1px solid #222", overflow: "hidden" }}>
      <svg viewBox="0 0 100 90" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {/* edges */}
        {edges.map(([a, b], i) => {
          const na = nodes.find(n => n.id === a);
          const nb = nodes.find(n => n.id === b);
          return (
            <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke={animate ? risk.color : "#333"} strokeWidth="0.4" strokeOpacity={animate ? 0.5 : 0.3}
              style={{ transition: "stroke 1s ease, stroke-opacity 1s ease" }} />
          );
        })}
        {/* nodes */}
        {nodes.map((n, i) => (
          <g key={n.id} style={{ animation: animate ? `pulse 2s ease-in-out ${i * 0.15}s infinite` : "none" }}>
            <circle cx={n.x} cy={n.y} r="5.5"
              fill={animate ? risk.bg : "rgba(30,30,30,0.8)"}
              stroke={animate ? risk.color : "#444"} strokeWidth="0.5"
              style={{ transition: "fill 1s ease, stroke 1s ease" }} />
            <text x={n.x} y={n.y + 0.6} textAnchor="middle" dominantBaseline="middle"
              fontSize="3.5" fill={animate ? risk.color : "#666"}
              style={{ transition: "fill 1s ease" }}>{n.icon}</text>
            <text x={n.x} y={n.y + 7.5} textAnchor="middle" fontSize="2.2"
              fill={animate ? "#aaa" : "#444"} fontFamily="monospace"
              style={{ transition: "fill 1s ease" }}>{n.label}</text>
          </g>
        ))}
      </svg>
      <style>{`@keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.7 } }`}</style>
    </div>
  );
}

// ─── Animated Score Gauge ────────────────────────────────────────────────────
function FraudGauge({ score, animate }) {
  const [displayScore, setDisplayScore] = useState(0);
  const risk = getRiskLevel(score);

  useEffect(() => {
    if (!animate) { setDisplayScore(0); return; }
    let start = 0;
    const step = score / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= score) { setDisplayScore(score); clearInterval(timer); }
      else setDisplayScore(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [animate, score]);

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const progress = (displayScore / 100) * circumference;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <svg width="140" height="140" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="#1a1a1a" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none"
          stroke={risk.color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset={circumference / 4}
          style={{ transition: "stroke-dasharray 0.05s linear, stroke 0.5s ease" }} />
        <text x="50" y="46" textAnchor="middle" fontSize="18" fontWeight="bold"
          fill={risk.color} fontFamily="monospace">{displayScore}</text>
        <text x="50" y="58" textAnchor="middle" fontSize="6" fill="#666" fontFamily="monospace">FRAUD SCORE</text>
      </svg>
      <div style={{ padding: "6px 20px", borderRadius: 6, background: risk.bg, border: `1px solid ${risk.border}`, color: risk.color, fontSize: 11, fontWeight: 700, letterSpacing: 2, fontFamily: "monospace" }}>
        {animate ? risk.label : "PENDING..."}
      </div>
    </div>
  );
}

// ─── Analysis Pipeline ───────────────────────────────────────────────────────
function AnalysisPipeline({ step }) {
  const steps = [
    { label: "Loading transaction graph", icon: "⬡" },
    { label: "Running GNN message passing", icon: "⟳" },
    { label: "Applying symbolic rule engine", icon: "⚖" },
    { label: "Computing fraud probability", icon: "◈" },
    { label: "Analysis complete", icon: "✓" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {steps.map((s, i) => {
        const done = step > i;
        const active = step === i;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: done || active ? 1 : 0.25, transition: "opacity 0.4s ease" }}>
            <div style={{ width: 24, height: 24, borderRadius: 6, background: done ? "#10b981" : active ? "#c9a96e" : "#1a1a1a", border: `1px solid ${done ? "#10b981" : active ? "#c9a96e" : "#333"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: done || active ? "#0c0c0c" : "#555", transition: "all 0.4s ease", flexShrink: 0 }}>
              {done ? "✓" : s.icon}
            </div>
            <span style={{ fontSize: 11, fontFamily: "monospace", color: done ? "#10b981" : active ? "#c9a96e" : "#555", transition: "color 0.4s ease" }}>
              {s.label}{active ? "..." : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ─── Order Detail Modal ──────────────────────────────────────────────────────
function OrderModal({ order, onClose }) {
  const [pipelineStep, setPipelineStep] = useState(0);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const timerRef = useRef(null);

  const { score, signals } = computeFraudSignals(order);
  const risk = getRiskLevel(score);

  useEffect(() => {
    let s = 0;
    const advance = () => {
      s++;
      setPipelineStep(s);
      if (s >= 4) { setAnalysisComplete(true); clearInterval(timerRef.current); }
    };
    timerRef.current = setInterval(advance, 900);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, backdropFilter: "blur(4px)" }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{ background: "#0c0c0c", border: "1px solid #222", borderRadius: 16, width: "100%", maxWidth: 860, maxHeight: "90vh", overflow: "auto", padding: 28 }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 10, color: "#555", fontFamily: "monospace", letterSpacing: 2, marginBottom: 4 }}>NEURO-SYMBOLIC AI · FRAUD ANALYSIS</div>
            <h2 style={{ color: "#f4f1ec", fontFamily: "monospace", fontSize: 16, margin: 0 }}>
              ORDER #{order.id?.toString().slice(-6).toUpperCase()}
            </h2>
          </div>
          <button onClick={onClose} style={{ background: "#1a1a1a", border: "1px solid #333", color: "#888", borderRadius: 8, width: 32, height: 32, cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* GNN Graph */}
            <div>
              <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace", letterSpacing: 2, marginBottom: 8 }}>GRAPH NEURAL NETWORK — TRANSACTION GRAPH</div>
              <GNNGraph order={order} animate={analysisComplete} />
            </div>
            {/* Pipeline */}
            <div style={{ background: "#111", borderRadius: 12, border: "1px solid #1a1a1a", padding: 16 }}>
              <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace", letterSpacing: 2, marginBottom: 12 }}>ANALYSIS PIPELINE</div>
              <AnalysisPipeline step={pipelineStep} />
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Gauge */}
            <div style={{ background: "#111", borderRadius: 12, border: "1px solid #1a1a1a", padding: 16, display: "flex", justifyContent: "center" }}>
              <FraudGauge score={score} animate={analysisComplete} />
            </div>

            {/* Signals */}
            <div style={{ background: "#111", borderRadius: 12, border: "1px solid #1a1a1a", padding: 16, flex: 1 }}>
              <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace", letterSpacing: 2, marginBottom: 12 }}>DETECTED SIGNALS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {signals.length === 0 && <div style={{ fontSize: 11, color: "#444", fontFamily: "monospace" }}>No risk signals detected.</div>}
                {signals.map((sig, i) => {
                  const c = sig.risk === "safe" ? "#10b981" : sig.risk === "high" ? "#ef4444" : sig.risk === "medium" ? "#f59e0b" : "#888";
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 10px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: "1px solid #1a1a1a", opacity: analysisComplete ? 1 : 0.3, transition: `opacity 0.4s ease ${i * 0.1}s` }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 8, fontFamily: "monospace", padding: "2px 6px", borderRadius: 4, background: sig.type === "gnn" ? "rgba(201,169,110,0.15)" : "rgba(139,92,246,0.15)", color: sig.type === "gnn" ? "#c9a96e" : "#a78bfa", border: `1px solid ${sig.type === "gnn" ? "#c9a96e" : "#a78bfa"}40` }}>
                          {sig.type === "gnn" ? "GNN" : "RULE"}
                        </span>
                        <span style={{ fontSize: 11, color: "#aaa", fontFamily: "monospace" }}>{sig.label}</span>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: c, fontFamily: "monospace" }}>{sig.weight > 0 ? "+" : ""}{sig.weight}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer info */}
            <div style={{ background: "#111", borderRadius: 12, border: "1px solid #1a1a1a", padding: 16 }}>
              <div style={{ fontSize: 9, color: "#555", fontFamily: "monospace", letterSpacing: 2, marginBottom: 10 }}>CUSTOMER DATA</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {[
                  ["Name", `${order.firstName} ${order.lastName}`],
                  ["Email", order.email],
                  ["Phone", order.phoneNumber],
                  ["City", order.city],
                  ["Province", order.province],
                  ["Payment", order.payment],
                  ["Items", order.items?.length || 0],
                  ["Total", `Rs. ${order.totalAmount?.toLocaleString()}`],
                ].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 8, color: "#555", fontFamily: "monospace", letterSpacing: 1 }}>{k.toUpperCase()}</div>
                    <div style={{ fontSize: 11, color: "#c9a96e", fontFamily: "monospace", marginTop: 2, wordBreak: "break-all" }}>{v || "—"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Final verdict banner */}
        {analysisComplete && (
          <div style={{ marginTop: 20, padding: "14px 20px", borderRadius: 10, background: risk.bg, border: `1px solid ${risk.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 9, color: risk.color, fontFamily: "monospace", letterSpacing: 2, marginBottom: 4 }}>FINAL VERDICT</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: risk.color, fontFamily: "monospace" }}>{risk.label} — {score}/100 FRAUD PROBABILITY</div>
            </div>
            <div style={{ fontSize: 28 }}>
              {score >= 65 ? "🚨" : score >= 35 ? "⚠️" : "✅"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("ordersData") || "[]");
    setOrders(stored.reverse()); // newest first
  }, []);

  const clearOrders = () => {
    localStorage.removeItem("ordersData");
    setOrders([]);
  };

  const stats = {
    total: orders.length,
    high: orders.filter(o => computeFraudSignals(o).score >= 65).length,
    medium: orders.filter(o => { const s = computeFraudSignals(o).score; return s >= 35 && s < 65; }).length,
    low: orders.filter(o => computeFraudSignals(o).score < 35).length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f4f1ec", fontFamily: "monospace", paddingTop: 64 }}>
      {/* Top bar */}
      <div style={{ borderBottom: "1px solid #161616", padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#0c0c0c" }}>
        <div>
          <div style={{ fontSize: 8, color: "#555", letterSpacing: 3, marginBottom: 4 }}>RESTRICTED ACCESS · DEMO MODE</div>
          <h1 style={{ fontSize: 18, fontWeight: 700, margin: 0, color: "#f4f1ec", letterSpacing: 1 }}>
            ⬡ FRAUD DETECTION CONSOLE
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 9, color: "#10b981", padding: "4px 10px", borderRadius: 4, border: "1px solid #10b98140", background: "rgba(16,185,129,0.08)" }}>● SYSTEM ONLINE</div>
          {orders.length > 0 && (
            <button onClick={clearOrders} style={{ fontSize: 9, color: "#ef4444", padding: "4px 10px", borderRadius: 4, border: "1px solid #ef444440", background: "rgba(239,68,68,0.08)", cursor: "pointer" }}>
              CLEAR ALL
            </button>
          )}
        </div>
      </div>

      <div style={{ padding: "24px 32px", maxWidth: 1200, margin: "0 auto" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 28 }}>
          {[
            { label: "TOTAL ORDERS", val: stats.total, color: "#c9a96e" },
            { label: "HIGH RISK", val: stats.high, color: "#ef4444" },
            { label: "MEDIUM RISK", val: stats.medium, color: "#f59e0b" },
            { label: "LOW RISK", val: stats.low, color: "#10b981" },
          ].map(s => (
            <div key={s.label} style={{ background: "#0c0c0c", border: "1px solid #1a1a1a", borderRadius: 12, padding: "16px 20px" }}>
              <div style={{ fontSize: 8, color: "#555", letterSpacing: 2, marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: s.color }}>{s.val}</div>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div style={{ background: "#0c0c0c", border: "1px solid #1a1a1a", borderRadius: 16, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #161616", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: 2 }}>TRANSACTION LOG</div>
            <div style={{ fontSize: 9, color: "#444" }}>{orders.length} RECORDS</div>
          </div>

          {orders.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>⬡</div>
              <div style={{ fontSize: 12, color: "#444" }}>No orders yet. Place an order from the store first.</div>
              <div style={{ fontSize: 10, color: "#333", marginTop: 6 }}>Orders will appear here for fraud analysis.</div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid #161616" }}>
                    {["ORDER ID", "CUSTOMER", "CITY", "PAYMENT", "AMOUNT", "ITEMS", "FRAUD SCORE", "RISK", "ACTION"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontSize: 8, color: "#555", letterSpacing: 2, fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, i) => {
                    const { score } = computeFraudSignals(order);
                    const risk = getRiskLevel(score);
                    return (
                      <tr key={order.id || i} style={{ borderBottom: "1px solid #111", transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#111"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                        <td style={{ padding: "12px 16px", fontSize: 11, color: "#c9a96e" }}>#{(order.id?.toString() || "000000").slice(-6).toUpperCase()}</td>
                        <td style={{ padding: "12px 16px", fontSize: 11, color: "#e5e1da" }}>{order.firstName} {order.lastName}</td>
                        <td style={{ padding: "12px 16px", fontSize: 11, color: "#888" }}>{order.city}</td>
                        <td style={{ padding: "12px 16px", fontSize: 11, color: "#888" }}>{order.payment}</td>
                        <td style={{ padding: "12px 16px", fontSize: 11, color: "#e5e1da", fontWeight: 600 }}>Rs. {order.totalAmount?.toLocaleString()}</td>
                        <td style={{ padding: "12px 16px", fontSize: 11, color: "#888" }}>{order.items?.length || 0}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <div style={{ height: 4, width: 60, background: "#1a1a1a", borderRadius: 2, overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${score}%`, background: risk.color, borderRadius: 2 }} />
                            </div>
                            <span style={{ fontSize: 11, color: risk.color, fontWeight: 700 }}>{score}</span>
                          </div>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <span style={{ fontSize: 9, padding: "3px 8px", borderRadius: 4, background: risk.bg, color: risk.color, border: `1px solid ${risk.border}40`, fontWeight: 700, letterSpacing: 1 }}>
                            {risk.label.split(" ")[0]}
                          </span>
                        </td>
                        <td style={{ padding: "12px 16px" }}>
                          <button onClick={() => setSelectedOrder(order)}
                            style={{ fontSize: 9, padding: "5px 12px", borderRadius: 6, background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e", cursor: "pointer", fontFamily: "monospace", letterSpacing: 1 }}>
                            ANALYSE →
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Legend */}
        <div style={{ marginTop: 20, padding: "14px 20px", background: "#0c0c0c", border: "1px solid #161616", borderRadius: 12, display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ fontSize: 9, color: "#444", letterSpacing: 2, alignSelf: "center" }}>MODEL INFO</div>
          {[
            { color: "#c9a96e", label: "GNN — Graph Neural Network signals (relational patterns)" },
            { color: "#a78bfa", label: "RULE — Symbolic rule engine (domain knowledge)" },
          ].map(l => (
            <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
              <span style={{ fontSize: 10, color: "#555" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedOrder && <OrderModal order={selectedOrder} onClose={() => setSelectedOrder(null)} />}
    </div>
  );
}
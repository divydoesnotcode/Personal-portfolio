"use client";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Activity, Cpu, Sliders } from "lucide-react";

// Static word embedding vectors (dim=4) for common presets
const WORD_VECTORS = {
  deep: [0.85, -0.12, 0.43, 0.18],
  learning: [0.72, 0.91, -0.25, 0.31],
  transforms: [0.65, -0.42, 0.88, 0.12],
  full: [0.28, 0.35, 0.74, -0.32],
  stack: [-0.15, 0.78, 0.22, 0.45],
  development: [-0.41, 0.82, -0.18, 0.62],
  self: [0.55, 0.48, -0.31, 0.24],
  attention: [-0.18, 0.95, 0.28, 0.15],
  builds: [0.76, -0.21, 0.52, 0.18],
  context: [-0.22, 0.85, 0.34, 0.48],
  in: [0.08, 0.12, 0.15, 0.88],
  transformers: [-0.35, 0.92, -0.15, 0.54],
  ai: [0.25, 0.88, -0.42, 0.32],
  engineering: [-0.18, 0.84, 0.38, 0.51],
  requires: [0.68, -0.15, 0.44, 0.21],
  rigorous: [0.35, 0.41, 0.78, -0.25],
  software: [-0.12, 0.81, 0.25, 0.48],
  principles: [-0.28, 0.74, -0.12, 0.65],
};

// Static Query and Key Weight Matrices (dim=4x4)
const W_Q = [
  [0.8, 0.1, -0.2, 0.1],
  [-0.1, 0.7, 0.3, -0.1],
  [0.2, -0.2, 0.9, 0.2],
  [0.1, 0.3, -0.1, 0.8]
];

const W_K = [
  [0.7, -0.1, 0.2, -0.1],
  [0.2, 0.8, -0.1, 0.3],
  [-0.3, 0.1, 0.7, 0.2],
  [0.1, -0.2, 0.2, 0.9]
];

// Helper functions for linear algebra and self-attention
function getWordVector(word) {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (WORD_VECTORS[clean]) return WORD_VECTORS[clean];
  
  // Deterministic vector generation based on character hash (fallback)
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = clean.charCodeAt(i) + ((hash << 5) - hash);
  }
  const v = [];
  for (let i = 0; i < 4; i++) {
    const val = Math.sin(hash + i * 1.5) * 0.75 + 0.25; // range [-0.5, 1.0]
    v.push(parseFloat(val.toFixed(3)));
  }
  return v;
}

function matMul(vector, matrix) {
  const result = [];
  for (let col = 0; col < matrix[0].length; col++) {
    let sum = 0;
    for (let row = 0; row < vector.length; row++) {
      sum += vector[row] * matrix[row][col];
    }
    result.push(sum);
  }
  return result;
}

function dotProduct(v1, v2) {
  return v1.reduce((sum, val, idx) => sum + val * v2[idx], 0);
}

function softmax(arr) {
  const max = Math.max(...arr);
  const exps = arr.map(x => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(x => parseFloat((x / sum).toFixed(4)));
}

const PRESETS = [
  "Deep learning transforms full stack development",
  "Self attention builds context in transformers",
  "AI engineering requires rigorous software principles"
];

export function AttentionSandbox() {
  const [inputText, setInputText] = useState(PRESETS[0]);
  const [activeView, setActiveView] = useState("bipartite"); // "bipartite" or "matrix"
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState(null);
  const [lockedTokenIndex, setLockedTokenIndex] = useState(null);
  const [hoveredCell, setHoveredCell] = useState(null); // { r, c }
  
  const containerRef = useRef(null);

  // 1. Tokenize sentence
  const tokens = useMemo(() => {
    return inputText.split(/\s+/).filter(t => t.trim().length > 0);
  }, [inputText]);

  // 2. Perform Real-time Self-Attention computation
  const { attentionMatrix, qVectors, kVectors } = useMemo(() => {
    const d_k = 4; // Dimension
    const scale = Math.sqrt(d_k);
    
    // a. Get raw embeddings
    const embeddings = tokens.map(token => getWordVector(token));
    
    // b. Project to Queries (Q) and Keys (K)
    const Q = embeddings.map(emb => matMul(emb, W_Q));
    const K = embeddings.map(emb => matMul(emb, W_K));
    
    // c. Compute raw attention scores and apply softmax
    const scores = [];
    for (let i = 0; i < tokens.length; i++) {
      const q = Q[i];
      const iScores = [];
      for (let j = 0; j < tokens.length; j++) {
        const k = K[j];
        // Score = (Q_i * K_j) / sqrt(d_k)
        iScores.push(dotProduct(q, k) / scale);
      }
      scores.push(softmax(iScores));
    }

    return {
      attentionMatrix: scores,
      qVectors: Q,
      kVectors: K
    };
  }, [tokens]);

  const activeFocusIdx = hoveredTokenIndex !== null ? hoveredTokenIndex : lockedTokenIndex;

  return (
    <section id="attention-sandbox" ref={containerRef} className="as-section" aria-label="Interactive Attention Sandbox">
      <div className="as-container">
        
        {/* Section Header */}
        <div className="as-header">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="as-eyebrow"
          >
            <Sparkles size={12} className="inline mr-2 text-[var(--accent)]" />
            AI &amp; Machine Learning Playground
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="as-heading"
          >
            Transformer <br className="hidden md:block" /> Attention Sandbox.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="as-desc"
          >
            Self-attention allows transformers to weight relationships between all tokens dynamically.
            This playground tokenizes input, generates vectors, projects Queries &amp; Keys, and computes the mathematically realistic self-attention matrix in your browser.
          </motion.p>
        </div>

        {/* Input Control Console */}
        <div className="as-console">
          <div className="console-input-row">
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setLockedTokenIndex(null);
                setHoveredTokenIndex(null);
              }}
              placeholder="Type a custom sentence..."
              maxLength={64}
              className="console-input"
              aria-label="Sentence to tokenize"
            />
            <div className="console-presets">
              {PRESETS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setInputText(p);
                    setLockedTokenIndex(null);
                    setHoveredTokenIndex(null);
                  }}
                  className={`preset-btn ${inputText === p ? "preset-btn--active" : ""}`}
                >
                  Preset {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Sandbox Display */}
        <div className="as-grid">
          
          {/* Main Visualizer Area */}
          <div className="as-visualizer-panel">
            {/* View Toggler Tabs */}
            <div className="as-tabs">
              <button
                onClick={() => setActiveView("bipartite")}
                className={`as-tab ${activeView === "bipartite" ? "as-tab--active" : ""}`}
              >
                <Activity size={14} className="inline mr-1.5" />
                Attention Map
              </button>
              <button
                onClick={() => setActiveView("matrix")}
                className={`as-tab ${activeView === "matrix" ? "as-tab--active" : ""}`}
              >
                <Cpu size={14} className="inline mr-1.5" />
                Attention Matrix
              </button>
            </div>

            {/* Bipartite Connection Graph */}
            {activeView === "bipartite" && (
              <div className="bipartite-container">
                <div className="bipartite-side">
                  <span className="side-label">Source Tokens (Queries)</span>
                  <div className="tokens-col">
                    {tokens.map((token, i) => (
                      <button
                        key={`src-${i}-${token}`}
                        className={`token-chip ${activeFocusIdx === i ? "token-chip--focus" : ""}`}
                        onMouseEnter={() => setHoveredTokenIndex(i)}
                        onMouseLeave={() => setHoveredTokenIndex(null)}
                        onClick={() => setLockedTokenIndex(lockedTokenIndex === i ? null : i)}
                      >
                        {token}
                        {activeFocusIdx === i && <span className="token-indicator token-indicator--q">Q</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive Connections Map */}
                <div className="bipartite-wires">
                  <svg className="wires-svg" viewBox="0 0 200 400" preserveAspectRatio="none">
                    {tokens.map((_, i) =>
                      tokens.map((_, j) => {
                        const weight = attentionMatrix[i]?.[j] || 0;
                        const isFocus = activeFocusIdx === i;
                        const opacity = isFocus ? Math.min(1.0, weight * 2.2) : Math.min(0.06, weight * 0.2);
                        const strokeWidth = isFocus ? 1 + weight * 5 : 0.5;
                        const strokeColor = isFocus ? "var(--accent)" : "var(--fg-muted)";

                        return (
                          <motion.path
                            key={`wire-${i}-${j}`}
                            d={`M 10,${(i + 0.5) * (400 / tokens.length)} C 100,${(i + 0.5) * (400 / tokens.length)} 100,${(j + 0.5) * (400 / tokens.length)} 190,${(j + 0.5) * (400 / tokens.length)}`}
                            fill="none"
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                            style={{ opacity }}
                            transition={{ duration: 0.3 }}
                          />
                        );
                      })
                    )}
                  </svg>
                </div>

                <div className="bipartite-side">
                  <span className="side-label">Context Tokens (Keys)</span>
                  <div className="tokens-col">
                    {tokens.map((token, j) => {
                      let activeWeight = 0;
                      if (activeFocusIdx !== null) {
                        activeWeight = attentionMatrix[activeFocusIdx]?.[j] || 0;
                      }
                      return (
                        <div
                          key={`dst-${j}-${token}`}
                          className="token-target-row"
                        >
                          <span className="token-chip token-chip--static">
                            {token}
                            {activeFocusIdx !== null && activeWeight > 0.05 && (
                              <span className="token-weight-tag">{(activeWeight * 100).toFixed(0)}%</span>
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Heatmap Attention Matrix Grid */}
            {activeView === "matrix" && (
              <div className="matrix-container">
                <div className="matrix-scroll">
                  <div
                    className="matrix-grid"
                    style={{
                      gridTemplateColumns: `repeat(${tokens.length}, minmax(40px, 1fr))`
                    }}
                  >
                    {attentionMatrix.map((row, r) =>
                      row.map((weight, c) => {
                        const isHovered = hoveredCell && hoveredCell.r === r && hoveredCell.c === c;
                        const isRowFocus = activeFocusIdx === r;
                        const bgOpacity = weight; // Direct mapping to opacity

                        return (
                          <div
                            key={`cell-${r}-${c}`}
                            className={`matrix-cell ${isHovered ? "matrix-cell--hovered" : ""} ${isRowFocus ? "matrix-cell--rowfocus" : ""}`}
                            style={{
                              backgroundColor: `rgba(217, 119, 6, ${bgOpacity})`,
                              border: `1px solid var(--border)`
                            }}
                            onMouseEnter={() => {
                              setHoveredCell({ r, c });
                              setHoveredTokenIndex(r);
                            }}
                            onMouseLeave={() => {
                              setHoveredCell(null);
                              setHoveredTokenIndex(null);
                            }}
                          >
                            <span className="cell-value">{weight > 0.05 ? weight.toFixed(2) : ""}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Heatmap Labels */}
                <div className="matrix-labels-hint">
                  <div className="flex justify-between items-center text-[10px] text-[var(--fg-muted)] tracking-wider mt-4">
                    <span>Rows: Queries (Q)</span>
                    <span>Columns: Keys (K)</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Theoretical Breakdown Panel */}
          <div className="as-explanation-panel">
            <div className="exp-card">
              <div className="exp-card-header">
                <Sliders size={14} className="text-[var(--accent)]" />
                <h3 className="exp-card-title">Mathematical Inspector</h3>
              </div>
              <div className="exp-divider" />
              
              <div className="exp-formula">
                {"$$\\text{Attention}(Q, K) = \\text{softmax}\\left(\\frac{Q K^T}{\\sqrt{d_k}}\\right)$$"}
              </div>

              <div className="exp-divider" />

              <div className="exp-inspector-content">
                {activeFocusIdx !== null ? (
                  <div className="space-y-4">
                    <div>
                      <span className="block text-[10px] text-[var(--fg-muted)] uppercase tracking-wider mb-1">Active Query Token</span>
                      <span className="font-display font-semibold text-lg text-[var(--fg)]">"{tokens[activeFocusIdx]}"</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[var(--fg-muted)] uppercase tracking-wider mb-1.5">Query Projection (Q)</span>
                      <div className="flex gap-2">
                        {qVectors[activeFocusIdx]?.map((val, idx) => (
                          <span key={idx} className="val-pill">{val.toFixed(2)}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="block text-[10px] text-[var(--fg-muted)] uppercase tracking-wider mb-1.5">Attention Distributions</span>
                      <div className="space-y-2">
                        {tokens.map((token, j) => {
                          const w = attentionMatrix[activeFocusIdx]?.[j] || 0;
                          return (
                            <div key={`dist-inspector-${j}`} className="flex justify-between items-center text-xs">
                              <span className="text-[var(--fg-muted)]">{token}</span>
                              <div className="flex items-center gap-2">
                                <div className="h-1.5 w-16 bg-stone-900/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-[var(--accent)]" style={{ width: `${w * 100}%` }} />
                                </div>
                                <span className="font-mono text-[10px] font-semibold text-[var(--accent)]">{(w * 100).toFixed(0)}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-xs text-[var(--fg-muted)] leading-relaxed">
                      Hover or tap a source token to inspect its projected Query vector, key similarity calculations, and softmax probability distributions.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .as-section {
          padding: clamp(64px,8vw,96px) clamp(16px,5vw,48px);
          max-width: 72rem;
          margin: 0 auto;
        }

        .as-container {
          width: 100%;
        }

        .as-header {
          margin-bottom: clamp(36px,5vw,56px);
        }

        .as-eyebrow {
          color: var(--accent);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          font-family: var(--font-body);
          margin-bottom: 14px;
          display: flex;
          align-items: center;
        }

        .as-heading {
          font-family: var(--font-display);
          font-size: clamp(2.4rem,6vw,5rem);
          font-weight: 800;
          color: var(--fg);
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin: 0;
        }

        .as-desc {
          font-family: var(--font-body);
          font-size: clamp(13px,1.1vw,15.5px);
          color: var(--fg-muted);
          line-height: 1.7;
          max-width: 38rem;
          margin: 16px 0 0;
        }

        .as-console {
          margin-bottom: clamp(28px, 4vw, 44px);
        }

        .console-input-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (min-width: 768px) {
          .console-input-row {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
          }
        }

        .console-input {
          font-family: var(--font-body);
          font-size: 14px;
          color: var(--fg);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 10px 16px;
          flex: 1;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .console-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px var(--accent-muted);
        }

        .console-presets {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .preset-btn {
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--fg-muted);
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .preset-btn:hover {
          border-color: var(--border-strong);
          color: var(--fg);
        }
        .preset-btn--active {
          background: var(--accent-muted);
          border-color: var(--accent);
          color: var(--accent);
        }

        .as-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(20px, 3vw, 36px);
        }
        @media (min-width: 960px) {
          .as-grid {
            grid-template-columns: 1.8fr 1fr;
          }
        }

        .as-visualizer-panel {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: clamp(16px, 2.5vw, 28px);
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .as-tabs {
          display: flex;
          gap: 8px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 12px;
          margin-bottom: 24px;
        }

        .as-tab {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--fg-muted);
          background: transparent;
          border: none;
          padding: 6px 12px;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.22s ease;
          display: inline-flex;
          align-items: center;
        }
        .as-tab:hover {
          color: var(--fg);
          background: var(--surface);
        }
        .as-tab--active {
          color: var(--accent);
          background: var(--accent-muted);
        }

        /* Bipartite View styles */
        .bipartite-container {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr 1.2fr;
          align-items: center;
          flex: 1;
        }

        .bipartite-side {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .side-label {
          font-family: var(--font-body);
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--fg-muted);
          opacity: 0.6;
          margin-bottom: 4px;
          text-align: center;
        }

        .tokens-col {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .token-chip {
          font-family: var(--font-body);
          font-size: clamp(10px, 1.1vw, 13px);
          font-weight: 500;
          color: var(--fg-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 8px 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
        }
        .token-chip:hover {
          color: var(--fg);
          border-color: var(--border-strong);
        }
        .token-chip--focus {
          border-color: var(--accent);
          color: var(--accent);
          box-shadow: 0 4px 12px var(--accent-muted);
          background: var(--bg-card);
        }
        .token-chip--static {
          cursor: default;
        }
        .token-chip--static:hover {
          color: var(--fg-muted);
          border-color: var(--border);
        }

        .token-indicator {
          font-size: 8px;
          font-weight: 700;
          border-radius: 4px;
          padding: 1px 4px;
          color: var(--bg);
        }
        .token-indicator--q {
          background: var(--accent);
        }

        .token-weight-tag {
          font-size: 9px;
          font-weight: 600;
          color: var(--accent);
          background: var(--accent-muted);
          border-radius: 4px;
          padding: 1px 4px;
        }

        .bipartite-wires {
          height: 100%;
          min-height: 280px;
          position: relative;
        }

        .wires-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* Matrix Heatmap View styles */
        .matrix-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .matrix-scroll {
          overflow-x: auto;
          padding-bottom: 8px;
          border-radius: 12px;
        }

        .matrix-grid {
          display: grid;
          gap: 4px;
          min-width: 240px;
          aspect-ratio: 1.2;
        }

        .matrix-cell {
          aspect-ratio: 1;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: crosshair;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .matrix-cell:hover {
          transform: scale(1.08);
          z-index: 10;
          border-color: var(--accent) !important;
        }
        .matrix-cell--rowfocus {
          border-color: rgba(217, 119, 6, 0.4) !important;
        }

        .cell-value {
          font-size: 10px;
          font-family: var(--font-body);
          font-weight: 700;
          color: var(--fg);
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          user-select: none;
        }

        /* Explanation Panel styles */
        .as-explanation-panel {
          height: 100%;
        }

        .exp-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 24px;
          padding: 24px;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .exp-card-header {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .exp-card-title {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--fg);
          margin: 0;
        }

        .exp-divider {
          height: 1px;
          background: var(--border);
          margin: 16px 0;
        }

        .exp-formula {
          font-family: var(--font-body);
          font-size: clamp(12px, 1.2vw, 15px);
          color: var(--accent);
          text-align: center;
          padding: 12px;
          background: var(--bg);
          border-radius: 12px;
          border: 1px solid var(--border);
          user-select: none;
        }

        .exp-inspector-content {
          flex: 1;
        }

        .val-pill {
          font-size: 11px;
          font-weight: 600;
          font-family: var(--font-body);
          color: var(--fg-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 4px 8px;
        }
      `}</style>
    </section>
  );
}

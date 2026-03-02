import { interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansKR";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "600"],
});

interface ExcelCell {
  value: string;
  highlight?: boolean;
}

interface FakeExcelProps {
  headers: string[];
  rows: ExcelCell[][];
  title?: string;
  startFrame?: number;
  rowRevealInterval?: number;
}

export const FakeExcel: React.FC<FakeExcelProps> = ({
  headers,
  rows,
  title = "sales_data.xlsx",
  startFrame = 0,
  rowRevealInterval = 12,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const containerOpacity = interpolate(relativeFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#ffffff",
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        fontFamily,
        boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.06)",
        border: "1px solid #e2e8f0",
        opacity: containerOpacity,
      }}
    >
      {/* Title Bar */}
      <div
        style={{
          height: 44,
          background: "linear-gradient(135deg, #16a34a, #15803d)",
          display: "flex",
          alignItems: "center",
          paddingLeft: 18,
          color: "#ffffff",
          fontSize: 14,
          fontWeight: 600,
          gap: 10,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <rect x="1" y="1" width="16" height="16" rx="2" stroke="white" strokeWidth="1.5"/>
          <line x1="6" y1="1" x2="6" y2="17" stroke="white" strokeWidth="1"/>
          <line x1="1" y1="6" x2="17" y2="6" stroke="white" strokeWidth="1"/>
          <line x1="1" y1="11" x2="17" y2="11" stroke="white" strokeWidth="1"/>
        </svg>
        {title}
      </div>

      {/* Ribbon */}
      <div
        style={{
          height: 36,
          backgroundColor: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          display: "flex",
          alignItems: "center",
          paddingLeft: 16,
          gap: 20,
          fontSize: 13,
          color: "#64748b",
        }}
      >
        <span style={{ color: "#16a34a", fontWeight: 600 }}>Home</span>
        <span>Insert</span>
        <span>Data</span>
        <span>Formulas</span>
      </div>

      {/* Spreadsheet */}
      <div style={{ flex: 1, overflow: "hidden", padding: 0 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  width: 40,
                  backgroundColor: "#f1f5f9",
                  border: "1px solid #e2e8f0",
                  padding: "8px 4px",
                  color: "#94a3b8",
                  fontSize: 12,
                }}
              />
              {headers.map((h, i) => (
                <th
                  key={i}
                  style={{
                    backgroundColor: "#f1f5f9",
                    border: "1px solid #e2e8f0",
                    padding: "8px 14px",
                    fontWeight: 600,
                    color: "#1e293b",
                    textAlign: "left",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              const rowFrame = startFrame + 25 + rowIdx * rowRevealInterval;
              const rowOpacity = interpolate(
                frame,
                [rowFrame, rowFrame + 8],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );

              return (
                <tr key={rowIdx} style={{ opacity: rowOpacity }}>
                  <td
                    style={{
                      backgroundColor: "#f1f5f9",
                      border: "1px solid #e2e8f0",
                      padding: "8px 4px",
                      textAlign: "center",
                      color: "#94a3b8",
                      fontSize: 12,
                    }}
                  >
                    {rowIdx + 1}
                  </td>
                  {row.map((cell, colIdx) => (
                    <td
                      key={colIdx}
                      style={{
                        border: "1px solid #e2e8f0",
                        padding: "8px 14px",
                        backgroundColor: cell.highlight
                          ? "#dcfce7"
                          : "#ffffff",
                        color: "#334155",
                      }}
                    >
                      {cell.value}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

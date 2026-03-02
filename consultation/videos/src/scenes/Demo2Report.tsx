import { AbsoluteFill, Sequence } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { FakeTerminal } from "../components/FakeTerminal";
import { FakeExcel } from "../components/FakeExcel";

export const Demo2Report: React.FC = () => {
  const sampleRows = [
    [{ value: "Laptop Pro" }, { value: "Electronics" }, { value: "1,250" }, { value: "$1,599" }, { value: "$1,998,750" }],
    [{ value: "Wireless Mouse" }, { value: "Accessories" }, { value: "3,400" }, { value: "$29" }, { value: "$98,600" }],
    [{ value: "Monitor 27'" }, { value: "Electronics" }, { value: "890" }, { value: "$449" }, { value: "$399,610" }],
    [{ value: "Keyboard MX" }, { value: "Accessories" }, { value: "2,100" }, { value: "$99" }, { value: "$207,900" }],
    [{ value: "USB Hub" }, { value: "Accessories" }, { value: "4,200" }, { value: "$35" }, { value: "$147,000", highlight: true }],
  ];

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)" }}>
      {/* Title */}
      <Sequence durationInFrames={90}>
        <SceneTitle
          badge="DEMO 2"
          title="Sales Report Automation"
          subtitle="Excel analysis + Chart + Word report in 1 minute"
        />
      </Sequence>

      {/* Split: Terminal + Excel */}
      <Sequence from={90} durationInFrames={1260}>
        <AbsoluteFill
          style={{
            padding: 60,
            display: "flex",
            flexDirection: "row",
            gap: 30,
          }}
        >
          {/* Left: Terminal */}
          <div style={{ flex: 1, height: "100%" }}>
            <FakeTerminal
              title="Claude Code - Report Demo"
              lines={[
                { type: "command", text: "claude", delay: 0 },
                {
                  type: "output",
                  text: '> "Analyze sales_data.xlsx and create a weekly report"',
                  delay: 15,
                },
                { type: "output", text: "[Agent] Reading Excel file...", delay: 20 },
                { type: "output", text: "[Agent] Analyzing 15 products...", delay: 30 },
                { type: "output", text: "[Agent] Generating bar chart...", delay: 25 },
                { type: "output", text: "[Agent] Creating Word document...", delay: 25 },
                { type: "output", text: "[Agent] Report saved: weekly_sales_report.docx", delay: 20 },
              ]}
              typingSpeed={2}
            />
          </div>

          {/* Right: Excel */}
          <div style={{ flex: 1, height: "100%" }}>
            <FakeExcel
              title="sales_data.xlsx"
              headers={["Product", "Category", "Qty", "Price", "Total"]}
              rows={sampleRows}
              startFrame={30}
              rowRevealInterval={10}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

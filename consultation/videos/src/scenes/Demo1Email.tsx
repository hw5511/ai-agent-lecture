import { AbsoluteFill, Sequence } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { FakeTerminal } from "../components/FakeTerminal";

export const Demo1Email: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)" }}>
      {/* Title Scene */}
      <Sequence durationInFrames={90}>
        <SceneTitle
          badge="DEMO 1"
          title="Email Automation"
          subtitle="ChatGPT is draft-only. Agent sends it directly."
        />
      </Sequence>

      {/* Terminal Scene */}
      <Sequence from={90} durationInFrames={810}>
        <AbsoluteFill
          style={{
            padding: 80,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div style={{ width: "85%", height: "75%" }}>
            <FakeTerminal
              title="Claude Code - Email Demo"
              lines={[
                { type: "command", text: "claude", delay: 0 },
                {
                  type: "output",
                  text: '> "Send an email to team@company.com about the weekly report"',
                  delay: 15,
                },
                { type: "output", text: "", delay: 5 },
                {
                  type: "output",
                  text: "[Agent] Composing email...",
                  delay: 10,
                },
                {
                  type: "output",
                  text: "[Agent] Opening Gmail...",
                  delay: 20,
                },
                {
                  type: "output",
                  text: "[Agent] Filling recipient: team@company.com",
                  delay: 15,
                },
                {
                  type: "output",
                  text: "[Agent] Writing subject & body...",
                  delay: 15,
                },
                {
                  type: "output",
                  text: "[Agent] Email sent successfully!",
                  delay: 20,
                },
              ]}
              typingSpeed={2}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

import { AbsoluteFill, Sequence } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { FakeTerminal } from "../components/FakeTerminal";

export const Demo3Review: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)" }}>
      <Sequence durationInFrames={90}>
        <SceneTitle
          badge="DEMO 3"
          title="Review Sentiment Analysis"
          subtitle="Auto-classify 50 customer reviews (positive/negative/mixed)"
        />
      </Sequence>

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
              title="Claude Code - Review Classification"
              lines={[
                { type: "command", text: "claude", delay: 0 },
                {
                  type: "output",
                  text: '> "Read reviews.xlsx and classify each review sentiment"',
                  delay: 15,
                },
                { type: "output", text: "[Agent] Reading 50 reviews...", delay: 20 },
                { type: "output", text: "[Agent] Classifying row 1: Positive", delay: 15 },
                { type: "output", text: "[Agent] Classifying row 2: Negative", delay: 8 },
                { type: "output", text: "[Agent] Classifying row 3: Mixed", delay: 8 },
                { type: "output", text: "[Agent] ...processing 47 more rows...", delay: 15 },
                { type: "output", text: "[Agent] Classification complete!", delay: 20 },
                { type: "output", text: "[Agent] Saved: reviews_classified.xlsx", delay: 10 },
                { type: "output", text: "  Positive: 28 | Negative: 15 | Mixed: 7", delay: 10 },
              ]}
              typingSpeed={2}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

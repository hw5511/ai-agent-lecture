import { AbsoluteFill, Sequence } from "remotion";
import { SceneTitle } from "../components/SceneTitle";
import { FakeTerminal } from "../components/FakeTerminal";

export const Demo4Video: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)" }}>
      <Sequence durationInFrames={90}>
        <SceneTitle
          badge="DEMO 4"
          title="AI Video + Website"
          subtitle="Text to Veo3 video to HTML website - fully automated"
        />
      </Sequence>

      <Sequence from={90} durationInFrames={1260}>
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
              title="Claude Code - Video + Web Demo"
              lines={[
                { type: "command", text: "claude", delay: 0 },
                {
                  type: "output",
                  text: '> "Create a promotional video and embed it in a website"',
                  delay: 15,
                },
                { type: "output", text: "[Agent] Generating video with Veo3...", delay: 20 },
                { type: "output", text: "[Agent] Prompt: cinematic product showcase...", delay: 15 },
                { type: "output", text: "[Agent] Video generated (8s, 1080p)", delay: 30 },
                { type: "output", text: "[Agent] Processing with FFmpeg...", delay: 20 },
                { type: "output", text: "[Agent] Building HTML website...", delay: 20 },
                { type: "output", text: "[Agent] Embedding video player...", delay: 15 },
                { type: "output", text: "[Agent] Website saved: site.html", delay: 15 },
                { type: "output", text: "[Agent] Opening in browser...", delay: 10 },
              ]}
              typingSpeed={2}
            />
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};

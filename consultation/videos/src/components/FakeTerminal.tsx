import { interpolate, useCurrentFrame } from "remotion";
import { loadFont } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily } = loadFont("normal", {
  weights: ["400"],
});

const terminalStyles: Record<string, React.CSSProperties> = {
  container: {
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
  },
  titleBar: {
    height: 44,
    backgroundColor: "#f8fafc",
    display: "flex",
    alignItems: "center",
    paddingLeft: 18,
    gap: 8,
    borderBottom: "1px solid #e2e8f0",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: "50%",
  },
  titleText: {
    color: "#94a3b8",
    fontSize: 13,
    marginLeft: 12,
    fontWeight: 500,
  },
  body: {
    flex: 1,
    padding: 24,
    fontSize: 15,
    lineHeight: 1.8,
    color: "#334155",
    overflow: "hidden",
    backgroundColor: "#fafbfc",
  },
  prompt: {
    color: "#6366f1",
    fontWeight: 600,
  },
  cursor: {
    display: "inline-block",
    width: 8,
    height: 18,
    backgroundColor: "#6366f1",
    verticalAlign: "text-bottom",
    marginLeft: 2,
    borderRadius: 1,
  },
};

interface TerminalLine {
  type: "prompt" | "output" | "command";
  text: string;
  delay?: number;
}

interface FakeTerminalProps {
  lines: TerminalLine[];
  typingSpeed?: number;
  startFrame?: number;
  title?: string;
}

export const FakeTerminal: React.FC<FakeTerminalProps> = ({
  lines,
  typingSpeed = 2,
  startFrame = 0,
  title = "Terminal",
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  let currentCharFrame = 0;
  const renderedLines: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineStartFrame = currentCharFrame + (line.delay || 0);

    if (line.type === "command") {
      const charsToShow = Math.floor(
        Math.max(0, relativeFrame - lineStartFrame) / typingSpeed
      );
      const visibleText = line.text.substring(0, charsToShow);
      const isTyping = charsToShow < line.text.length && charsToShow >= 0;

      if (relativeFrame >= lineStartFrame) {
        renderedLines.push(
          <div key={i} style={{ marginBottom: 4 }}>
            <span style={terminalStyles.prompt}>$ </span>
            <span>{visibleText}</span>
            {isTyping && (
              <span
                style={{
                  ...terminalStyles.cursor,
                  opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0,
                }}
              />
            )}
          </div>
        );
      }
      currentCharFrame = lineStartFrame + line.text.length * typingSpeed;
    } else if (line.type === "output") {
      if (relativeFrame >= lineStartFrame) {
        const opacity = interpolate(
          relativeFrame,
          [lineStartFrame, lineStartFrame + 8],
          [0, 1],
          { extrapolateRight: "clamp" }
        );
        renderedLines.push(
          <div key={i} style={{ opacity, color: "#059669", marginBottom: 2 }}>
            {line.text}
          </div>
        );
      }
      currentCharFrame = lineStartFrame + 8;
    } else {
      if (relativeFrame >= lineStartFrame) {
        renderedLines.push(
          <div key={i}>
            <span style={terminalStyles.prompt}>$ </span>
          </div>
        );
      }
      currentCharFrame = lineStartFrame;
    }
  }

  return (
    <div style={terminalStyles.container}>
      <div style={terminalStyles.titleBar}>
        <div style={{ ...terminalStyles.dot, backgroundColor: "#f87171" }} />
        <div style={{ ...terminalStyles.dot, backgroundColor: "#fbbf24" }} />
        <div style={{ ...terminalStyles.dot, backgroundColor: "#34d399" }} />
        <span style={terminalStyles.titleText}>{title}</span>
      </div>
      <div style={terminalStyles.body}>{renderedLines}</div>
    </div>
  );
};

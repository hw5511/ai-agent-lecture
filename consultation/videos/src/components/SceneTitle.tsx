import { interpolate, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansKR";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "800"],
});

interface SceneTitleProps {
  title: string;
  subtitle?: string;
  badge?: string;
  startFrame?: number;
}

export const SceneTitle: React.FC<SceneTitleProps> = ({
  title,
  subtitle,
  badge,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const titleSpring = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const subtitleOpacity = interpolate(relativeFrame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const badgeOpacity = interpolate(relativeFrame, [5, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)",
        fontFamily,
        gap: 20,
      }}
    >
      {badge && (
        <div
          style={{
            opacity: badgeOpacity,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            padding: "8px 24px",
            borderRadius: 24,
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 2,
            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
          }}
        >
          {badge}
        </div>
      )}
      <h1
        style={{
          color: "#1e293b",
          fontSize: 68,
          fontWeight: 800,
          margin: 0,
          transform: `translateY(${interpolate(titleSpring, [0, 1], [40, 0])}px)`,
          opacity: titleSpring,
          textShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          style={{
            color: "#64748b",
            fontSize: 28,
            margin: 0,
            opacity: subtitleOpacity,
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

import { AbsoluteFill, Sequence } from "remotion";
import { Demo1Email } from "./Demo1Email";
import { Demo2Report } from "./Demo2Report";
import { Demo3Review } from "./Demo3Review";
import { Demo4Video } from "./Demo4Video";

const FPS = 60;

export const FullDemo: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence durationInFrames={FPS * 30}>
        <Demo1Email />
      </Sequence>
      <Sequence from={FPS * 30} durationInFrames={FPS * 45}>
        <Demo2Report />
      </Sequence>
      <Sequence from={FPS * 75} durationInFrames={FPS * 30}>
        <Demo3Review />
      </Sequence>
      <Sequence from={FPS * 105} durationInFrames={FPS * 45}>
        <Demo4Video />
      </Sequence>
    </AbsoluteFill>
  );
};

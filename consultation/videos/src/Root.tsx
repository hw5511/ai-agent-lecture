import { Composition } from "remotion";
import { Demo1Email } from "./scenes/Demo1Email";
import { Demo2Report } from "./scenes/Demo2Report";
import { Demo3Review } from "./scenes/Demo3Review";
import { Demo4Video } from "./scenes/Demo4Video";
import { FullDemo } from "./scenes/FullDemo";

const FPS = 60;
const WIDTH = 1920;
const HEIGHT = 1080;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Demo1Email"
        component={Demo1Email}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo2Report"
        component={Demo2Report}
        durationInFrames={FPS * 45}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo3Review"
        component={Demo3Review}
        durationInFrames={FPS * 30}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="Demo4Video"
        component={Demo4Video}
        durationInFrames={FPS * 45}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="FullDemo"
        component={FullDemo}
        durationInFrames={FPS * 180}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};

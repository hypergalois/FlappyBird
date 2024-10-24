import React, { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
} from "react-native-reanimated";

const App = () => {
  const { width, height } = useWindowDimensions();

  const backgroundImage = useImage(
    require("./assets/sprites/background-day.png")
  );

  const baseImage = useImage(require("./assets/sprites/base.png"));

  const birdImage = useImage(
    require("./assets/sprites/yellowbird-midflap.png")
  );

  const pipeBottom = useImage(
    require("./assets/sprites/pipe-green-bottom.png")
  );

  const pipeTop = useImage(require("./assets/sprites/pipe-green-top.png"));

  const pipeOffset = 0;
  const x = useSharedValue(width - 50);

  useEffect(() => {
    x.value = withRepeat(
      withSequence(
        withTiming(-104, { duration: 3000, easing: Easing.linear }),
        withTiming(width, { duration: 0 })
      ),
      -1,
      true
    );
  }, []);

  return (
    <Canvas style={{ width, height }}>
      <Image
        image={backgroundImage}
        width={width}
        height={height}
        fit={"cover"}
      />

      <Image
        image={pipeBottom}
        x={x}
        y={height - 320 + pipeOffset}
        width={104}
        height={640}
      />

      <Image
        image={pipeTop}
        x={x}
        y={pipeOffset - 320}
        width={104}
        height={640}
      />

      <Image
        image={baseImage}
        x={0}
        y={height - 112}
        width={width}
        height={132}
        fit={"cover"}
      />

      <Image
        image={birdImage}
        x={width / 3}
        y={height / 2}
        width={68}
        height={48}
      />
    </Canvas>
  );
};
export default App;

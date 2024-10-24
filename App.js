import React, { useEffect } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
  useFrameCallback,
} from "react-native-reanimated";
import { GestureHandlerRootView, GestureDetector } from "react-native-gesture-handler";

const GRAVITY = 750;

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
  const y = useSharedValue(height / 2);
  const yVelocity = useSharedValue(10);

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt) return;
    y.value += (yVelocity.value * dt) / 1000;
    yVelocity.value += (GRAVITY * dt) / 1000;
  });

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
  onPress={() => {
    yVelocity.value = -350;
  }}

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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

        <Image image={birdImage} x={width / 3} y={y} width={68} height={48} />
      </Canvas>
    </GestureHandlerRootView>
  );
};
export default App;

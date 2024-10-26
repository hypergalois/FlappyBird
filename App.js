import React, { useEffect, useState } from "react";
import { Pressable, useWindowDimensions } from "react-native";
import { Canvas, useImage, Image, Group } from "@shopify/react-native-skia";
import {
  useSharedValue,
  withTiming,
  Easing,
  withSequence,
  withRepeat,
  useFrameCallback,
  useDerivedValue,
  interpolate,
  Extrapolation,
  useAnimatedReaction,
  runOnJS,
} from "react-native-reanimated";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";

const GRAVITY = 750;
const VELOCITY = 350;

const App = () => {
  const { width, height } = useWindowDimensions();
  const [score, setScore] = useState(0);
  const [hasGameStarted, setHasGameStarted] = useState(false);

  const backgroundImage = useImage(
    require("./assets/sprites/background-day.png")
  );

  const baseImage = useImage(require("./assets/sprites/base.png"));

  const startGameImage = useImage(require("./assets/sprites/message.png"));

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

  const originBird = useDerivedValue(() => {
    return { x: width / 3 + 34, y: y.value + 24 };
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
  }, [hasGameStarted]);

  const startGame = () => {
    setHasGameStarted(true);
    setScore(0);
    y.value = height / 2;
    yVelocity.value = 10;
  };

  useAnimatedReaction(
    () => {
      return x.value;
    },
    (currentValue, previousValue = 0) => {
      const middle = width / 3 - 34;
      if (
        currentValue !== previousValue &&
        currentValue < middle &&
        previousValue > middle
      ) {
        // We need to run this in the js thread
        runOnJS(setScore)((score) => score + 1);
      }
    }
  );

  useFrameCallback(({ timeSincePreviousFrame: dt }) => {
    if (!dt) return;
    y.value += (yVelocity.value * dt) / 1000;
    yVelocity.value += (GRAVITY * dt) / 1000;
  });

  const gesture = Gesture.Tap().onStart(() => {
    yVelocity.value = -VELOCITY;
  });

  const transformBird = useDerivedValue(() => {
    return [
      {
        rotate: interpolate(
          yVelocity.value,
          [-VELOCITY, VELOCITY],
          [-0.5, 0.5],
          Extrapolation.CLAMP
        ),
      },
    ];
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ width, height }}>
          {/* Background */}
          <Image
            image={backgroundImage}
            width={width}
            height={height}
            fit={"cover"}
          />

          {hasGameStarted && (
            <>
              {/* Bottom pipe */}
              <Image
                image={pipeBottom}
                x={x}
                y={height - 320 + pipeOffset}
                width={104}
                height={640}
              />

              {/* Top pipe */}
              <Image
                image={pipeTop}
                x={x}
                y={pipeOffset - 320}
                width={104}
                height={640}
              />
            </>
          )}

          {/* Floor */}
          <Image
            image={baseImage}
            x={0}
            y={height - 112}
            width={width}
            height={132}
            fit={"cover"}
          />

          {/* Bird */}
          {hasGameStarted && (
            <Group origin={originBird} transform={transformBird}>
              <Image
                image={birdImage}
                x={width / 3}
                y={y}
                width={68}
                height={48}
              />
            </Group>
          )}

          {/* Start game */}
          {!hasGameStarted && (
            <Image
              image={startGameImage}
              x={width / 10}
              y={height / 10}
              width={width * 0.8}
              height={height * 0.8}
            />
          )}

          {/* Score */}

          {/* Game over */}
        </Canvas>
      </GestureDetector>
      {!hasGameStarted && (
        <Pressable
          onPress={startGame}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      )}
    </GestureHandlerRootView>
  );
};
export default App;

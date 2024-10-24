import React from "react";
import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

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

  return (
    <Canvas style={{ width, height }}>
      <Image
        image={backgroundImage}
        width={width}
        height={height}
        fit={"cover"}
      />

      <Image
        image={baseImage}
        x={0}
        y={height - 112}
        width={width}
        height={164}
        fit={"cover"}
      />

      <Image
        image={pipeBottom}
        x={width / 2}
        y={height - 320 + pipeOffset}
        width={104}
        height={640}
      />

      <Image
        image={pipeTop}
        x={width / 2}
        y={pipeOffset - 320}
        width={104}
        height={640}
      />

      <Image
        image={birdImage}
        x={width / 4}
        y={height / 2}
        width={68}
        height={48}
      />
    </Canvas>
  );
};
export default App;

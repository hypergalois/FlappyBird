import React from "react";
import { Canvas, useImage, Image } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

const App = () => {
  const { width, height } = useWindowDimensions();

  const backgroundImage = useImage(
    require("./assets/sprites/background-day.png")
  );
  const birdImage = useImage(
    require("./assets/sprites/yellowbird-midflap.png")
  );

  const pipeBottom = useImage(
    require("./assets/sprites/pipe-green-bottom.png")
  );

  const pipeTop = useImage(require("./assets/sprites/pipe-green-top.png"));

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
        x={width / 2}
        y={height - 320}
        width={104}
        height={640}
      />

      <Image
        image={pipeTop}
        x={width / 2 - 60}
        y={-320}
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

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

  return (
    <Canvas style={{ width, height }}>
      <Image
        image={backgroundImage}
        width={width}
        height={height}
        fit={"cover"}
      />
      <Image
        image={birdImage}
        x={width / 2}
        y={height / 2}
        width={34}
        height={24}
      />
    </Canvas>
  );
};
export default App;

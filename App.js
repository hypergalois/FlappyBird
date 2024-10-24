import React from "react";
import { Canvas } from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

const App = () => {
  const { width, height } = useWindowDimensions();

  return <Canvas style={{ width, height }}></Canvas>;
};
export default App;

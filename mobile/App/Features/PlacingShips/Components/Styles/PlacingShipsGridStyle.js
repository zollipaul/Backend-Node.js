import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  grid: {
    width: Metrics.placingShipsGridWidth,
    height: Metrics.placingShipsGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    ...ApplicationStyles.borderGrid
  },
  centered: {
    alignItems: "center"
  }
});

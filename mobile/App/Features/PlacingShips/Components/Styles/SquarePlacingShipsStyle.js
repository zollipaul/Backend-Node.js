import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";

export default StyleSheet.create({
  basic: {
    justifyContent: "center",
    alignItems: "center",
    width: Metrics.placingShipsSquareLength,
    height: Metrics.placingShipsSquareLength,
      ...ApplicationStyles.borderSquare
  },
  title: {
    textAlign: "center",
    color: Colors.white
  }
});

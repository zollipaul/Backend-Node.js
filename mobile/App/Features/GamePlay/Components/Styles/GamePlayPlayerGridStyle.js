import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";

export default StyleSheet.create({
  playerGrid: {
    width: Metrics.gamePlayPlayerGridWidth,
    height: Metrics.gamePlayPlayerGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 5,
    backgroundColor: Colors.background,
    ...ApplicationStyles.borderGrid
  }
});

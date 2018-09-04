import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";

export default StyleSheet.create({
  opponentGridContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  opponentGrid: {
    width: Metrics.gamePlayOpponentGridWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: Colors.background,
    ...ApplicationStyles.borderGrid
  }
});

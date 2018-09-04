import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import { human } from "react-native-typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  stageContainer: {
    alignItems: "center"
  },
  turn: {
    ...human.title1Object,
    color: Colors.white
  },
  stage: {
    ...human.footnoteObject,
    color: Colors.white
  },
  hurryView: {
    alignItems: "center",
  },
  hurryText: {
    ...human.caption1Object,
    color: Colors.highlight
  },
  activityIndicator: {
    marginTop: Metrics.baseMargin
  }
});

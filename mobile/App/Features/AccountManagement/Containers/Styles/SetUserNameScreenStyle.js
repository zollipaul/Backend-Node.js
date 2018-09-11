import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";
import { human } from "react-native-typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background
  },
  textContainer: {
    marginBottom: Metrics.doubleBaseMargin,
    alignItems: "center",
    justifyContent: "center"
  },
  headerText: {
    ...human.title3Object,
    color: Colors.white
  },
  headerSubtext: {
    ...human.bodyObject,
    color: Colors.white
  },
});

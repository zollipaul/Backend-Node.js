import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";
import { human } from "react-native-typography";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.background
  },
  input: {
    textAlign: "center",
    color: Colors.white,
    borderRadius: 5,
    width: 300,
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    marginBottom: Metrics.doubleBaseMargin
  },
  errorMessage: {
    ...human.bodyObject,
    width: 300,
    color: Colors.highlight,
    marginBottom: Metrics.doubleBaseMargin
  },
  errorBorder: {
    borderColor: Colors.highlight
  },
});

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
  heading: {
    ...human.bodyObject,
    color: Colors.white,
    marginBottom: Metrics.doubleBaseMargin
  },
  signUp: {
    width: 100,
    height: 40,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...ApplicationStyles.shadow
  },
  buttonText: {
    ...human.headlineObject,
    color: Colors.white
  }
});

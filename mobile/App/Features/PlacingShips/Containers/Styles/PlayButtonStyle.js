import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import { human } from "react-native-typography";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";

export default StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: Metrics.doubleBaseMargin,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  button: {
    width: 130,
    height: 50,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...ApplicationStyles.shadow
  },
  buttonText: {
    textAlign: "center",
    ...human.headlineObject,
    color: Colors.white,
    marginVertical: Metrics.baseMargin
  }
});

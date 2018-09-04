import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";
import { human } from "react-native-typography";

export default StyleSheet.create({
  container: {
    flex: 0,
    alignItems: "center",
    backgroundColor: Colors.background
  },
  input: {
    textAlign: "center",
    color: Colors.white,
    borderRadius: 5,
    width: 200,
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    marginBottom: Metrics.doubleBaseMargin
  },
  button: {
    width: 60,
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

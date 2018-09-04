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
    width: "80%",
    marginBottom: Metrics.baseMargin,
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1
  },
  buttons: {
    marginTop: Metrics.baseMargin,
    alignItems: "center"
  },
  button: {
    width: 180,
    height: 40,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Metrics.doubleBaseMargin,
    ...ApplicationStyles.shadow
  },
  orText: {
    height: 40,
    marginHorizontal: Metrics.doubleBaseMargin,
    justifyContent: "center",
    alignItems: "center"
  },
  loginOrSignUp: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Metrics.doubleBaseMargin
  },
  login: {
    width: 80,
    height: 40,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...ApplicationStyles.shadow
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
    ...human.bodyObject,
    color: Colors.white
  }
});

import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";
import { human } from "react-native-typography";

export default StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: Colors.background,
    borderBottomWidth: Metrics.borderWidth,
    borderBottomColor: Colors.white,
    paddingBottom: Metrics.doubleBaseMargin,
    marginBottom: Metrics.baseMargin
  },
  userNameContainer: {
    marginBottom: Metrics.baseMargin
  },
  deletePlayerContainer: {
    marginTop: Metrics.baseMargin
  },
  textContainer: {
    marginBottom: Metrics.baseMargin
  },
  headerText: {
    ...human.headlineObject,
    color: Colors.white
  },
  headerSubtext: {
    ...human.bodyObject,
    color: Colors.white
  },
  input: {
    textAlign: "center",
    color: Colors.white,
    borderRadius: 5,
    width: "80%",
    height: 40,
    borderColor: Colors.white,
    borderWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  saveButton: {
    width: 70,
    height: 40,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...ApplicationStyles.shadow
  },
  deleteButton: {
    width: 150,
    height: 40,
    backgroundColor: Colors.fire,
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

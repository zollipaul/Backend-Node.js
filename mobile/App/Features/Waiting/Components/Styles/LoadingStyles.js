import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import { human } from 'react-native-typography'

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background
  },
  text: {
    ...human.title1Object,
    color: Colors.text,
    textAlign: "center"
  },
  activityIndicator: {
    marginTop: 5
  }
});

import { StyleSheet } from "react-native";
import { Metrics, Colors } from "../../../../Themes/index";
import { human } from "react-native-typography";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  aboutContainer: {
  },
    aboutText: {
    marginVertical: Metrics.baseMargin,
        ...human.calloutObject,
        color: Colors.white
    }
});

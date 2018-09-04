import { StyleSheet } from "react-native";
import { Metrics } from '../../../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.gamePlayPlayerGridWidth/2,
    justifyContent: "flex-end",
    alignItems: 'center'
  },
  row: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center'
  },
});

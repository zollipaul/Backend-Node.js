import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../../Themes/index'
import { human } from 'react-native-typography'

export default StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Metrics.doubleBaseMargin
  },
  rows: {
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  aircraftCarrierContainer: {
    // flex: 0.45,
    alignItems: 'center'
  },
  rotationTip: {
    position: "absolute",
    top: -24
  },
  text: {
    ...human.subheadObject,
    color: Colors.white
  }
});

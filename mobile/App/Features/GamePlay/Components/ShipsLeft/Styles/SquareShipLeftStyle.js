import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../../../Themes/index'

export default StyleSheet.create({
  basic: {
    justifyContent: "center",
    alignItems: "center"
  },
  shipBackground: {
    backgroundColor: Colors.leftOrMissedShip
  },
  horizontalTrueAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderBottomLeftRadius: Metrics.borderRadius,
  },
  horizontalTrueAndPartEnd: {
    borderTopRightRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,

  },
  horizontalFalseAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderTopRightRadius: Metrics.borderRadius,
  },
  horizontalFalseAndPartEnd: {
    borderBottomLeftRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,
  },
  horizontalTrueAndPartMid: {
  },
  horizontalFalseAndPartMid: {
  },
})

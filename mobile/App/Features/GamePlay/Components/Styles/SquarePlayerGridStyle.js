import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../../Themes/index";
import ApplicationStyles from "../../../../Themes/ApplicationStyles";

export default StyleSheet.create({
  basic: {
    justifyContent: "center",
    alignItems: "center",
    width: Metrics.gamePlayPlayerSquareLength,
    height: Metrics.gamePlayPlayerSquareLength,
    ...ApplicationStyles.borderSquare
  },
  ship: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.ship
  },
  shipHorizontalTrueAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderBottomLeftRadius: Metrics.borderRadius,
    width: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth,
    height: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth * 2
  },
  shipHorizontalTrueAndPartMid: {
    width: Metrics.gamePlayPlayerSquareLength,
    height: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth * 2
  },
  shipHorizontalTrueAndPartEnd: {
    borderTopRightRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,
    width: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth,
    height: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth * 2
  },
  shipHorizontalFalseAndPartStart: {
    borderTopLeftRadius: Metrics.borderRadius,
    borderTopRightRadius: Metrics.borderRadius,
    width: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth * 2,
    height: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth
  },
  shipHorizontalFalseAndPartMid: {
    width: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth * 2,
    height: Metrics.gamePlayPlayerSquareLength
  },
  shipHorizontalFalseAndPartEnd: {
    borderBottomLeftRadius: Metrics.borderRadius,
    borderBottomRightRadius: Metrics.borderRadius,
    width: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth * 2,
    height: Metrics.gamePlayPlayerSquareLength - Metrics.borderWidth
  },
  squareHorizontalTrueAndPartStart: {
    borderRightWidth: 0
  },
  squareHorizontalTrueAndPartEnd: {
    borderLeftWidth: 0
  },
  squareHorizontalTrueAndPartMid: {
    borderLeftWidth: 0,
    borderRightWidth: 0
  },
  squareHorizontalFalseAndPartStart: {
    borderBottomWidth: 0
  },
  squareHorizontalFalseAndPartEnd: {
    borderTopWidth: 0
  },
  squareHorizontalFalseAndPartMid: {
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  title: {
    textAlign: "center",
    color: Colors.white
  }
});

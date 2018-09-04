import { StyleSheet } from "react-native";
import { Colors, Metrics, Images } from "../../../../Themes/index";

export default StyleSheet.create({
  basic: {
    backgroundColor: Colors.ship,
    borderRadius: Metrics.borderRadius
  },
  aircraftCarrier: {
    width:
      Metrics.placingShipsShipsLength + Metrics.placingShipsSquareLength * 4,
    height: Metrics.placingShipsShipsLength
  },
  battleship: {
      width:
          Metrics.placingShipsShipsLength + Metrics.placingShipsSquareLength * 3,
      height: Metrics.placingShipsShipsLength
  },
  submarine: {
      width:
          Metrics.placingShipsShipsLength + Metrics.placingShipsSquareLength * 2,
      height: Metrics.placingShipsShipsLength
  },
  destroyer: {
      width:
          Metrics.placingShipsShipsLength + Metrics.placingShipsSquareLength * 2,
      height: Metrics.placingShipsShipsLength
  },
  patrolBoat: {
      width:
          Metrics.placingShipsShipsLength + Metrics.placingShipsSquareLength * 1,
      height: Metrics.placingShipsShipsLength
  }
});

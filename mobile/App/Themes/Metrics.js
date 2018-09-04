import { Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const placingShipsSquareLength = Math.round(width * 0.9 * 0.0905);
const borderWidth = 1;

const gamePlayPlayerSquareLength =
  Platform.OS === "ios"
    ? Math.round(width * 0.6 * 0.0905)
    : Math.round(width * 0.55 * 0.0905);

const gamePlayOpponentSquareLength = Math.round(width * 0.8 * 0.0905);

const getGridWidth = length => length * 11 + borderWidth * 2;

// Used via Metrics.baseMargin
const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  smallMargin: 5,
  doubleSection: 50,
  horizontalLineHeight: 1,
  bottomBorderTable: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  borderWidth: borderWidth,
  borderRadius: placingShipsSquareLength / 2,

  placingShipsGridWidth: getGridWidth(placingShipsSquareLength),
  placingShipsSquareLength: placingShipsSquareLength,
  placingShipsShipsLength: placingShipsSquareLength - borderWidth * 2,

  gamePlayPlayerGridWidth: getGridWidth(gamePlayPlayerSquareLength),
  gamePlayPlayerSquareLength: gamePlayPlayerSquareLength,

  gamePlayOpponentGridWidth: getGridWidth(gamePlayOpponentSquareLength),
  gamePlayOpponentSquareLength: gamePlayOpponentSquareLength,

  crosshair: width * 0.5,

  navBarHeight: Platform.OS === "ios" ? 45 : 40,
  // navBarHeight: (Platform.OS === 'ios') ? 45 : 45,

  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  }
};

export default metrics;

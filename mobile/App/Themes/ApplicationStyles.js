import Metrics from "./Metrics";
import Colors from "./Colors";
import { Platform } from "react-native";

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  borderSquare: {
    borderColor: Colors.grid,
    borderWidth: Metrics.borderWidth
  },
  borderGrid: {
    borderWidth: Metrics.borderWidth,
    borderColor: Colors.grid
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadowColor,
        shadowOffset: { width: 0.5, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2
      },
      android: {
        elevation: 5
      }
    })
  },
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.transparent
    },
    backgroundImage: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin
    },
    sectionHeader: {
      marginVertical: Metrics.doubleBaseMargin,
      color: Colors.text
    },
    sectionText: {
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.snow,
      marginVertical: Metrics.smallMargin,
      textAlign: "center"
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      fontSize: 14,
      color: Colors.text
    }
  },
};

export default ApplicationStyles;

import { StyleSheet } from 'react-native'
import { Colors, Metrics} from '../../../../Themes/index'
import { human } from "react-native-typography";

export default StyleSheet.create({
  arrow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 5,
    bottom: 0,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeDown: {
    ...human.title1Object,
    color: Colors.white,
  },
  icon: {
    marginLeft: Metrics.baseMargin
  }
})

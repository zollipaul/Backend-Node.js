import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../../Themes/index'
import { human } from 'react-native-typography'
import ApplicationStyles from '../../../../Themes/ApplicationStyles'

export default StyleSheet.create({
  basic: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Metrics.baseMargin,
    backgroundColor: Colors.listItemBackground,
    marginTop: Metrics.smallMargin,
    marginBottom: Metrics.smallMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    borderRadius: 5,
    ...ApplicationStyles.shadow
  },
  col: {

  },
  stage: {
    ...human.caption1Object,
    color: Colors.white,
  },
  placeShips: {
    width: 50,
    height: 50,
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  ship: {
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // bottom: 0,
    //   left: 0
  },
  pointer: {
    position: 'absolute',
    top: 10,
    // right: 0,
    // bottom: 0,
    left: 10,
    zIndex: 1
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  canBeChanged: {
    // backgroundColor: Colors.background,
  },
  canBeJoined: {
    // backgroundColor: Colors.skyblue,
  },
  cannotBeChangedOrJoined: {
    // backgroundColor: Colors.charcoal,
  },
  players: {
    ...human.calloutObject,
    color: Colors.white,
    marginBottom: Metrics.smallMargin
  },
  time: {
    ...human.caption2Object,
    color: Colors.white,
  },
})

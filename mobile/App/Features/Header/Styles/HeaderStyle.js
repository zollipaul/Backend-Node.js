import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../Themes/index'
import { ApplicationStyles } from '../../../Themes/index'
import { human } from 'react-native-typography'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  headerLoggedIn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: 45,
    maxHeight: 45
  },
  titleText: {
    ...human.title2Object,
    color: Colors.white,
  },
  logoutText: {
    ...human.bodyObject,
    color: Colors.white,
  },
  headerUser:{
    ...human.bodyObject,
    color: Colors.white,
  },
  userView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: Metrics.doubleBaseMargin,
  },
  titleView: {
  },
  logoutView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: Metrics.doubleBaseMargin
  },
  headerLoggedOutOrPlacingShipsOrGamePlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    height: 45,
    maxHeight: 45
  },
})

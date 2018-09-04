import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-around',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
  },
  gameGridPlayerAndOpponentShips: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
})

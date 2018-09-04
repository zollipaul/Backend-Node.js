import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../../../Themes/index'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  }
})

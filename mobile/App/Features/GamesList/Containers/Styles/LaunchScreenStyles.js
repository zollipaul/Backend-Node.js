import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../../Themes/index'
import { human } from 'react-native-typography'
import ApplicationStyles from '../../../../Themes/ApplicationStyles'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  label: {
    textAlign: 'center',
    color: Colors.white
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: Metrics.doubleBaseMargin,
    paddingVertical: Metrics.baseMargin,
    backgroundColor: Colors.background
  },
  sectionHeaderText: {
    ...human.headlineObject,
    color: Colors.white,
  }
})

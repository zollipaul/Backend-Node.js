import { StyleSheet } from 'react-native'
import { Metrics, Colors } from '../../../Themes/index'
import { human } from 'react-native-typography'
import ApplicationStyles from '../../../Themes/ApplicationStyles'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  headerText: {
    ...human.headlineObject,
    color: Colors.white,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: Metrics.baseMargin,
    paddingVertical: Metrics.smallMargin,
    backgroundColor: Colors.listItemBackground,
    borderBottomWidth: Metrics.bottomBorderTable,
    // justifyContent: 'center'
  },
  lastRow: {
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  headerRow: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  name: {
    flex: 4,
  },
  stats: {
    flex: 1.5,
  },
  textName: {
    ...human.bodyObject,
    color: Colors.white,
    marginBottom: Metrics.smallMargin
  },
  textStats: {
    ...human.bodyObject,
    alignSelf: 'center',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    textAlign: 'center',
    color: Colors.white
  },
  listContent: {
    marginTop: Metrics.baseMargin,
    marginHorizontal: Metrics.doubleBaseMargin,
    ...ApplicationStyles.shadow,
  }
})

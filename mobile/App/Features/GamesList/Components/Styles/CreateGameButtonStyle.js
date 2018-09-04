import { StyleSheet } from 'react-native'
import { Colors } from '../../../../Themes'
import ApplicationStyles from '../../../../Themes/ApplicationStyles'

export default StyleSheet.create({
  createButton: {
    position: 'absolute',
    width: 50,
    height:  50,
    right: 30,
    bottom: 30,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...ApplicationStyles.shadow
  },
  iconPositionCorrected: {
    position: "absolute",
    top: 10.6,
    // right: 10,
    left: 13.51,
    // bottom: 10
  },
})

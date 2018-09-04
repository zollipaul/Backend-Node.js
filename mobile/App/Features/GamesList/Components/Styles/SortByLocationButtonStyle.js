import { StyleSheet } from 'react-native'
import { Colors } from '../../../../Themes'
import ApplicationStyles from '../../../../Themes/ApplicationStyles'
import { human } from 'react-native-typography'

export default StyleSheet.create({
  sortButton: {
    width: 110,
    height: 25,
    marginLeft: 10,
    backgroundColor: Colors.buttonBackground,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    ...ApplicationStyles.shadow
  },
  buttonText: {
    textAlign: "center",
    ...human.caption1Object,
    color: Colors.white,
  }
})

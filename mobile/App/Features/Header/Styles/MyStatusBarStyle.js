import { StyleSheet, StatusBar, Platform } from 'react-native'
import { Colors } from '../../../Themes/index'

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;

// const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

export default StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.background,
    height: STATUSBAR_HEIGHT,
  }
})

import { Alert, Platform, ToastAndroid } from "react-native";


export const showToastAlert = ( message: string) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  } else {
    Alert.alert(message);
  }
}
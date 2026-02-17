import { useEffect, useState } from "react";
import { Keyboard, KeyboardEvent } from "react-native";

export const useKeyboardBehavior = () => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
        const onKeyboardDidShow = (e: KeyboardEvent) => {
            setIsKeyboardVisible(true);
            setKeyboardHeight(e.endCoordinates.height);
        };

        const onKeyboardDidHide = () => {
            setIsKeyboardVisible(false);
            setKeyboardHeight(0);
        };

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    return { isKeyboardVisible, keyboardHeight };
}
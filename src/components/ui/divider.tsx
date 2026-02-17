import { semanticColors } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { ThemedView, ThemedViewProps } from "./themed-view";


export type DividerProps = ThemedViewProps & {
    color?: keyof typeof semanticColors;
}
export const Divider = (props: DividerProps) => {
    const { style, color = 'border-default', ...otherProps } = props;
    return (
        <ThemedView style={[styles.divider, { backgroundColor: semanticColors[color] }, style]} {...otherProps} />
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
    }
})
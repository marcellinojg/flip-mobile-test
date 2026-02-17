import { radius, spacing } from "@/constants/sizing";
import { semanticColors } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { ThemedView, ThemedViewProps } from "./themed-view";


export type CardProps = ThemedViewProps & {
    children?: React.ReactNode;
}
export const Card = (props: CardProps) => {
    const { style, ...otherProps } = props;
    return (
        <ThemedView style={[
            styles.card,
            style
        ]} {...otherProps}>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: radius.small,
        backgroundColor: semanticColors['background-component'],
        padding: spacing.large,
    }
})
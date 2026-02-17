import { StyleSheet, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedViewProps } from "./themed-view";

type Props = ThemedViewProps & {
    title?: string;
    description?: string;
}

export const EmptyState = (props: Props) => {
    const { title = 'No data', description = 'No data found', style, ...otherProps } = props;
    return (
        <View style={[styles.empty, style]} {...otherProps}>
            {title && <ThemedText variant="title">{title}</ThemedText>}
            {description && <ThemedText variant="subtitle">{description}</ThemedText>}
        </View>
    );
};

const styles = StyleSheet.create({
    empty: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
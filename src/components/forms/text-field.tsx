import { radius, spacing } from "@/constants/sizing";
import { semanticColors } from "@/constants/theme";
import { BaseFormFieldProps } from "@/types/forms";
import type { ReactNode } from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { ThemedView } from "../ui/themed-view";

export type TextFieldProps<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BaseFormFieldProps<TFieldValues, TName> &
	TextInputProps & {
		leading?: ReactNode;
		trailing?: ReactNode;
	};

export const TextField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
	control,
	name,
	label,
	description,
	required,
	maxLength,
	leading,
	trailing,
	style,
	...props
}: TextFieldProps<TFieldValues, TName>) => {
	const {
		field: { onChange, onBlur, value, ref },
	} = useController<TFieldValues, TName>({
		control,
		name,
	});

	return (
		<ThemedView style={styles.container}>
			{leading ? <View style={styles.leading}>{leading}</View> : null}
			<TextInput
				style={[
					styles.input,
					leading ? styles.inputWithLeading : null,
					trailing ? styles.inputWithTrailing : null,
					style,
				]}
				value={value ?? ""}
				onChangeText={onChange}
				onBlur={onBlur}
				ref={ref}
				maxLength={maxLength}
				placeholderTextColor={semanticColors["text-tertiary"]}
				{...props}
			/>
			{trailing ? <View style={styles.trailing}>{trailing}</View> : null}
		</ThemedView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: semanticColors["background-component"],
		borderRadius: radius.medium,
		flexDirection: "row",
		alignItems: "center",
		minHeight: 48,
		paddingHorizontal: spacing.medium,
	},
	leading: {
		marginRight: spacing.small,
		justifyContent: "center",
	},
	trailing: {
		marginLeft: spacing.small,
		justifyContent: "center",
	},
	input: {
		flex: 1,
		fontSize: 16,
		paddingVertical: spacing.medium,
		color: semanticColors["text-primary"],
	},
	inputWithLeading: {
		paddingLeft: 0,
	},
	inputWithTrailing: {
		paddingRight: 0,
	},
});
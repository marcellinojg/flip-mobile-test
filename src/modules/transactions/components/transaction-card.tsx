import { Card, CardProps } from "@/components/ui/card";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { semanticColors } from "@/constants/theme";
import { formatDate, formatRupiah } from "@/lib/formatter";
import { router } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { spacing } from "../../../constants/sizing";
import { bankTypeMap, Transaction, TransactionStatusEnum } from "../constants/transaction";

type Props = CardProps & {
    transaction: Transaction;
    onPress?: () => void;
}
export const TransactionCard = (props: Props) => {
    const {
        transaction,
        style,
        onPress,
        ...otherProps
    } = props;


    const handlePress = useCallback(() => {
        if(onPress) {
            onPress();
        } else {
            router.navigate({
                pathname: '/[transactionId]',
                params: {
                    transactionId: transaction.id,
                },
            });
        }
    }, [onPress, transaction]);

    const {
        statusColor,
        statusText,
        statusBadgeBackgroundColor,
        statusBadgeBorderColor,
        statusBadgeTextColor,
        displayAmountText,
        displayDateText,
        senderBankText,
        beneficiaryBankText,
    } = useMemo(() => {
        let statusColor = semanticColors['border-brand'];
        let statusText = "Pengecekan";
        let statusBadgeBackgroundColor = semanticColors['background-brand'];
        let statusBadgeBorderColor = semanticColors['border-brand'];
        let statusBadgeTextColor = semanticColors['text-brand'];
        switch (transaction.status) {
            case TransactionStatusEnum.PENDING:
                statusColor = semanticColors['border-brand'];
                statusText = "Pengecekan";
                statusBadgeBackgroundColor = semanticColors['background-component'];
                statusBadgeBorderColor = semanticColors['border-brand'];
                statusBadgeTextColor = semanticColors['text-primary'];
                break;
            case TransactionStatusEnum.SUCCESS:
                statusColor = semanticColors['status-success'];
                statusText = "Berhasil";
                statusBadgeBackgroundColor = semanticColors['status-success'];
                statusBadgeBorderColor = semanticColors['status-success'];
                statusBadgeTextColor = semanticColors['text-inverse'];
                break;
        }

        const displayAmountText = formatRupiah(transaction.amount)
        const displayDateText = formatDate(transaction.created_at)

        const senderBankText = bankTypeMap[transaction.sender_bank].displayName || transaction.sender_bank;
        const beneficiaryBankText = bankTypeMap[transaction.beneficiary_bank].displayName || transaction.beneficiary_bank;

        return { statusColor, statusText, statusBadgeBackgroundColor, statusBadgeBorderColor, statusBadgeTextColor, displayAmountText, displayDateText, senderBankText, beneficiaryBankText };
    }, [transaction])


    return (
        <TouchableOpacity onPress={handlePress}>
            <Card style={[styles.card, style, { borderLeftColor: statusColor, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]} {...otherProps}>
                <ThemedView style={{ flex: 1 }}>
                    <ThemedText variant="defaultBold">
                        {senderBankText}<ThemedText variant="default"> ➔ </ThemedText>
                        {beneficiaryBankText}
                    </ThemedText>
                    <ThemedText>
                        {transaction.beneficiary_name}
                    </ThemedText>
                    <ThemedText>
                        {displayAmountText} • {displayDateText}
                    </ThemedText>
                </ThemedView>
                {/* Action/status button */}
                <ThemedView
                    style={[
                        styles.statusBadge,
                        { backgroundColor: statusBadgeBackgroundColor, borderColor: statusBadgeBorderColor },
                    ]}
                >
                    <ThemedText variant="defaultSemiBold" style={[styles.statusBadgeText, { color: statusBadgeTextColor }]}>
                        {statusText}
                    </ThemedText>
                </ThemedView>
            </Card>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    card: {
        padding: spacing.large,
        borderLeftWidth: 4,
        backgroundColor: semanticColors['background-component'],
    },
    statusBadge: {
        borderRadius: 6,
        borderWidth: 1,
        paddingVertical: 2,
        paddingHorizontal: 10,
        color: semanticColors["text-inverse"],
        marginLeft: spacing.medium,
        fontSize: 13,
        fontWeight: "bold",
    },
    statusBadgeText: {
        fontSize: 13,
    }
})
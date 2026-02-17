import { Card } from "@/components/ui/card";
import { Collapsible } from "@/components/ui/collapsible";
import { Divider } from "@/components/ui/divider";
import { ThemedText } from "@/components/ui/themed-text";
import { ThemedView } from "@/components/ui/themed-view";
import { spacing } from "@/constants/sizing";
import { semanticColors } from "@/constants/theme";
import { typography } from "@/constants/typography";
import { showToastAlert } from "@/lib/alert";
import { formatDate, formatRupiah } from "@/lib/formatter";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useMemo } from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { bankTypeMap } from "../constants/transaction";
import { useTransactionDetailActions, useTransactionDetailState, useTransactionListState } from "../store/transaction-store";


export const TransactionDetailScreen = ({
  transactionId,
}: {
  transactionId: string;
}) => {
  const { setIsDetailCollapsed, } = useTransactionDetailActions();
  const { isDetailCollapsed } = useTransactionDetailState();
  const insets = useSafeAreaInsets();
  const { data: transactions } = useTransactionListState();

  const transaction = useMemo(
    () => {
      if (!transactions) return null;
      return transactions.find((transaction) => transaction.id === transactionId);
    },
    [transactions, transactionId]
  );

  useFocusEffect(useCallback(() => {
    setIsDetailCollapsed(true);
  }, []));

  const handleCopyId = async () => {
    if (transaction?.id) {
      await Clipboard.setStringAsync(transaction.id);
      showToastAlert("ID transaksi berhasil disalin");
    } else {
      showToastAlert("ID transaksi tidak ditemukan");
    }
  };

  const { senderBank, beneficiaryBank } = useMemo(() => {
    if (!transaction) return { senderBank: "", beneficiaryBank: "" };
    return {
      senderBank: bankTypeMap[transaction.sender_bank].displayName || transaction.sender_bank,
      beneficiaryBank: bankTypeMap[transaction.beneficiary_bank].displayName || transaction.beneficiary_bank,
    }
  }, [transaction]);

  if (!transaction) {
    return (
      <SafeAreaView style={styles.body} edges={["top"]}>
        <ThemedText>Transaction not found</ThemedText>
      </SafeAreaView>
    );
  }


  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[{
        paddingTop: insets.top,
        paddingBottom: insets.bottom + spacing.xlarge
      }]}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.card}>
        {/* ID + Copy */}
        <ThemedView style={[styles.sectionRow, styles.idRow]}>
          <TouchableOpacity hitSlop={spacing.medium} onPress={() => router.back()}>
            <Ionicons
              name="arrow-back-outline"
              size={typography.fontSize.lg}
              color={semanticColors["icon-brand"]}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCopyId} style={styles.idContainer}>
            <ThemedText
              variant="defaultSemiBold"
              style={styles.idLabel}
            >{`ID TRANSAKSI: #${transaction.id}`}</ThemedText>
            <Ionicons
              name="copy-outline"
              size={typography.fontSize.lg}
              color={semanticColors["icon-brand"]}
            />
          </TouchableOpacity>
        </ThemedView>

        <Divider />
        <ThemedView style={[styles.sectionRow, styles.headerRow]}>
          <ThemedText variant="defaultSemiBold">
            DETAIL TRANSAKSI
          </ThemedText>
          <TouchableOpacity onPress={() => setIsDetailCollapsed(!isDetailCollapsed)} hitSlop={spacing.medium}>
            <ThemedText variant="default" color="text-brand">
              {isDetailCollapsed ? "Buka" : "Tutup"}
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>
        <Divider color="border-strong" />
        <ThemedView style={styles.contentSection}>
          <ThemedText variant="defaultBold">
            {senderBank}<ThemedText variant="default"> ➔ </ThemedText>
            {beneficiaryBank}
          </ThemedText>
          <ThemedView style={styles.contentRow}>
            <ThemedView style={styles.contentRowItem}>
              <ThemedText variant="defaultSemiBold">
                {transaction.beneficiary_name.toUpperCase()}
              </ThemedText>
              <ThemedText variant="default">
                {transaction.account_number}
              </ThemedText>
            </ThemedView>
            <ThemedView style={styles.contentRowItem}>
              <ThemedText variant="defaultSemiBold">
                NOMINAL
              </ThemedText>
              <ThemedText variant="default">
                {formatRupiah(transaction.amount)}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <Collapsible isCollapsed={isDetailCollapsed}>
            <ThemedView style={styles.contentRow}>
              <ThemedView style={styles.contentRowItem}>
                <ThemedText variant="defaultSemiBold">
                  BERITA TRANSFER
                </ThemedText>
                <ThemedText variant="default">
                  {transaction.remark}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.contentRowItem}>
                <ThemedText variant="defaultSemiBold">
                  KODE UNIK
                </ThemedText>
                <ThemedText variant="default">
                  {transaction.unique_code}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.contentRow}>
              <ThemedView style={styles.contentRowItem}>
                <ThemedText variant="defaultSemiBold">
                  WAKTU DIBUAT
                </ThemedText>
                <ThemedText variant="default">
                  {formatDate(transaction.created_at)}
                </ThemedText>
              </ThemedView>
            </ThemedView>
          </Collapsible>
        </ThemedView>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: semanticColors["background-primary"],
  },
  scroll: {
    flex: 1,
  },
  card: {
    padding: 0,
  },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.large,
  },
  idRow: {
    justifyContent: 'flex-start',
    gap: spacing.medium
  },
  headerRow: {
    justifyContent: 'space-between',
    paddingVertical: spacing.xlarge
  },
  idLabel: {
    fontSize: typography.fontSize.sm,
  },
  contentSection: {
    paddingVertical: spacing.xlarge,
    paddingHorizontal: spacing.large,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.medium,
    paddingTop: spacing.xlarge,
  },
  contentRowItem: {
    flex: 1,
  },
  idContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.medium,
  }
});

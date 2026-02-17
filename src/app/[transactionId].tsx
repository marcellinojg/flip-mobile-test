import { TransactionDetailScreen } from "@/modules/transactions/screens/transaction-detail";
import { useLocalSearchParams } from "expo-router";

export default function TransactionDetail() {
  const { transactionId } = useLocalSearchParams<{ transactionId: string }>();
  return (
    <TransactionDetailScreen
      transactionId={transactionId}
    />
  );
}

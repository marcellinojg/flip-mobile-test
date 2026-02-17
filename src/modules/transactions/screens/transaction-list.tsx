import { TextField } from "@/components/forms/text-field";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { spacing } from "@/constants/sizing";
import { semanticColors } from "@/constants/theme";
import { useDebounce } from "@/hooks/use-debounce";
import { useKeyboardBehavior } from "@/hooks/use-keyboard-behavior";
import { useTransactionListActions, useTransactionListState } from "@/modules/transactions/store/transaction-store";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RefreshControl, StyleSheet, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import z from "zod";
import { TransactionCard } from "../components/transaction-card";
import { TransactionSortModal } from "../components/transaction-sort-modal";
import { Transaction } from "../constants/transaction";
import { getTransactions } from "../services/transaction-service";

export const TransactionListScreen = () => {
    const { setSearch, refreshData } = useTransactionListActions();
    const { filteredData } = useTransactionListState();
    const { isKeyboardVisible, keyboardHeight } = useKeyboardBehavior();
    const [_error, setError] = useState<unknown | null>(null);
    const form = useForm({
        resolver: zodResolver(z.object({
            search: z.string().optional(),
        })),
    });

    const transactionsQuery = useQuery({
        queryKey: ['transactions'],
        queryFn: getTransactions,
    });

    useEffect(() => {
        if (transactionsQuery.data) {
            refreshData(transactionsQuery.data);
        }
        if (transactionsQuery.error) {
            setError(transactionsQuery.error);
        }
    }, [transactionsQuery.data, transactionsQuery.error]);


    const { control, watch, reset } = form;

    const [debouncedSearch, isDebouncing] = useDebounce(watch('search') || '', 500);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        setSearch(debouncedSearch);
    }, [debouncedSearch]);

    const renderItem = useCallback(({ item }: { item: Transaction }) => {
        if (!transactionsQuery.isFetching) {
            return <TransactionCard transaction={item} />
        }
        else {
            return <Skeleton width={"100%"} height={80} />
        }
    }, [transactionsQuery.isFetching]);

    const onRefresh = useCallback(() => {
        transactionsQuery.refetch().then(() => {
            reset();
        });
    }, [transactionsQuery]);

    return (
        <SafeAreaView style={styles.body} edges={['top']}>
            <TextField
                name="search"
                control={control}
                placeholder="Cari nama, bank, atau nominal"
                leading={
                    <Ionicons
                        name="search"
                        size={20}
                        color={semanticColors["text-tertiary"]}
                    />
                }
                trailing={
                    <TransactionSortModal />
                }
            />

            <FlashList
                refreshControl={<RefreshControl refreshing={isDebouncing} onRefresh={onRefresh} />}
                data={filteredData}
                showsVerticalScrollIndicator={false}
                renderItem={renderItem}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={() => <EmptyState title="No data" description="No data found" />}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + spacing.large + (isKeyboardVisible ? keyboardHeight : 0),
                    paddingTop: spacing.large,
                }}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    body: {
        backgroundColor: semanticColors["background-primary"],
        flex: 1,
        paddingHorizontal: spacing.medium,
    },
    separator: {
        height: spacing.medium,
    },

});
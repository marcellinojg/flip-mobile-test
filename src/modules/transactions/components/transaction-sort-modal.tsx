import { ThemedText } from '@/components/ui/themed-text';
import { ThemedView } from '@/components/ui/themed-view';
import { radius, spacing } from '@/constants/sizing';
import { semanticColors } from '@/constants/theme';
import { typography } from '@/constants/typography';
import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { TransactionSortEnum, useTransactionListActions, useTransactionListState } from '../store/transaction-store';

export const TransactionSortModal = () => {
    const [visible, setVisible] = useState(false);
    const { sort } = useTransactionListState();
    const { setSort } = useTransactionListActions();

    const options = [
        { key: null, label: 'URUTKAN' },
        { key: TransactionSortEnum.AZ, label: 'Nama A-Z' },
        { key: TransactionSortEnum.ZA, label: 'Nama Z-A' },
        { key: TransactionSortEnum.NEWEST, label: 'Tanggal Terbaru' },
        { key: TransactionSortEnum.OLDEST, label: 'Tanggal Terlama' },
    ];

    const onSelectItem = (key: TransactionSortEnum | null) => {
        setSort(key ?? undefined);
        setVisible(false);
    }

    const selectedOption = useMemo(() => {
        return options.find(option => option.key === sort);
    }, [sort]);

    return (
        <>
            <TouchableOpacity style={styles.sortButton} onPress={() => setVisible(true)}>
                <ThemedText style={styles.sortLabel}>{selectedOption?.label || 'URUTKAN'}</ThemedText>
                <Ionicons
                    name="chevron-down"
                    size={16}
                    color={semanticColors["text-brand"]}
                    style={styles.sortChevron}
                />
            </TouchableOpacity>

            <Modal
                transparent
                animationType="fade"
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    style={styles.backdrop}
                    onPress={() => setVisible(false)}
                >
                    <Pressable style={styles.container} onPress={(e) => { e.stopPropagation() }}>
                        {options.map(option => (
                            <TouchableOpacity
                                key={option.key}
                                style={styles.row}
                                onPress={() => onSelectItem(option.key ?? null)}
                            >
                                <ThemedView style={styles.radioOuter}>
                                    {sort == option.key && (
                                        <ThemedView style={styles.radioInner} />
                                    )}
                                </ThemedView>

                                <ThemedText>{option.label}</ThemedText>
                            </TouchableOpacity>
                        ))}
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: radius.large,
        paddingHorizontal: spacing.xlarge,
        paddingVertical: spacing.xxlarge,
        gap: spacing.xxlarge
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioOuter: {
        width: 22,
        height: 22,
        borderRadius: radius.xxlarge,
        borderWidth: 2,
        borderColor: semanticColors["border-brand"],
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: radius.xxlarge,
        backgroundColor: semanticColors["background-brand"],
    },
    sortButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    sortLabel: {
        fontFamily: typography.fontFamily.semibold,
        fontSize: typography.fontSize.sm,
        color: semanticColors["text-brand"],
    },
    sortChevron: {
        marginLeft: spacing.small,
    },
});

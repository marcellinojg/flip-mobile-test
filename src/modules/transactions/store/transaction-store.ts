import { create, useStore } from 'zustand';
import { Transaction } from '../constants/transaction';

export enum TransactionSortEnum {
    AZ = 'az',
    ZA = 'za',
    NEWEST = 'newest',
    OLDEST = 'oldest',
}

interface TransactionStore {
    list: {
        states: {
            data: Transaction[] | null;
            filteredData: Transaction[] | null;
            sort?: TransactionSortEnum | null;
            search?: string | null;
        },
        actions: {
            setSort: (sort?: TransactionSortEnum) => void;
            setSearch: (search?: string | null) => void;
            clear: () => void;
            refreshData: (data: Transaction[]) => void;
        }
    };
    detail: {
        states: {
            isDetailCollapsed: boolean;
        },
        actions: {
            setIsDetailCollapsed: (isDetailCollapsed: boolean) => void;
        }
    }
}

function applySearchAndSort(
    data: Transaction[] | null,
    search: string | null | undefined,
    sort: TransactionSortEnum | null | undefined
): Transaction[] {
    let result = data ?? [];
    if (search?.trim()) {
        const searchLower = search.toLowerCase().trim();
        result = result.filter((item) => {
            const name = item.beneficiary_name?.toLowerCase() || '';
            const senderBank = item.sender_bank?.toLowerCase() || '';
            const beneficiaryBank = item.beneficiary_bank?.toLowerCase() || '';
            const amount = item.amount?.toString() || '';
            return (
                name.includes(searchLower) ||
                senderBank.includes(searchLower) ||
                beneficiaryBank.includes(searchLower) ||
                amount.includes(searchLower)
            );
        });
    }
    if (sort) {
        const copy = [...result];
        switch (sort) {
            case TransactionSortEnum.AZ:
                copy.sort((a, b) => a.beneficiary_name.localeCompare(b.beneficiary_name));
                break;
            case TransactionSortEnum.ZA:
                copy.sort((a, b) => b.beneficiary_name.localeCompare(a.beneficiary_name));
                break;
            case TransactionSortEnum.NEWEST:
                copy.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
                break;
            case TransactionSortEnum.OLDEST:
                copy.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                break;
        }
        result = copy;
    }
    return result;
}

const transactionStore = create<TransactionStore>((set) => ({
    list: {
        states: {
            data: [],
            filteredData: [],
            sort: undefined,
            search: undefined,
        },
        actions: {
            refreshData: (data: Transaction[]) =>
                set((state) => ({
                    list: {
                        ...state.list,
                        states: {
                            ...state.list.states,
                            data,
                            filteredData: applySearchAndSort(data, undefined, undefined),
                            sort: undefined,
                            search: undefined,
                        },
                    },
                })),
            setSort: (sort?: TransactionSortEnum) =>
                set((state) => ({
                    list: {
                        ...state.list,
                        states: {
                            ...state.list.states,
                            sort,
                            filteredData: applySearchAndSort(
                                state.list.states.data,
                                state.list.states.search,
                                sort
                            ),
                        },
                    },
                })),
            setSearch: (search?: string | null) =>
                set((state) => ({
                    list: {
                        ...state.list,
                        states: {
                            ...state.list.states,
                            search,
                            filteredData: applySearchAndSort(
                                state.list.states.data,
                                search,
                                state.list.states.sort
                            ),
                        },
                    },
                })),
            clear: () =>
                set((state) => ({
                    list: {
                        ...state.list,
                        states: {
                            ...state.list.states,
                            sort: undefined,
                            search: undefined,
                            filteredData: applySearchAndSort(state.list.states.data, undefined, undefined),
                        },
                    },
                })),
        },
    },
    detail: {
        states: {
            isDetailCollapsed: false,
        },
        actions: {
            setIsDetailCollapsed: (isDetailCollapsed: boolean) =>
                set((state) => ({
                    detail: {
                        ...state.detail,
                        states: {
                            ...state.detail.states,
                            isDetailCollapsed,
                        },
                    },
                })),
        },
    }
}));


export const useTransactionListState = () => useStore(transactionStore, (s) => s.list.states);
export const useTransactionListActions = () => useStore(transactionStore, (s) => s.list.actions);

export const useTransactionDetailState = () => useStore(transactionStore, (s) => s.detail.states);
export const useTransactionDetailActions = () => useStore(transactionStore, (s) => s.detail.actions);
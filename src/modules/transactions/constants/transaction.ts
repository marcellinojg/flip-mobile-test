
export enum TransactionStatusEnum {
    PENDING = 'PENDING',
    SUCCESS = 'SUCCESS',
}

export enum BankTypeEnum {
    BNI = 'bni',
    BSM = 'bsm',
    BCA = 'bca',
    MUAMALAT = 'muamalat',
    MANDIRI = 'mandiri',
    BRI = 'bri',
    BTPN = 'btpn',
}

export type Transaction = {
    id: string;
    amount: number;
    unique_code: number;
    status: TransactionStatusEnum;
    sender_bank: BankTypeEnum;
    account_number: string;
    beneficiary_name: string;
    beneficiary_bank: BankTypeEnum;
    remark: string;
    created_at: string;
    completed_at: string;
    fee: number;
}

export const bankTypeMap = {
    [BankTypeEnum.BNI]: {
        displayName: 'BNI',
    },
    [BankTypeEnum.BSM]: {
        displayName: 'BSM',
    },
    [BankTypeEnum.BCA]: {
        displayName: 'BCA',
    },
    [BankTypeEnum.MUAMALAT]: {
        displayName: 'Muamalat',
    },
    [BankTypeEnum.MANDIRI]: {
        displayName: 'Mandiri',
    },
    [BankTypeEnum.BRI]: {
        displayName: 'BRI',
    },
    [BankTypeEnum.BTPN]: {
        displayName: 'BTPN',
    },
}
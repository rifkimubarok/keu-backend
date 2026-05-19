export declare const AccountType: {
    readonly BANK: "BANK";
    readonly EWALLET: "EWALLET";
    readonly CASH: "CASH";
    readonly SAVINGS: "SAVINGS";
    readonly OTHER: "OTHER";
};
export type AccountType = (typeof AccountType)[keyof typeof AccountType];
export declare const AccountStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly ARCHIVED: "ARCHIVED";
};
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];
export declare const TransactionType: {
    readonly INCOME: "INCOME";
    readonly EXPENSE: "EXPENSE";
    readonly TRANSFER: "TRANSFER";
};
export type TransactionType = (typeof TransactionType)[keyof typeof TransactionType];
export declare const CategoryStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly ARCHIVED: "ARCHIVED";
};
export type CategoryStatus = (typeof CategoryStatus)[keyof typeof CategoryStatus];

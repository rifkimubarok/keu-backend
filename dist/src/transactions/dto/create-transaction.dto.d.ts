import { TransactionType } from '../../../generated/prisma';
export declare class CreateTransactionDto {
    type: TransactionType;
    transactionDate?: Date;
    amount: number;
    feeAmount?: number;
    sourceAccountId?: string;
    destinationAccountId?: string;
    categoryId?: string;
    note?: string;
}

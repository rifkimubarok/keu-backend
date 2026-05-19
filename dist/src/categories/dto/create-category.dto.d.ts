import { TransactionType } from '../../../generated/prisma';
export declare class CreateCategoryDto {
    name: string;
    transactionType: TransactionType;
    icon?: string;
    color?: string;
    isDefault?: boolean;
}

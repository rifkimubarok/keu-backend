import { AccountType } from '../../../generated/prisma';
export declare class CreateAccountDto {
    name: string;
    type: AccountType;
    initialBalance: number;
    currency?: string;
}

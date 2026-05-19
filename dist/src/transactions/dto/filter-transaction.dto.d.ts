import { TransactionType } from '../../../generated/prisma';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class FilterTransactionDto extends PaginationQueryDto {
    type?: TransactionType;
    accountId?: string;
    categoryId?: string;
    from?: Date;
    to?: Date;
    minAmount?: number;
    maxAmount?: number;
    search?: string;
}

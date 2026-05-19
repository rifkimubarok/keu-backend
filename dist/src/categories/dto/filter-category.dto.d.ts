import { TransactionType } from '../../../generated/prisma';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class FilterCategoryDto extends PaginationQueryDto {
    name?: string;
    transactionType?: TransactionType;
}

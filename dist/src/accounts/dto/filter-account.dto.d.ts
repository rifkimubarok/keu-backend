import { AccountStatus, AccountType } from '../../../generated/prisma';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare class FilterAccountDto extends PaginationQueryDto {
    name?: string;
    type?: AccountType;
    currency?: string;
    status?: AccountStatus;
}

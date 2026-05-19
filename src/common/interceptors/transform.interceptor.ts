import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    return next.handle().pipe(
      map((response: unknown) => {
        if (response && typeof response === 'object' && 'data' in response) {
          return response;
        }

        return { data: response };
      }),
    );
  }
}

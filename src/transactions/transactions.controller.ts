import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { VerifyPaymentDto } from './dtos/verify-payment.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Status } from './enums/status.enum';
import { ChangeTransactionStatusDto } from './dtos/change-status.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({whitelist:true}))
  @Patch('/:token/transaction')
  changeTransactionStatus(@Param() {token},@Body() changeStatusDto: ChangeTransactionStatusDto) {
    return this.transactionService.changeTransactionStatusByToken(
      token,
      changeStatusDto.status,
    );
  }

  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @Get('')
  getTransactions(
    @Query() query: { skip: number; take: number; status: Status },
  ) {
    return this.transactionService.getTransactions(
      query.skip,
      query.take,
      query.status,
    );
  }

  @UseGuards(AuthGuard)
  @Post('buy')
  buyProducts(@Req() req) {
    return this.transactionService.buyPlan(req.user?.id);
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('verify')
  verifyPayment(@Body() verifyTransaction: VerifyPaymentDto) {
    return this.transactionService.verifyPayment(verifyTransaction.token);
  }
}

import {
  Body,
  Controller,
  Get,
  HttpException,
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
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('/:token/transaction')
  changeTransactionStatus(
    @Param() { token },
    @Body() changeStatusDto: ChangeTransactionStatusDto,
  ) {
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
  async buyProducts(@Req() req) {
    const response = await this.transactionService.addTransactionToQueue(
      req.user?.id,
      'buy-products'
    );

    if (response.status !== 200)
      throw new HttpException(response.message, response.status);

    return response.data;
  }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('verify')
  async verifyPayment(@Body() verifyTransaction: VerifyPaymentDto) {
    const response = await this.transactionService.addTransactionToQueue(
      verifyTransaction.token,
      'verify-payment'
    );

    if (response.status !== 200)
      throw new HttpException(response.message, response.status);

    return response
  }
}

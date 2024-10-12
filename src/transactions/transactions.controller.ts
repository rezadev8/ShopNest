import {
  Body,
  Controller,
  Delete,
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
import { ApiTags } from '@nestjs/swagger';
import { BuyProductsSwagger, ChangeTransactionStatusSwagger, DeleteTransactionSwagger, GetTransactionsSwagger, GetUserTransactionsSwagger, VerifyTransactionSwagger } from './decorators/transactions.swagger.decorator';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @ChangeTransactionStatusSwagger()
  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch('/:id/transaction')
  changeTransactionStatus(
    @Param() { id },
    @Body() changeStatusDto: ChangeTransactionStatusDto,
  ) {
    return this.transactionService.changeTransactionStatusById(
      id,
      changeStatusDto.status,
    );
  }

  @GetTransactionsSwagger()
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

  @GetUserTransactionsSwagger()
  @UseGuards(AuthGuard)
  @Get('transaction')
  async getUserTransactions(@Req() req){
    return this.transactionService.getUserTransactions(req.user?.id)
  }

  @BuyProductsSwagger()
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

  @VerifyTransactionSwagger()  
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
  
  @DeleteTransactionSwagger()
  @Roles(Role.ADNIM)
  @UseGuards(AuthGuard)
  @Delete('/:id/transaction')
  removeTransaction(@Param() {id}){
    return this.transactionService.deleteTransaction(id)
  }
}

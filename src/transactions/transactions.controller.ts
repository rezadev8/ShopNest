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
import { JwtAuthGuard } from 'src/auth/jwt/guards/auth.guard';
import { VerifyPaymentDto } from './dtos/verify-payment.dto';
import { Roles } from 'src/auth/jwt/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Status } from './enums/status.enum';
import { ChangeTransactionStatusDto } from './dtos/change-status.dto';
import { ApiTags } from '@nestjs/swagger';
import { BuyProductsSwagger, ChangeTransactionStatusSwagger, DeleteTransactionSwagger, GetTransactionsSwagger, GetUserTransactionsSwagger, VerifyTransactionSwagger } from './decorators/transactions.swagger.decorator';
import { Throttle } from '@nestjs/throttler';

@Throttle({default:{ttl:60000 , limit:10}})
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  @ChangeTransactionStatusSwagger()
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
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
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Get('transaction')
  async getUserTransactions(@Req() req){
    return this.transactionService.getUserTransactions(req.user?.id)
  }

  @BuyProductsSwagger()
  @UseGuards(JwtAuthGuard)
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
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete('/:id/transaction')
  removeTransaction(@Param() {id}){
    return this.transactionService.deleteTransaction(id)
  }
}

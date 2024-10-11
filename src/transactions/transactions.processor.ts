import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TransactionsService } from './transactions.service';

@Processor('transactions-queue')
export class TransactionsProcessor {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Process({name:'buy-products' , concurrency:80})
  async handleBuyProducts(job: Job<any>) {
    const response  = await this.transactionsService.processBuyProducts(job.data);

    return response
  }

  @Process({name:'verify-payment' , concurrency:80})
  async handleVerifyPyament(job: Job<any>) {
    const response  = await this.transactionsService.processVerifyPayment(job.data);

    return response
  }
}
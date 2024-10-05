import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { App } from './entities/app-info.entitie';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(@InjectRepository(App) private appRepository: Repository<App>) {}
  getAppInfo() {
    try {
      return this.appRepository.findOne({where:{id:1}});
    } catch (error) {
      throw new InternalServerErrorException(
        'Unfortunately, there was an issue getting App info',
      );
    }
  }
}

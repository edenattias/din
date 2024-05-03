import { Module } from '@nestjs/common';
import { DalModule } from '../DB/db.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [DalModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}

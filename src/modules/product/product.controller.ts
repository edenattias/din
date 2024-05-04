import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Body,
  Put,
  Logger,
  Delete,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductService } from './product.service';
import { CreateProductDto } from '../../utils/dto/create-product.dto';
import { ProductsModel } from '../../db/models/products.model';
import { UpdateProductDto } from '../../utils/dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

const LOGGER_PATTERN = 'PRODUCT-CONTROLLER';

@UseGuards(AuthGuard('jwt'))
@Controller('product')
export class ProductController {
  private readonly logger = new Logger(LOGGER_PATTERN);

  constructor(private readonly productService: ProductService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public async create(@Body() body: CreateProductDto, @Res() res: Response) {
    this.logger.log(`${LOGGER_PATTERN} - CREATE :: START`, body);
    const response: ProductsModel = await this.productService.create(body);
    this.logger.log(`${LOGGER_PATTERN} - CREATE :: END`, response);
    return res.status(HttpStatus.CREATED).send(response);
  }

  @HttpCode(HttpStatus.OK)
  @Put()
  public async update(@Body() body: UpdateProductDto, @Res() res: Response) {
    this.logger.log(`${LOGGER_PATTERN} - UPDATE :: START`, body);
    const response: ProductsModel = await this.productService.update(body);
    this.logger.log(`${LOGGER_PATTERN} - UPDATE :: END`, response);
    return res.status(HttpStatus.OK).send(response);
  }

  @HttpCode(HttpStatus.OK)
  @Delete()
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    this.logger.log(`${LOGGER_PATTERN} - DELETE :: START`, id);
    await this.productService.delete(id);
    this.logger.log(`${LOGGER_PATTERN} - DELETE :: END`, id);
    return res.status(HttpStatus.OK).send();
  }
}

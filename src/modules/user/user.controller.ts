import {
  Controller,
  HttpCode,
  HttpStatus,
  Res,
  Body,
  Put,
  Logger,
  UseGuards,
  Req,
  Param,
  ParseUUIDPipe,
  Delete,
  Get,
} from '@nestjs/common';
import { UpdateUserDto } from '../../utils/dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { IUserModel } from '../../utils/interfaces/user.interface';
import { AuthGuard } from '@nestjs/passport';

const LOGGER_PATTERN = 'USER-CONTROLLER';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  private readonly logger = new Logger(LOGGER_PATTERN);

  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Put()
  public async update(@Body() body: UpdateUserDto, @Res() res: Response) {
    this.logger.log(`${LOGGER_PATTERN} - UPDATE :: START`, body);
    const response: IUserModel = await this.userService.update(body);
    this.logger.log(`${LOGGER_PATTERN} - UPDATE :: END`, response);
    return res.status(HttpStatus.OK).send(response);
  }

  @HttpCode(HttpStatus.OK)
  @Get('/products')
  public async getUserProducts(@Req() req: Request, @Res() res: Response) {
    const { id: userId } = req.user as { id: string };
    this.logger.log(`${LOGGER_PATTERN} - USER-PRODUCTS :: START`, {
      userId,
    });
    const response = await this.userService.getUserProducts(userId);
    this.logger.log(`${LOGGER_PATTERN} - USER-PRODUCTS :: END`, response);
    return res.status(HttpStatus.OK).send(response);
  }

  @HttpCode(HttpStatus.CREATED)
  @Put('/:id')
  public async addProduct(
    @Req() req: Request,
    @Param('id') productId: string,
    @Res() res: Response,
  ) {
    const { id: userId } = req.user as { id: string };
    this.logger.log(`${LOGGER_PATTERN} - ADD-PRODUCT :: START`, {
      userId,
      productId,
    });
    const response = await this.userService.addProduct({ userId, productId });
    this.logger.log(`${LOGGER_PATTERN} - ADD-PRODUCT :: END`, response);
    return res.status(HttpStatus.CREATED).send(response);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/:id')
  public async removeProduct(
    @Req() req: Request,
    @Param('id', ParseUUIDPipe) productId: string,
    @Res() res: Response,
  ) {
    const { id: userId } = req.user as { id: string };
    this.logger.log(`${LOGGER_PATTERN} - REMOVE-PRODUCT :: START`, {
      userId,
      productId,
    });
    const response = await this.userService.removeProduct({
      userId,
      productId,
    });
    this.logger.log(`${LOGGER_PATTERN} - REMOVE-PRODUCT :: END`, response);
    return res.status(HttpStatus.CREATED).send(response);
  }
}

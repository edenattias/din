import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { CreateAccountDto } from '../../utils/dto';
import { IUserModel } from '../../utils/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(@Req() req: Request, @Res() res: Response) {
    const { accessToken }: { accessToken: string } =
      await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json({ accessToken });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('validate-token')
  public validateToken(@Req() req: Request, @Res() res: Response) {
    return res.status(HttpStatus.OK).json(req.user);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  public async create(@Body() body: CreateAccountDto, @Res() res: Response) {
    const response: IUserModel = await this.authService.create(body);
    return res.status(HttpStatus.CREATED).send(response);
  }
}

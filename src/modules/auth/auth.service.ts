import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DAL } from '../../db/DAL';
import { UsersModel } from '../../db/models/users.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateAccountDto } from '../../utils/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly DAL: DAL,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser(loginDetails: {
    username: string;
    password: string;
  }): Promise<{ id: string } | null> {
    const { username, password } = loginDetails;
    const selectedUser: UsersModel =
      await this.DAL.User.findUserByEmail(username);

    if (!selectedUser) return undefined;
    const isPasswordMatch: boolean = bcrypt.compareSync(
      password,
      selectedUser.password,
    );

    if (!isPasswordMatch) return undefined;
    const { id } = selectedUser;
    return { id };
  }

  public async login(user: any): Promise<{ accessToken: string }> {
    return {
      accessToken: this.jwtService.sign({
        userId: user.id,
        username: user.email,
      }),
    };
  }

  public async create(userDetails: CreateAccountDto): Promise<UsersModel> {
    const { email } = userDetails;
    const isDuplicated: UsersModel = await this.DAL.User.findUserByEmail(email);

    if (isDuplicated) throw new Error('User already exists');

    const { password: _, ...userDataWithOutPassword } = userDetails;
    const password = bcrypt.hashSync(_, 10);

    return this.DAL.User.create({ ...userDataWithOutPassword, password });
  }
}

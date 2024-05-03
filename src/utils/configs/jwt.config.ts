import { ConfigModule, ConfigService } from '@nestjs/config';

const jwtFactory = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXP_H'),
    },
  }),
  inject: [ConfigService],
};

export default jwtFactory;

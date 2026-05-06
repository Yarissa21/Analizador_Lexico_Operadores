import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnalizadorModule } from './analizador/analizador.module';

@Module({
  imports: [AnalizadorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

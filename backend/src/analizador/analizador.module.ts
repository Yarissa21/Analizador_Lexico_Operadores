import { Module } from '@nestjs/common';
import { AnalizadorController } from './analizador.controller';
import { AnalizadorService } from './analizador.service';

@Module({
  controllers: [AnalizadorController],
  providers: [AnalizadorService]
})
export class AnalizadorModule {}

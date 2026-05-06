import { Controller, Post, Body } from '@nestjs/common';
import { AnalizadorService } from './analizador.service';

@Controller('analizador')
export class AnalizadorController {

  constructor(
    private readonly analizadorService: AnalizadorService
  ) {}

  @Post('analizar')
  analizar(@Body('entrada') entrada: string) {
    return this.analizadorService.analizar(entrada);
  }
}
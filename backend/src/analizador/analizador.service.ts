import {
  Injectable,
  BadRequestException,
  InternalServerErrorException
} from '@nestjs/common';

@Injectable()
export class AnalizadorService {

  private expresionOperadores =
    /(\+\+|--|\+=|-=|\*=|\/=|==|!=|<=|>=|&&|\|\||[+\-*/=<>!&|])/g;

  analizar(entrada: string) {

    try {

      if (entrada === undefined || entrada === null) {
        throw new BadRequestException(
          'Debe enviar una cadena para analizar.'
        );
      }

      if (typeof entrada !== 'string') {
        throw new BadRequestException(
          'La entrada debe ser de tipo texto.'
        );
      }

      if (entrada.trim() === '') {
        throw new BadRequestException(
          'La entrada no puede estar vacía.'
        );
      }

      const coincidencias =
        entrada.match(this.expresionOperadores);

      if (!coincidencias) {
        throw new BadRequestException(
          'No se encontraron operadores válidos en la cadena.'
        );
      }

      return coincidencias.map(operador => ({
        tipo: this.obtenerTipo(operador),
        valor: operador
      }));

    } catch (error) {

      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Ocurrió un error interno al analizar la cadena.'
      );
    }
  }

  private obtenerTipo(operador: string): string {

    const operadoresCompuestos = [
      "++", "--",
      "+=", "-=",
      "*=", "/=",
      "==", "!=",
      "<=", ">=",
      "&&", "||"
    ];

    return operadoresCompuestos.includes(operador)
      ? 'Operador Compuesto'
      : 'Operador Simple';
  }
}
import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericGetOne(value: string, modelType: any) {
  return applyDecorators(
    ApiOkResponse({
      description: `Dados do ${value} solicitado`,
      type: modelType,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado' }),
    ApiOperation({ summary: `Retorna o ${value} pelo ID informado` }),
  );
}

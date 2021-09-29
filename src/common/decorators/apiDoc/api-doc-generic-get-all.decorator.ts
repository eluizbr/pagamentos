import { applyDecorators } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericGetAll(value: string, modelType: any) {
  return applyDecorators(
    ApiOkResponse({
      description: `Retorna todos os dados do ${value}`,
      type: modelType,
      isArray: true,
    }),
    ApiForbiddenResponse({ description: 'Acesso negado' }),
    ApiOperation({ summary: `Retorna todos os ${value}` }),
  );
}

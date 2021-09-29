import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericPost(
  value: string,
  modelType: any,
  modelBody: any,
) {
  return applyDecorators(
    ApiCreatedResponse({
      description: `O ${value} foi criado com sucesso`,
      type: modelType,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiForbiddenResponse({ description: 'Acesso negado' }),
    ApiBody({ type: modelBody }),
    ApiOperation({ summary: `Cria um novo ${value}` }),
  );
}

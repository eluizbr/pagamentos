import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericDelete(value: string) {
  return applyDecorators(
    ApiOperation({
      summary: `Remove o ${value} pelo ID informado`,
    }),
    ApiOkResponse({ description: `O ${value}, foi deletado com sucesso` }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiForbiddenResponse({ description: 'Acesso negado' }),
    ApiNotFoundResponse({
      description: `O ${value} não foi encontrado`,
    }),
  );
}

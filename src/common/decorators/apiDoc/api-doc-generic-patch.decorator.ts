import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export function ApiDocGenericPatch(
  value: string,
  modelType: any,
  modelBody: any,
) {
  return applyDecorators(
    ApiOperation({ summary: `Atualiza o ${value} pelo id informado` }),
    ApiBody({ type: modelType }),
    ApiOkResponse({
      description: `Dados do ${value} solicitado`,
      type: modelBody,
    }),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiForbiddenResponse({ description: 'Acesso negado.' }),
  );
}

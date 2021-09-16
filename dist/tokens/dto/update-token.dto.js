"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTokenDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_token_dto_1 = require("./create-token.dto");
class UpdateTokenDto extends (0, mapped_types_1.PartialType)(create_token_dto_1.CreateTokenDto) {
}
exports.UpdateTokenDto = UpdateTokenDto;
//# sourceMappingURL=update-token.dto.js.map
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiDocGenericDelete,
  ApiDocGenericGetAll,
  ApiDocGenericGetOne,
  ApiDocGenericPatch,
  ApiDocGenericPost,
} from 'src/modules/common/decorators/apiDoc';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@ApiTags('User')
@ApiBearerAuth()
// @UseGuards(AuthGuard())
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create new user
   */
  @Post()
  @ApiDocGenericPost('usuário', User, CreateUserDto)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Get all users
   */
  @Get()
  @ApiDocGenericGetAll('usuários', User)
  findAll() {
    return this.usersService.findAll();
  }

  /**
   * Get  user by ID
   */
  @Get(':id')
  @ApiDocGenericGetOne('usuário', User)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne({ id });
  }

  /**
   * Update user by ID
   */
  @Patch(':id')
  @ApiDocGenericPatch('usuário', User, User)
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateUserDto> {
    return this.usersService.update({ id }, updateUserDto);
  }

  /**
   * Remove user by ID
   */
  @Delete(':id')
  @ApiDocGenericDelete('usuário')
  remove(@Param('id') id: string) {
    return this.usersService.remove({ id });
  }
}

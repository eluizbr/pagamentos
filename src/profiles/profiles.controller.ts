import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The user profile has been successfully created.',
    type: Profile,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiBody({ type: Profile })
  @ApiOperation({ summary: 'Create new user profile' })
  async create(@Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.create(createProfileDto);
  }

  @ApiOkResponse({
    description: 'The user data',
    type: Profile,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get all user profiles' })
  @Get()
  findAll() {
    return this.profilesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user profile by ID' })
  @ApiOkResponse({
    description: 'The user profile data',
    type: Profile,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.profilesService.findOne({ id });
  }

  @ApiOperation({ summary: 'Update user profile by ID' })
  @ApiOkResponse({
    description: 'The user profile data',
    type: Profile,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Patch(':id')
  update(@Param('id') id: any, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.update({ id }, updateProfileDto);
  }

  @ApiOperation({ summary: 'Delete user profile by ID' })
  @ApiOkResponse({ description: 'Profile has been deleted successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Profile Not found' })
  @Delete(':id')
  remove(@Param('id') id: any) {
    return this.profilesService.remove(id);
  }
}

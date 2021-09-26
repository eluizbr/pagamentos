import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
import CreateProfileDto from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileUpdate } from './entities/update-profile.entity';
import { ProfilesService } from './profiles.service';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profiles')
@UseGuards(AuthGuard())
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
  async create(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.create(createProfileDto, req.user.id);
  }

  @Get()
  @ApiOkResponse({
    description: 'The user data',
    type: Profile,
    isArray: true,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiOperation({ summary: 'Get all user profiles' })
  findAll(@Request() req) {
    return this.profilesService.findAll({ userId: req.user.id });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one user profile by ID' })
  @ApiOkResponse({
    description: 'The user profile data',
    type: Profile,
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.profilesService.findOne({ id, userId: req.user.id });
  }

  @ApiOperation({ summary: 'Update user profile by ID' })
  @ApiOkResponse({
    description: 'The user profile data',
    type: ProfileUpdate,
  })
  @ApiBody({ type: ProfileUpdate })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Patch(':id')
  update(
    @Param('id') id: any,
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(
      { id, userId: req.user.id },
      updateProfileDto,
    );
  }

  @ApiOperation({ summary: 'Delete user profile by ID' })
  @ApiOkResponse({ description: 'Profile has been deleted successfully' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @ApiNotFoundResponse({ description: 'Profile Not found' })
  @Delete(':id')
  remove(@Param('id') id: any, @Request() req) {
    return this.profilesService.remove({ id, userId: req.user.id });
  }
}

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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import {
  ApiDocGenericDelete,
  ApiDocGenericGetAll,
  ApiDocGenericGetOne,
  ApiDocGenericPatch,
  ApiDocGenericPost,
} from 'src/modules/common/decorators/apiDoc';
import CreateProfileDto from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileResult } from './entities/profile.result.entity';
import { ProfileUpdate } from './entities/update-profile.entity';
import { ProfilesService } from './profiles.service';

@ApiBearerAuth()
@ApiTags('Profile')
@Controller('profiles')
@UseGuards(AuthGuard())
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiDocGenericPost('profile', Profile, Profile)
  async create(@Request() req, @Body() createProfileDto: CreateProfileDto) {
    return await this.profilesService.create(createProfileDto, req.user.id);
  }

  @Get()
  @ApiDocGenericGetAll('profile', ProfileResult)
  findAll(@Request() req) {
    return this.profilesService.findAll({ userId: req.user.id });
  }

  @Get(':id')
  @ApiDocGenericGetOne('profile', ProfileResult)
  findOne(@Param('id') id: string, @Request() req) {
    return this.profilesService.findOne({ id, userId: req.user.id });
  }

  @Patch(':id')
  @ApiDocGenericPatch('profile', ProfileUpdate, Profile)
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profilesService.update(
      { id, userId: req.user.id },
      updateProfileDto,
    );
  }

  @Delete(':id')
  @ApiDocGenericDelete('profile')
  remove(@Param('id') id: string, @Request() req) {
    return this.profilesService.remove({ id, userId: req.user.id });
  }
}

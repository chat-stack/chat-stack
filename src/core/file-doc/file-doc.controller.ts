import { Controller } from '@nestjs/common';

import { FileDocService } from './file-doc.service';

@Controller('file-doc')
export class FileDocController {
  constructor(private readonly fileDocService: FileDocService) {}

  // @Post()
  // create(@Body() createFileDocDto: CreateFileDocDto) {
  //   return this.fileDocService.create(createFileDocDto);
  // }

  // @Get()
  // findAll() {
  //   return this.fileDocService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fileDocService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateFileDocDto: UpdateFileDocDto) {
  //   return this.fileDocService.update(+id, updateFileDocDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fileDocService.remove(+id);
  // }
}

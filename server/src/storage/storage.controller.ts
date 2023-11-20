import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { FieldsService } from 'src/fields/fields.service';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/common/decorators';

const uploadPath = process.env.UPLOAD_PATH || 'storage';

@Controller('storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly fieldsService: FieldsService,
    private readonly userService: UsersService,
  ) {}
  private readonly logger = new Logger(StorageController.name);

  @Post('store')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, callback) => {
          const bizPath = req.body.bizFolder ? `/${req.body.bizFolder}` : '';
          const path = join(process.cwd(), '/', uploadPath, bizPath);
          fs.mkdirSync(path, { recursive: true });
          callback(null, path);
        },
        filename: (req, file, callback) => {
          return callback(null, file.originalname);
        },
      }),
    }),
  )
  async storeFile(
    @Req() req,
    @Res() res: Response,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    try {
      const bizPath = req.body.bizFolder ? '/' + req.body.bizFolder : '';
      const { isSuccess, newFile } = await this.storageService.addToCollection(
        req,
        `${bizPath}/${file.originalname}`,
      );

      if (!isSuccess) throw 'Fail to add file record to collection';

      if (req.body.type === 'field-image') {
        const targetField = await this.fieldsService.getDataByFilter(
          req.body.fieldId,
          undefined,
        );

        if (targetField[0].fileId) {
          this.storageService.removeFileFromDisk(targetField[0].fileId);
          Promise.all([
            this.storageService.checkDuplicate(
              targetField[0].fileId,
              req.body.fieldId,
            ),
            this.storageService.removeFromCollection(targetField[0].fileId),
          ]);
        }

        await this.fieldsService.updateFieldByFieldId(req.body.fieldId, {
          value: `${process.env.BASE_URL}/storage/${newFile._id}`,
          fileId: newFile._id,
        });
      } else if (req.body.type === 'avatar') {
        await this.userService.updateUserAvatar(
          req.body.userId,
          `${process.env.BASE_URL}/storage/${newFile._id}`,
        );
      }
      return res.send({
        isSuccess,
        path: `${process.env.BASE_URL}/storage/${newFile._id}`,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Public()
  @Get(':fileId')
  async downloadFile(@Res() res: Response, @Param('fileId') fileId: string) {
    const file = await this.storageService.getFileDocumentById(fileId);

    return res.sendFile(file.filename, {
      root: file.destination,
    });
  }

  // @Delete('file/:uid')
  // async deleteFileByUid(@Param('uid') uid: string) {
  //   const { fileName } = await this.attactmentService.deleteFileByUid(uid);

  //   fs.unlink(`${userHomeDir}/upload/po_img/${fileName}`, (err) => {
  //     if (err)
  //       console.log(
  //         `File not exist at : ${userHomeDir}/upload/po_img/${fileName}`,
  //       );
  //     else
  //       console.log(`Deleted file: ${userHomeDir}/upload/po_img/${fileName}`);
  //   });
  // }
}

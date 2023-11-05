import {
  Controller,
  FileTypeValidator,
  Get,
  Logger,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
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

const uploadPath = process.env.UPLOAD_PATH || 'storage';

@Controller('storage')
export class StorageController {
  constructor(
    private readonly storageService: StorageService,
    private readonly fieldsService: FieldsService,
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
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 300000 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
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
          value: `${bizPath}/${file.originalname}`,
          fileId: newFile._id,
        });
      }

      return res.send({
        isSuccess,
        path: `${bizPath}/${file.originalname}`,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get(':bizPath/:filename')
  downloadFile(
    @Res() res: Response,
    @Param('bizPath') bizPath: string,
    @Param('filename') filename: string,
  ) {
    const folderPath = bizPath ? '/' + bizPath : '';
    const path = join(process.cwd(), '/', uploadPath, folderPath);

    return res.sendFile(filename, {
      root: path,
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

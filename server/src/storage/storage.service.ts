import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Files } from 'src/schemas/files.schema';
import * as fs from 'fs';

@Injectable()
export class StorageService {
  constructor(@InjectModel(Files.name) private fileModel: Model<Files>) {}

  private readonly logger = new Logger(StorageService.name);

  async getFileDocumentById(fileId) {
    try {
      const file = await this.fileModel.findById(fileId);
      if (file === null || file === undefined) throw 'File does not exist';
      return file;
    } catch (error) {
      this.logger.error(error);
    }
  }

  async removeFileFromDisk(fileId: string) {
    try {
      const { path } = await this.getFileDocumentById(fileId);
      if (path === null || path === undefined) throw 'Path directory is null';
      fs.unlink(path, (err) => {
        if (err)
          this.logger.error(`[RemoveFileFromDisk] File not exist at : ${path}`);
        else this.logger.log(`Deleted file: ${path}`);
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  async removeDirectoryFromDisk(fileId: string) {
    const file = await this.fileModel.findById({ _id: fileId });
    fs.rmSync(file.destination, { recursive: true, force: true });
  }

  async checkDuplicate(fileId: string, fieldId: string) {
    try {
      const result = await this.fileModel.find({
        fieldId,
        _id: fileId,
      });
      if (result.length > 1) {
        this.logger.log('Duplicate record found');
        await this.fileModel.deleteOne({ fieldId, _id: fileId });
        this.logger.log('Duplicate record had been removed');
      }
    } catch (error) {
      this.logger.error(error);
    }
  }

  async removeFromCollection(fileId: string) {
    try {
      const isExist = await this.fileModel.exists({
        _id: fileId,
      });
      if (isExist === null) throw '[RemoveFromCollection] File does not exist';

      await this.fileModel.findByIdAndDelete(fileId);
      this.logger.log(`File ${fileId} had been removed`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async addToCollection(req: any, src: string) {
    try {
      const file = req.file;
      const fieldId = req.body.fieldId;
      const newFile = await this.fileModel.create({
        fieldId,
        originalName: file.originalName,
        filename: file.filename,
        destination: file.destination,
        path: file.path,
        size: file.size,
        fileType: file.mimetype,
        src: src,
      });
      this.logger.log('File stored');
      return {
        isSuccess: true,
        newFile,
      };
    } catch (error) {
      this.logger.error(error);
      return {
        isSuccess: false,
      };
    }
  }
}

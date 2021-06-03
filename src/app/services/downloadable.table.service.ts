import { ApiResponseModel } from '../models/api.response';
import { DownloadableFilesData } from '../mock/downloadable.file';
import { Injectable } from '@angular/core';

@Injectable()
export class DownloadableFilesService {

  constructor() {}

  getDownloadableFiles(): ApiResponseModel {
    return DownloadableFilesData;
  }  
}

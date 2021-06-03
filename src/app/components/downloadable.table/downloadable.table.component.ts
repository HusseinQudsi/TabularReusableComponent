import { Component, OnInit } from '@angular/core';
import { ApiResponseModel } from '../../models/api.response';
import { DownloadableFilesService } from '../../services/downloadable.table.service';


@Component({
  selector: 'downloadable-table',
  templateUrl: './downloadable.table.component.html',
  styleUrls: ['./downloadable.table.component.less'],
  providers: [DownloadableFilesService]
})

export class DownloadableTable implements OnInit {
  downloadableFiles: ApiResponseModel;
  title = 'Downloadable files table';
  
  constructor(private downloadableFilesService: DownloadableFilesService) { }

  cashLeft() {
    return console.log(this.downloadableFiles);
  }

  ngOnInit() {
    this.downloadableFiles = this.downloadableFilesService.getDownloadableFiles();
  }
}

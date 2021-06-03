import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DownloadableItems } from '../../models/downloadable.file';
import { DownloadableFilesService } from '../../services/downloadable.table.service';

@Component({
  selector: 'downloadable-table',
  templateUrl: './downloadable.table.component.html',
  styleUrls: ['./downloadable.table.component.less'],
  providers: [DownloadableFilesService]
})

export class DownloadableTable implements OnInit, OnDestroy {
  downloadableItems: DownloadableItems;
  subscription: Subscription;

  constructor(private downloadableFilesService: DownloadableFilesService) {
    this.subscription = this
      .downloadableFilesService
      .initObservable()
      .subscribe(items => this.downloadableItems = items);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.downloadableFilesService.getDownloadableItems();
  }
}

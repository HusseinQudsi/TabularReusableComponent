import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { DownloadableItem, DownloadableItems } from '../../models/downloadable.file';
import { DownloadableFilesService } from '../../services/downloadable.table.service';


@Component({
  selector: 'downloadable-table',
  templateUrl: './downloadable.table.component.html',
  styleUrls: ['./downloadable.table.component.less'],
  providers: [DownloadableFilesService],
  encapsulation: ViewEncapsulation.None
})

export class DownloadableTable implements OnInit, OnDestroy {
  downloadableItems: DownloadableItems;
  subscription: Subscription;

  constructor(public downloadableFilesService: DownloadableFilesService) {
    this.subscription = this
      .downloadableFilesService
      .initObservable()
      .subscribe(items => this.downloadableItems = items);
  }

  getCountText() {
    var selectedCount: number = this.downloadableItems.selectedCount;
    return selectedCount === 0 ? 'None Selected' : `Selected ${selectedCount}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.downloadableFilesService.getDownloadableItems();
  }

  onInputChange(downloadableItem: DownloadableItem) {
    this.downloadableFilesService.updateSelection(downloadableItem);
  }

  selectAll(event: Event): void {
    let target = event.target as HTMLInputElement;

    target.checked ?
      this.downloadableFilesService.selectAll() :
      this.downloadableFilesService.unSelectAll();
  }

  selectInput(event: Event, downloadableItem: DownloadableItem): void {
    let target = event.target as HTMLElement;
    let $tr = target.closest('tr') as HTMLTableRowElement;

    if (!!$tr) {

      let $input = $tr.getElementsByTagName('input');

      if (!!$input.length && !$input[0].disabled) {

        downloadableItem.isChecked = $input[0].checked = !$input[0].checked;
        this.onInputChange(downloadableItem);
      }
    }
  }
}

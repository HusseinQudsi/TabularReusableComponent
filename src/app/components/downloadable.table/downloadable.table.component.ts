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
  subtitle: string;
  title: string;

  constructor(public downloadableFilesService: DownloadableFilesService) {
    this.subscription = this
      .downloadableFilesService
      .initObservable()
      .subscribe(items => this.downloadableItems = items);
    this.subtitle = 'Please select files to be download from the list below, only available files can be selected.';
    this.title = 'downloadable files';
  }

  getCountText(): string {
    let selectedCount: number = this.downloadableItems.selectedCount;

    return selectedCount === 0 ?
      'None Selected' :
      `Selected ${selectedCount}`;
  }

  isSelectedAll(): boolean {
    return this.downloadableItems.isSelectedAll;
  }

  isIndeterminate(): boolean {
    return !this.downloadableItems.isSelectedAll && !!this.downloadableItems.selectedCount
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.downloadableFilesService.getDownloadableItems();
  }

  onInputChange(downloadableItem: DownloadableItem): void {
    this.downloadableFilesService.updateSelection(downloadableItem);
  }

  openAlertBox(): void {
    let selectedFilesInfo: string[] = this.downloadableFilesService.getAlertBoxContent();
    let selectedFilesInfoText = selectedFilesInfo.length ?
      selectedFilesInfo.join('\n') :
      'Please select a path';

    alert(selectedFilesInfoText);
  }

  selectAll(event: Event): void {
    let target = event.target as HTMLInputElement;

    target.checked ?
      this.downloadableFilesService.selectAll() :
      this.downloadableFilesService.unSelectAll();
  }

  selectInput(event: Event, downloadableItem: DownloadableItem): void {

    let target = event.target as HTMLElement;

    if (target.tagName === 'INPUT') {

      let $input = event.target as HTMLInputElement;

      downloadableItem.isChecked = $input.checked;
    } else {

      let $tr: HTMLTableRowElement = target.closest('tr') as HTMLTableRowElement;

      if (!!$tr) {

        let $input: HTMLCollectionOf<HTMLInputElement> = $tr.getElementsByTagName('input');

        if (!!$input.length && !$input[0].disabled) {

          downloadableItem.isChecked = $input[0].checked = !$input[0].checked;
          this.onInputChange(downloadableItem);
        }
      }
    }
  }
}

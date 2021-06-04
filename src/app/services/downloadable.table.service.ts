import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ApiResponseModel } from '../models/api.response';
import { downloadableFilesData } from '../mock/downloadable.file';
import { DownloadableItem, DownloadableItems } from '../models/downloadable.file';
import { copyObject } from '../services/utilities.service';

@Injectable()
export class DownloadableFilesService {
  // Private properties:
  private downloadableFilesData: DownloadableItems;
  private loggerContext: string = 'Downloadable service:';
  private subject = new Subject<DownloadableItems>();

  // Private methods:
  private applyEmptyTable(): void {
    this.downloadableFilesData = {
      // TODO: Adding empty state, if no error but the table is empty.
      errorState: true,
      isSelectedAll: false,
      selectedCount: 0,
      selectionItems: [
        {
          device: '',
          name: '',
          id: '',
          isChecked: false,
          path: '',
          status: '',
        }
      ],
    };
  }
  private applyTable(downloadableFiles: ApiResponseModel): void {
    const selectionItems: DownloadableItem[] = downloadableFiles
      .result
      .map(file => {
        return {
          device: file.device || '--',
          name: file.name || '--',
          id: file.id || uuidv4(),
          isChecked: false,
          path: file.path || '--', // TODO: We might need to use some regex to validated the file path. 
          status: file.status,
        };
      });

    // TODO: if selectionItems has too many items, we might need pagination.
    this.downloadableFilesData = {
      errorState: false,
      isSelectedAll: false,
      selectedCount: 0,
      selectionItems,
    };
  }
  private _bindToView(): void {

    let downloadableFilesContent: DownloadableItems;

    try {
      downloadableFilesContent = copyObject(this.downloadableFilesData);
    } catch (e) {
      console.error(`${this.loggerContext} error parsing table data.`);

      // Populating error state table
      this.applyEmptyTable();
      return this._bindToView();
    }

    this.subject.next(downloadableFilesContent);
  }

  // Public properties:
  getAlertBoxContent(): string[] {
    return this
      .downloadableFilesData.selectionItems
      .filter(file => file.isChecked)
      .map(file => `Path: ${file.path}. File: ${file.device}.\n`);
  }

  getDownloadableItems(): void {
    let downloadableFiles: ApiResponseModel = downloadableFilesData;

    if (!!downloadableFiles && !!Object.keys(downloadableFiles).length) {

      this.applyTable(downloadableFiles);

    } else {

      // TODO: 
      // 1. add global logger service, log out error for reporting API return empty data.
      // 2. add feature flag for error out table, for testing etc.
      console.error(`${this.loggerContext} API Error, returning empty data.`);

      this.applyEmptyTable();
    }

    this._bindToView();
  }

  initObservable(): Observable<any> {
    return this.subject.asObservable();
  }

  selectAll(): void {
    this.downloadableFilesData.selectionItems.forEach(item => {
      if (item.status === 'available') {
        item.isChecked = true;
      }
    });

    this.updateSelection();
  }

  unSelectAll(): void {
    this.downloadableFilesData.selectionItems.forEach(item => item.isChecked = false);
    this.updateSelection();
  }

  updateSelection(downloadableItem?: DownloadableItem): void {

    let selectedCount: number = 0;

    this.downloadableFilesData.selectionItems.forEach(file => {
      if (downloadableItem && file.id === downloadableItem.id) {
        file.isChecked = downloadableItem.isChecked;
      }
      if (file.isChecked) {
        selectedCount++;
      }
    });

    this.downloadableFilesData.isSelectedAll = this.
      downloadableFilesData.selectionItems
      .filter(file => file.status === 'available')
      .length === selectedCount;

    this.downloadableFilesData.selectedCount = selectedCount;
    this._bindToView();
  }
}

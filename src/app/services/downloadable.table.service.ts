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
  private _downloadableFilesData: DownloadableItems;
  private _loggerContext: string = 'Downloadable service:';
  private _subject = new Subject<DownloadableItems>();

  // Private methods:
  private _applyEmptyTable(): void {
    this._downloadableFilesData = {
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
  private _applyTable(downloadableFiles: ApiResponseModel): void {
    let selectionItems: DownloadableItem[] = downloadableFiles
      .result
      .map(file => {
        return {
          device: file.device || '--',
          name: file.name || '--',
          id: file.id || uuidv4(),
          isChecked: false,
          path: file.path || '--',
          status: file.status,
        };
      });

    this._downloadableFilesData = {
      errorState: false,
      isSelectedAll: false,
      selectedCount: 0,
      selectionItems,
    };
  }
  private _bindToView(): void {

    let downloadableFilesContent: DownloadableItems;

    try {
      downloadableFilesContent = copyObject(this._downloadableFilesData);
    } catch (e) {
      console.error(`${this._loggerContext} error parsing table data.`);

      // Populating error state table
      this._applyEmptyTable();
      return this._bindToView();
    }

    this._subject.next(downloadableFilesContent);
  }

  // Public properties:
  getDownloadableItems(): void {
    let downloadableFiles: ApiResponseModel = downloadableFilesData;

    if (!!downloadableFiles && !!Object.keys(downloadableFiles).length) {

      this._applyTable(downloadableFiles);

    } else {

      // TODO: 
      // 1. add global logger service, log out error for reporting API return empty data.
      // 2. add feature flag for error out table, for testing etc.
      console.error(`${this._loggerContext} API Error, returning empty data.`);

      this._applyEmptyTable();
    }

    this._bindToView();
  }

  initObservable(): Observable<any> {
    return this._subject.asObservable();
  }

  selectAll(): void {
    this._downloadableFilesData.selectionItems.forEach(item => {
      if (item.status === 'available') item.isChecked = true;
    });

    this.updateSelection();
  }

  unSelectAll(): void {
    this._downloadableFilesData.selectionItems.forEach(item => item.isChecked = false);
    this.updateSelection();
  }

  updateSelection(downloadableItem?: DownloadableItem): void {

    var selectedCount: number = 0;

    this._downloadableFilesData.selectionItems.forEach(file => {
      if (downloadableItem && file.id == downloadableItem.id) {
        file.isChecked = downloadableItem.isChecked;
      }
      if (file.isChecked) selectedCount++;
    });

    this._downloadableFilesData.isSelectedAll = this.
      _downloadableFilesData.selectionItems
      .filter(file => file.status === 'available')
      .length === selectedCount;

    this._downloadableFilesData.selectedCount = selectedCount;
    this._bindToView();
  }
}

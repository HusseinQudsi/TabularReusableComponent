import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DownloadableItem } from '../../../../../models/downloadable.file';

@Component({
  selector: '[table-row]',
  templateUrl: './table.row.component.html',
  styleUrls: ['./table.row.component.less']
})

export class TableRow {
  @Input() downloadableFile: DownloadableItem;
  @Output() inputChange: EventEmitter<DownloadableItem> = new EventEmitter();

  getStatusText(status: string) {
    return status === 'available' ? 'Available' : 'Scheduled';
  }

  onChange(downloadableFile: DownloadableItem, event: Event) {

    let target = event.target as HTMLInputElement;

    downloadableFile.isChecked = target.checked;
    this.inputChange.emit(downloadableFile);
  }
}

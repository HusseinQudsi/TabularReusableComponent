export interface DownloadableFile {
  device: string;
  id?: string;
  name: string;
  path: string;
  status: string;
}

export interface DownloadableItem extends DownloadableFile {
  isChecked: boolean;
}

export interface DownloadableItems {
  errorState: boolean;
  isSelectedAll: boolean;
  selectedCount: number;
  selectionItems: DownloadableItem[];
}

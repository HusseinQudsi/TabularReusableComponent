export class DownloadableFile {
  device: string
  id?: string
  name: string
  path: string
  status: string
}

export class DownloadableItem extends DownloadableFile {
  isChecked: boolean
}

export class DownloadableItems {
  errorState: boolean
  isSelectedAll: boolean
  selectedCount: number
  selectionItems: DownloadableItem[]
}

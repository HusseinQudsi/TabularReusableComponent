import { v4 as uuidv4 } from 'uuid';
import { ApiResponseModel } from '../models/api.response';

export const DownloadableFilesData: ApiResponseModel = {
  result: [
    {
      id: uuidv4(),
      name: 'smss.exe',
      device: 'Stark',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
      status: 'scheduled'
    },
    {
      id: uuidv4(),
      name: 'netsh.exe',
      device: 'Targaryen',
      path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
      status: 'available'
    },
    {
      id: uuidv4(),
      name: 'uxtheme.dll',
      device: 'Lannister',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
      status: 'available'
    },
    {
      id: uuidv4(),
      name: 'cryptbase.dll',
      device: 'Martell',
      path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
      status: 'scheduled'
    },
    {
      id: uuidv4(),
      name: '7za.exe',
      device: 'Baratheon',
      path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
      status: 'scheduled'
    }
  ],
  total: 5,
};
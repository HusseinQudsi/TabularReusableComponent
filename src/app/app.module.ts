import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.root/app.component';
import { DownloadableTable } from './components/downloadable.table/downloadable.table.component';
import { TableHeader } from './components/downloadable.table/components/table/table.header/table.header.component';
import { TableRow } from './components/downloadable.table/components/table/table.row/table.row.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DownloadableTable,
    TableHeader,
    TableRow
  ],
  imports: [
    BrowserModule
  ],

  providers: []
})
export class AppModule { }

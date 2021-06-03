import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './components/app.root/app.component';
import { DownloadableTable } from './components/downloadable.table/downloadable.table.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    DownloadableTable,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
})
export class AppModule { }

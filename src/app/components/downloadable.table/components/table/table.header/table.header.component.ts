import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[table-header]',
  templateUrl: './table.header.component.html',
  styleUrls: ['./table.header.component.less']
})

export class TableHeader implements OnInit {
  tableHeader: String[];

  ngOnInit() {

    this.tableHeader = ['Name', 'Device', 'Path', 'Status'];
  }
}

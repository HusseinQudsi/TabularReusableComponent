import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[table-row]',
  templateUrl: './table.row.component.html',
  styleUrls: ['./table.row.component.less']
})

export class TableRow implements OnInit {
  title = 'Downloadable files table';
  
  constructor() { }

  ngOnInit() {
    
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRow } from './table.row.component';

describe('TableRow', () => {

  let fixture: ComponentFixture<TableRow>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableRow],
    });

    fixture = TestBed.createComponent(TableRow);
  });

  it('Component should be defined', () => {
    expect(fixture.debugElement.componentInstance).toBeDefined();
  });

  // TODO: running out of time, please add remaining UT:
});

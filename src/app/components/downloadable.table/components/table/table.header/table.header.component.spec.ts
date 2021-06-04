import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeader } from './table.header.component';

describe('TableHeader', () => {

  let fixture: ComponentFixture<TableHeader>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableHeader],
    });

    fixture = TestBed.createComponent(TableHeader);
  });

  it('Component should be defined', () => {
    expect(fixture.debugElement.componentInstance).toBeDefined();
  });

  it('Component should have 5 header cells.', () => {
    const comp = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(comp.tableHeader.length).toEqual(5);
  });

  it('Component should the folowing header cells values.', () => {
    const comp = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    expect(comp.tableHeader.join()).toEqual(",Name,Device,Path,Status");
  });
});
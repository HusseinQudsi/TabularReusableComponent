import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DownloadableFilesService } from '../../services/downloadable.table.service';
import { DownloadableTable } from './downloadable.table.component';

describe('DownloadableTable', () => {

    let fixture: ComponentFixture<DownloadableTable>;
    let component: DownloadableTable;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [DownloadableTable],
            providers: [{ provide: DownloadableFilesService }]
        });

        fixture = TestBed.createComponent(DownloadableTable);
        component = fixture.componentInstance;
    });

    it('Component should be defined', () => {
        expect(component).toBeDefined();
    });

    it('Component should display title', () => {
        expect(component.title).toBe('downloadable files');
    });

    it('Component should display subtitle', () => {
        expect(component.subtitle).toBe('Please select files to be download from the list below, only available files can be selected.');
    });

    it('Component should have a total of 5 rows.', () => {
        const app = fixture.debugElement.componentInstance;

        fixture.detectChanges();
        expect(app.downloadableItems.selectionItems.length).toEqual(5);
    });

    it('Component\'s error state should be false.', () => {
        fixture.detectChanges();
        expect(component.downloadableItems.errorState).toBe(false);
    });

    it('Component\'s select all input should be false.', () => {
        fixture.detectChanges();
        expect(component.downloadableItems.isSelectedAll).toBe(false);
    });


    it('Component\'s selected count should be 0.', () => {
        fixture.detectChanges();
        expect(component.downloadableItems.selectedCount).toBe(0);
    });
});
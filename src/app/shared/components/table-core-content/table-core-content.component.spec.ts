import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCoreContentComponent } from './table-core-content.component';

describe('TableCoreContentComponent', () => {
  let component: TableCoreContentComponent;
  let fixture: ComponentFixture<TableCoreContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableCoreContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCoreContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

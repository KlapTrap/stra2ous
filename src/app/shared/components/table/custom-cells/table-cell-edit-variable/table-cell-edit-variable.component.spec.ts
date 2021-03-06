import { AppEnvVar } from '../../../../data-sources/cf-app-variables-data-source';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableCellEditVariableComponent } from './table-cell-edit-variable.component';
import { CoreModule } from '../../../../../core/core.module';
import { ITableDataSource } from '../../../../data-sources/table-data-source';

describe('TableCellEditVariableComponent', () => {
  let component: TableCellEditVariableComponent<AppEnvVar>;
  let fixture: ComponentFixture<TableCellEditVariableComponent<AppEnvVar>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TableCellEditVariableComponent],
      imports: [
        CoreModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableCellEditVariableComponent);
    component = fixture.componentInstance;
    component.row = {
      name: 'name',
      value: 'value'
    };
    component.dataSource = {} as ITableDataSource<AppEnvVar>;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

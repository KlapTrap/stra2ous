/* tslint:disable:no-access-missing-member https://github.com/mgechev/codelyzer/issues/191*/
import { Component, OnInit } from '@angular/core';
import { ITableDataSource } from '../../../data-sources/table-data-source';
import { TableCellCustom } from '../table-cell/table-cell-custom';

@Component({
  selector: 'app-table-cell-select',
  templateUrl: './table-cell-select.component.html',
  styleUrls: ['./table-cell-select.component.scss']
})
export class TableCellSelectComponent<T> extends TableCellCustom<T> { }
/* tslint:enable:no-access-missing-member */

import { NgContentDef } from '@angular/core/src/view';
import {
  Component,
  OnInit,
  Input, Renderer2, ElementRef, ComponentFactoryResolver, ViewContainerRef, ViewChild, ContentChild, TemplateRef, ContentChildren, forwardRef
} from '@angular/core';
import { ITableDataSource } from '../../data-sources/table-data-source';
import { MdTable } from '@angular/material';
import { TableCoreContentComponent } from '../table-core-content/table-core-content.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-table-core',
  templateUrl: './table-core.component.html',
  styleUrls: ['./table-core.component.scss'],
  entryComponents: [MdTable],
})
export class TableCoreComponent implements OnInit {

  // See https://github.com/angular/angular-cli/issues/2034 for weird definition
  @Input('dataSource') dataSource = null as ITableDataSource;

  // @ContentChild(TableCoreContentComponent) content;
  // @ViewChild('template') content2: TemplateRef<any>;
  // @ContentChild('template') content2: TemplateRef<any>;

  // @ViewChild('appTableCoreTemplate') content2: TemplateRef<any>;
  // @ViewChild('container') content: ElementRef;
  // @ViewChild('table') table2: MdTable<any>;
  // @ViewChild('table', { read: ViewContainerRef }) table: ViewContainerRef;

  // @ViewChild('container', { read: ViewContainerRef }) viewContainer: ViewContainerRef;
  // @ContentChildren(Content) componentBInstances;

  innerHtml2 = `<ng-container mdColumnDef="timestamp">
  <md-header-cell *mdHeaderCellDef md-sort-header> Timestamp </md-header-cell>
  <md-cell *mdCellDef="let row">{{row.entity.timestamp | date:'medium'}}</md-cell>
</ng-container>
<md-header-row *mdHeaderRowDef="['timestamp']">
</md-header-row>
<md-row *mdRowDef="let row; columns: ['timestamp'];">
</md-row>`;
  innerHtml1: any;

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private sanitizer: DomSanitizer
  ) {
    this.innerHtml1 = this.sanitizer.bypassSecurityTrustHtml(this.innerHtml2);
  }

  ngOnInit() {
    console.log('1 ', this.content);
    console.log('1 ', this.el.nativeElement.text);
    console.log('1', this.content2);
    // this.innerHtml1 = this.sanitizer.bypassSecurityTrustHtml(this.innerHtml2);
    console.log('1', this.innerHtml1);
    // let b = new TemplateRef<any>();
    // this.renderer.
    // this.table2.ngOnInit();

    // this.table2.ng();

    // const a = this.viewContainerRef.createEmbeddedView(this.content2);
    // this.table.
    // this.table.insert(a, 0);

    // el.hostView
    // console.log(this.content);
    // #table [hidden]="dataSource.mdPaginator.length === 0" [dataSource]="dataSource" mdSort
    // const mdTable = this.renderer.createElement('md-table');
    // this.renderer.
    // this.renderer.setAttribute(mdTable, '[dataSource]', 'dataSource');
    // this.renderer.addClass(this.el.nativeElement, 'wild')
    // this.renderer.appendChild(div, text);

    // console.log(this.templateRef);
    // console.log(this.viewContainer);

    // console.log(this.template);
    // this.renderer.appendChild(componentRef, text);
    // console.log(this.viewContainerRef.get(0));
    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MdTable);
    // const componentRef = this.viewContainerRef.createComponent(componentFactory);
    // console.log(componentRef.instance._columnDefinitions);
    // console.log(componentRef.instance._headerDefinition);
    // console.log(componentRef.instance.);

    // (<MdTable<any>>componentRef.instance).dataSource = this.dataSource;
  }

  ngAfterContentInit() {
    // this.table2.ngAfterContentInit();
    // this.table2.
    console.log('2', this.content);
    console.log('2', this.content2);
  }

  ngAfterViewInit() {
    console.log('3', this.content);
    console.log('3 ', this.el.nativeElement.text);
    console.log('3', this.content2);
    // setTimeout(() => this.viewContainerRef.createEmbeddedView(this.content2));


    // const table = this.viewContainerRef.get(0);
    // table.in

    // const a = this.viewContainerRef.createEmbeddedView(this.content2);
    // // this.table.
    // this.table.insert(a, 0);



    // const componentFactory = this.componentFactoryResolver.resolveComponentFactory(MdTable);
    // const componentRef = this.viewContainerRef.createComponent(componentFactory);

    // componentRef.hostView.
    // this.viewContainerRef.insert(componentRef.hostView, 0);






    // this.viewContainerRef.createEmbeddedView(this.content2);// Adds next to
    // this.viewContainerRef.createComponent(this.content2);//Adds next to
    // console.log(this.content);
    // console.log(this.content.nativeElement);
    // this.content.dataSource = this.dataSource;
    // console.log(this.template);
    // console.log(this.viewContainer);

    // this.viewContainerRef.clear();
    // console.log(this.viewContainerRef.get(0));
    // console.log(this.viewContainerRef.get(1));
    // console.log(this.viewContainerRef.get(2));

    // this.viewContainerRef.get()
    // componentRef
    // this.viewContainerRef.insert(componentRef.hostView);

    // console.log(this.viewContainerRef.get(0));
    // console.log(this.viewContainerRef.get(1));
    // console.log(this.viewContainerRef.get(2));
    // componentRef.
    // this.renderer.appendChild(componentRef.hostView, this.content2.nativeElement);

    // this.renderer.appendChild(this.el.nativeElement, co)
  }

}
// https://github.com/angular/material2/pull/6747


import { NgContentAst } from '@angular/compiler';
import { Component, OnInit, TemplateRef, ContentChild, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-table-core-content',
  templateUrl: './table-core-content.component.html',
  styleUrls: ['./table-core-content.component.scss']
})
export class TableCoreContentComponent implements OnInit {

  // @ViewChild(TemplateRef) content: TemplateRef<any>;
  // @ViewChild(NgContentAst) a: TemplateRef<any>;


  constructor(public el: ElementRef, ) { }

  ngOnInit() {
    // console.log(this.content);
  }

  ngAfterContentInit() {
    // console.log(this.content.createEmbeddedView({}));
    // console.log(this.content);
  }

  ngAfterViewInit() {
    // console.log(this.content);
  }

}

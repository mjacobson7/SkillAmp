import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {

  // Page Data
  @Input() columns;
  @Input() rows;

  // Pagination
  @Input() pageSize: number; //limit
  @Input() pageSizeOptions: [number];
  @Input() length: number; //count
  @Input() pageNumber: number; //offset
  @Input() orderBy: string;
  @Input() orderDir: string;
  pagesArray = [];
  begIndex: number = null;
  endIndex: number = null;

  // Filter
  @Input() enableFilter: boolean;
  searchText: string = "";

  //Header Buttons
  @Input() buttonHeader: [any];

  //Action Buttons
  @Input() actionButtons: [any];

  // Callback methods
  @Output() sortCallback = new EventEmitter();
  @Output() pageCallback = new EventEmitter();
  @Output() buttonCallback = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {

    if(changes['rows']) {
        this.begIndex = (this.pageNumber - 1) * this.pageSize + 1;
        this.endIndex = this.begIndex + this.rows.length - 1;

        this.length === 0 ? this.begIndex = 0 : '';
    }


    this.getPagesArray();
  }

  getPagesArray() {
    this.pagesArray.length = 0;
    //only want 5 page numbers showing at a time, ideally 2 on each side of the active one
    let frontPage = this.pageNumber - 2;
    let endPage = this.pageNumber + 2;
    if (frontPage < 1) {
      //can't have two on front, add needed on end
      endPage += (frontPage * -1) + 1;
      //frontPage then becomes 1
      frontPage = 1;
    }
    if (endPage > Math.ceil(this.length / this.pageSize)) {
      //can't have two on end, add needed to front
      frontPage -= (endPage - this.length / this.pageSize);
      //endPage then becomes the last one
      endPage = Math.ceil(this.length / this.pageSize);
      //check frontPage one last time
      if (frontPage < 1) {
        frontPage = 1;
      }
    }
    for (let currPage = frontPage; currPage <= endPage; currPage++) {
      this.pagesArray.push(currPage);
    }
  }

  firstClicked() {
    this.pageNumber = 1;
    this.onPageChange();
  }
  nextClicked() {
    this.pageNumber++;
    this.pageNumber > this.length ? this.pageNumber = this.length : '';
    this.onPageChange();
  }

  previousClicked() {
    this.pageNumber--;
    this.pageNumber < 1 ? this.pageNumber = 1 : '';
    this.onPageChange();
  }
  lastClicked() {
    this.pageNumber = Math.ceil(this.length / this.pageSize);
    this.onPageChange();
  }

  onPageChange() {
    let page = {
      pageSize: this.pageSize,
      length: this.length,
      pageNumber: this.pageNumber,
      orderBy: this.orderBy,
      orderDir: this.orderDir,
      searchText: this.searchText
    }
    this.pageCallback.emit(page);
  }

  onButtonClick(row, field) {
    this.buttonCallback.emit({row, field});
  }

  onPageSizeChange(pageSizeEvent) {
    this.pageSize = pageSizeEvent;
    if(this.pageSize > this.length) {
      this.pageNumber = 1;
    }
    this.onPageChange();
  }

  onFilter(searchText) {
    if (searchText !== this.searchText) {
      this.searchText = searchText;
      this.onPageChange();
    }
  }

  onSort(col) {
    this.orderDir === 'DESC' ? this.orderDir = 'ASC' : this.orderDir = 'DESC';
    this.orderBy = col;
    this.onPageChange();
  }

  gotoPage(currPage) {
    this.pageNumber = currPage;
    this.onPageChange();
  }

}

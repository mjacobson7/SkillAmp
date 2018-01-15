import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';



@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  displayedColumns = ['rank', 'name', 'score', 'supervisor'];
  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  constructor() { }
  
    ngOnInit() {
  
    }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


export interface Element {
  name: string;
  rank: number;
  score: number;
  supervisor: string;
}

const ELEMENT_DATA: Element[] = [
  {rank: 1, name: 'Ryan Gray', score: 5.00, supervisor: 'Jim Carter'},
  {rank: 2, name: 'Max Jacobson', score: 4.95, supervisor: 'Jim Carter'},
  {rank: 3, name: 'Sushant Shrestha', score: 4.90, supervisor: 'Jim Carter'},
  {rank: 4, name: 'Paul Mefford', score: 4.75, supervisor: 'Jim Carter'},
  {rank: 5, name: 'Matt Behrend', score:4.60, supervisor: 'Jim Carter'},
  {rank: 6, name: 'Lea Burr', score: 4.30, supervisor: 'Jim Carter'},
  {rank: 7, name: 'Jordan Woodhouse', score: 4.20, supervisor: 'Jim Carter'},
  {rank: 8, name: 'Jaron Mathis', score: 4.00, supervisor: 'Jim Carter'},
  {rank: 9, name: 'Jake White', score: 3.95, supervisor: 'Jim Carter'},
  {rank: 10, name: 'Chris Duran', score: 3.80, supervisor: 'Jim Carter'},
  {rank: 11, name: 'Bethany Woodhouse', score: 3.5, supervisor: 'Jim Carter'},
  {rank: 12, name: 'Spencer Jacox', score: 3.25, supervisor: 'Jim Carter'},
  {rank: 13, name: 'Carly Warner', score: 3.15, supervisor: 'Jim Carter'},
  {rank: 14, name: 'Brandon Howell', score: 3.00, supervisor: 'Jim Carter'},
  {rank: 15, name: 'Brian Haney', score: 2.80, supervisor: 'Jim Carter'},
  {rank: 16, name: 'Eric Peterson', score: 2.80, supervisor: 'Jim Carter'},
  {rank: 17, name: 'Joey Eva', score: 2.60, supervisor: 'Jim Carter'},
  {rank: 18, name: 'James Mitchell', score: 2.45, supervisor: 'Jim Carter'},
  {rank: 19, name: 'Chris Johanson', score: 2.05, supervisor: 'Jim Carter'},
  {rank: 20, name: 'Alex Fredrickson', score: 1.25, supervisor: 'Jim Carter'},
];


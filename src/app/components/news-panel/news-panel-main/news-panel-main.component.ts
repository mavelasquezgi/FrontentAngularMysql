import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news-panel-main',
  templateUrl: './news-panel-main.component.html',
  styleUrls: ['./news-panel-main.component.scss']
})
export class NewsPanelMainComponent implements OnInit {

  constructor(public datepipe: DatePipe) {

  }

  ngOnInit(): void {

  }



}

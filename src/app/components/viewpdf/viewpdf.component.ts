import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewpdf',
  templateUrl: './viewpdf.component.html',
  styleUrls: ['./viewpdf.component.scss']
})
export class ViewpdfComponent implements OnInit {

  idNote: string = '';
  press: string = '';
  datetime: string = '';
  urlPDF: string = '';

  constructor(protected sanitizer: DomSanitizer, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

}

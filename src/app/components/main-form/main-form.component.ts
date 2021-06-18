import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UploadService } from '../../_services/upload.service';
import { MatDialog } from '@angular/material/dialog';
//import { NewCategoryDialog, NewEmailDialog, NewFeatureDialog, NewKeywordDialog } from '../../modals/form.modals';
import { ResponseStateCityI } from '../../_models/interfaceStateCity';
import { DatePipe } from '@angular/common';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-main-form',
  templateUrl: './main-form.component.html',
  styleUrls: ['./main-form.component.scss']
})

export class MainFormComponent implements OnInit {

  uploadedFiles: Array<File>;
  listStations: any[];
  arrayCategories: string[];
  arrayKeyWords: string[];
  arrayFeatures: string[];
  timeBands: string[];
  emails: any[];
  whats: any[];
  selectedEmails: string[] = [];
  selectedWhats: string[] = [];
  selectedCategories: string[] = [];
  selectedKeyWords: string[] = [];
  selectedFeatures: string[] = ['Noticia'];
  customersList: string[] = [];
  station: string = '';
  selectable = true;
  removable = true;
  progress: number = 0;

  //Reactive Form
  autoForm = this.fb.group({
    title: ['', Validators.required],
    file: ['', Validators.required],
    notedate: ['', Validators.required],
    station: ['', Validators.required],
    timeband: ['', Validators.required],
    day: ['', Validators.required],
    customer: ['', Validators.required],
    categories: ['', Validators.required],
    incidence: ['', Validators.required],
    assessment: ['', Validators.required],
    covering: ['', Validators.required],
    features: [['Noticia'], Validators.required],
    program: ['', Validators.required],
    keywords: ['', Validators.required],
    binterview: ['', Validators.required],
    thematic: ['', Validators.required],
    emails: [''],
    whats: [''],
    emailbox: [''],
    whatsbox: [''],
    cost: ['', Validators.required],
    comunication: ['', Validators.required],
    audience: ['', Validators.required],
    personage: ['', Validators.required],
    duration: ['', Validators.required]
  });

  constructor(protected uploadServices: UploadService, protected fb: FormBuilder, public dialog: MatDialog, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.loadCustomers();
    this.loadStations();
    this.getFormFeatures();
    this.getFormTimeBands();
  }

  async onSubmit(autoFormValues: any) {
    let stateCity: any = await this.getStateCityStation(this.autoForm.get('station').value);
    let formData = new FormData();                //--fix body
    let file: File = this.uploadedFiles[0];
    formData.append("title", autoFormValues.title);
    formData.append("file", file, file.name);
    formData.append("notedate", this.datepipe.transform(autoFormValues.notedate, 'yyyy-MM-dd_HH:mm'));
    formData.append("timeband", autoFormValues.timeband);
    formData.append("day", autoFormValues.day);
    formData.append("customer", autoFormValues.customer);
    formData.append("categories", btoa(encodeURIComponent(JSON.stringify(this.selectedCategories))));
    formData.append("incidence", autoFormValues.incidence);
    formData.append("assessment", autoFormValues.assessment);
    formData.append("covering", autoFormValues.covering);
    formData.append("features", btoa(encodeURIComponent(JSON.stringify(this.selectedFeatures))));
    formData.append("program", autoFormValues.program);
    formData.append("keywords", btoa(encodeURIComponent(JSON.stringify(this.selectedKeyWords))));
    formData.append("binterview", autoFormValues.binterview);
    formData.append("thematic", autoFormValues.thematic);
    formData.append("emails", btoa(encodeURIComponent(JSON.stringify(this.selectedEmails))));
    formData.append("whats", btoa(encodeURIComponent(JSON.stringify(this.selectedWhats))));
    formData.append("city", stateCity.city);
    formData.append("state", stateCity.state);
    formData.append("cost", autoFormValues.cost);
    formData.append("comunication", autoFormValues.comunication);
    formData.append("audience", autoFormValues.audience);
    formData.append("personage", autoFormValues.personage);
    formData.append("duration", autoFormValues.duration);
    formData.append("user", localStorage.getItem("ID"));
    let checkbox = '0';
    if (autoFormValues.emailbox && autoFormValues.whatsbox) {
      checkbox = '3'
    } else {
      if (autoFormValues.emailbox) {
        checkbox = '1'
      } else {
        if (autoFormValues.whatsbox) {
          checkbox = '2'
        } else {
          checkbox = '0'
        }
      }
    }
    formData.append("check", checkbox);
    this.uploadServices.upload(formData, this.autoForm.get('station').value).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          setTimeout(() => {
            alert('Noticia cargada exitosamente!');
            this.resetForm();
          }, 500);
      }
    }, (err) => {
      setTimeout(() => {
        alert('Error ' + err.error.err);
        this.resetForm();
      }, 500);

    })
  }

  loadStations() {

  }

  loadCustomers() {

  }

  resetForm() {
    this.selectedEmails = [];
    this.selectedCategories = [];
    this.selectedWhats = [];
    this.selectedFeatures = [];
    this.station = '';
    this.progress = 0;
    this.autoForm.reset();
  }

  emailcheckbox(event: any) {
    if (event.checked) {
      this.autoForm.get('emails').setValidators([Validators.required]);
      this.autoForm.get('emails').updateValueAndValidity();
    } else {
      this.autoForm.get('emails').setErrors(null);
      this.autoForm.get('emails').clearValidators();
      this.autoForm.get('emails').updateValueAndValidity();
    }
  }

  whatsappcheckbox(event: any) {
    if (event.checked) {
      this.autoForm.get('whats').setValidators([Validators.required]);
      this.autoForm.get('whats').updateValueAndValidity();
    } else {
      this.autoForm.get('whats').setErrors(null);
      this.autoForm.get('whats').clearValidators();
      this.autoForm.get('whats').updateValueAndValidity();
    }
  }

  getStateCityStation(station: string) {

  }

  getFormCategories() {

  }

  getFormCategoriesByCustomer(customer: string) {

  }

  getFormEmailsM() {

  }

  getFormEmails(customer: string) {

  }

  getFormWhats(customer: string) {

  }

  getFormKeyWords(categories) {

  }

  getFormFeatures() {

  }

  getFormTimeBands() {

  }

  createFormEmail(newEmail: string) {

  }

  createFormCategory(newCategory: string) {

  }

  createFeature(newFeature: string) {

  }

  onClientChange(event: any) {
    this.selectedEmails = [];
    this.selectedCategories = [];
    this.selectedKeyWords = [];
    this.selectedWhats = [];
    this.autoForm.get('emails').reset();
    this.autoForm.get('whats').reset();
    this.autoForm.get('categories').reset();
    this.autoForm.get('keywords').reset();
    this.getFormEmails(event);
    this.getFormWhats(event);
    this.getFormCategoriesByCustomer(event);
  }

  onEmailsChange() {
    this.selectedEmails = this.autoForm.get('emails').value;
  }

  onWhatsChange() {
    this.selectedWhats = this.autoForm.get('whats').value;
  }

  onCategoriesChange() {
    this.selectedCategories = this.autoForm.get('categories').value;
    this.selectedKeyWords = [];
    this.autoForm.get('keywords').reset();
    this.getFormKeyWords(this.selectedCategories);
  }

  onKeyWordsChange() {
    this.selectedKeyWords = this.autoForm.get('keywords').value;
  }


  onFeaturesChange() {
    this.selectedFeatures = this.autoForm.get('features').value;
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  activeForm() {
    return this.autoForm.valid && (this.progress == 0)
  }

}

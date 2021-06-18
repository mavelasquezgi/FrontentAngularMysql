import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsPanelMainComponent } from './news-panel-main.component';

describe('NewsPanelMainComponent', () => {
  let component: NewsPanelMainComponent;
  let fixture: ComponentFixture<NewsPanelMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewsPanelMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsPanelMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

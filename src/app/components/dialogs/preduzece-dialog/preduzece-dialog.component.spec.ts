import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreduzeceDialogComponent } from './preduzece-dialog.component';

describe('PreduzeceDialogComponent', () => {
  let component: PreduzeceDialogComponent;
  let fixture: ComponentFixture<PreduzeceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreduzeceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreduzeceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

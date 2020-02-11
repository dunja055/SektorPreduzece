import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SektorDialogComponent } from './sektor-dialog.component';

describe('SektorDialogComponent', () => {
  let component: SektorDialogComponent;
  let fixture: ComponentFixture<SektorDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SektorDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SektorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

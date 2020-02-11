import { Component, OnInit } from '@angular/core';
import { Sektor } from '../../../models/sektor';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Radnik } from '../../../models/radnik';
import { Inject } from '@angular/core';
import { RadnikService } from '../../../services/radnik.service';
import { SektorService } from '../../../services/sektor.service';
import { Obrazovanje } from '../../../models/obrazovanje';
import { ObrazovanjeService } from '../../../services/obrazovanje.service';

@Component({
  selector: 'app-radnik-dialog',
  templateUrl: './radnik-dialog.component.html',
  styleUrls: ['./radnik-dialog.component.css']
})
export class RadnikDialogComponent implements OnInit {

  obrazovanja: Obrazovanje[];
  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<RadnikDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Radnik,
              public radnikService: RadnikService,
              public obrazovanjeService: ObrazovanjeService) { }

  ngOnInit() {
    this.obrazovanjeService.getAllObrazovanje().subscribe(obrazovanja =>
    this.obrazovanja = obrazovanja);
  }

  public add(): void {
    this.data.id = -1;
    this.radnikService.addRadnik(this.data);
    // tslint:disable-next-line:quotemark
    this.snackBar.open("Uspešno dodat radnik", "U redu", {
      duration: 2500
    });
  }

  public update(): void {
    this.radnikService.updateRadnik(this.data);
    // tslint:disable-next-line:quotemark
    this.snackBar.open("Uspešno modifikovan radnik", "U redu", {
      duration: 2500
    });
  }

  public delete(): void {
    this.radnikService.deleteRadnik(this.data.id);
    // tslint:disable-next-line:quotemark
    this.snackBar.open("Uspešno obrisan radnik", "U redu", {
      duration: 2500
    });
  }

  public cancel(): void {
    this.dialogRef.close();
    // tslint:disable-next-line:quotemark
    this.snackBar.open("Odustali ste", "U redu", {
      duration: 1000
    });
  }
  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id = b.id;
  }

}

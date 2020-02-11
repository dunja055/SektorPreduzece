import { Component, Inject } from '@angular/core';
import { Preduzece } from 'src/app/models/preduzece';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OnInit } from '@angular/core';
import { Sektor } from 'src/app/models/sektor';
import { SektorService } from 'src/app/services/sektor.service';
import { PreduzeceService } from 'src/app/services/preduzece.service';



@Component({
  selector: 'app-sektor-dialog',
  templateUrl: './sektor-dialog.component.html',
  styleUrls: ['./sektor-dialog.component.css']
})
export class SektorDialogComponent implements OnInit {

  preduzeca: Preduzece[];

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<SektorDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Sektor,
              public sektorService: SektorService,
              public preduzeceService: PreduzeceService) { }

  ngOnInit() {
    this.preduzeceService.getAllPreduzece().subscribe(preduzeca =>
    this.preduzeca = preduzeca);
  }

  compareTo(a, b) {
    // tslint:disable-next-line:triple-equals
    return a.id = b.id;
  }

  onChange(preduzece) {
    this.data.preduzece = preduzece;
  }

  public add(): void {
    this.data.id = -1;
    this.sektorService.addSektor(this.data);
    // tslint:disable-next-line:quotemark
    this.snackBar.open("Uspešno dodat sektor", "U redu", {
      duration: 2500
    });
  }

  public update(): void {
    this.sektorService.updateSektor(this.data);
    // tslint:disable-next-line:quotemark
    this.snackBar.open("Uspešno modifikovan sektor", "U redu", {
      duration: 2500
    });
  }

  public delete(): void {
    this.sektorService.deleteSektor(this.data.id);
    // tslint:disable-next-line:quotemark
    this.snackBar.open("Uspešno obrisan sektor", "U redu", {
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

}

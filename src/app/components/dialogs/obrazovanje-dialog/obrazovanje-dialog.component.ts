import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Obrazovanje } from 'src/app/models/obrazovanje';
import { ObrazovanjeService } from 'src/app/services/obrazovanje.service';

@Component({
  selector: 'app-obrazovanje-dialog',
  templateUrl: './obrazovanje-dialog.component.html',
  styleUrls: ['./obrazovanje-dialog.component.css']
})
export class ObrazovanjeDialogComponent implements OnInit {

  public flag: number;

  constructor(public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<ObrazovanjeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Obrazovanje,
              public obrazovanjeService: ObrazovanjeService
              ) { }

  ngOnInit() {
  }

  public add(): void {
    this.data.id = -1;
    this.obrazovanjeService.addObrazovanje(this.data);
    this.snackBar.open('Uspesno dodato obrazovanje: ' + this.data.id, 'U redu', { duration: 2500,
     });
  }

  public update(): void {
    this.obrazovanjeService.updateObrazovanje(this.data);
    this.snackBar.open('Uspesno modifikovano obrazovanje: ' + this.data.id, 'U redu', { duration: 2500,
     });
  }

  public delete(): void {
    this.obrazovanjeService.deleteObrazovanje(this.data.id);
    this.snackBar.open('Uspesno obrisano obrazovanje: ' + this.data.id, 'U redu', { duration: 2500,
     });
  }

  public cancel(): void {
    this.dialogRef.close();
    this.snackBar.open('Odustali ste', 'U redu', { duration: 1000,
     });
  }

}

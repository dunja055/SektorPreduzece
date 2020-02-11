import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Radnik } from '../../models/radnik';
import { Obrazovanje } from '../../models/obrazovanje';
import { Input } from '@angular/core';
import { RadnikService } from '../../services/radnik.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Sektor } from '../../models/sektor';
import { RadnikDialogComponent } from '../dialogs/radnik-dialog/radnik-dialog.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', 'sektor', 'actions'];

  dataSource: MatTableDataSource<Radnik>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;

  @Input() selektovanSektor: Sektor;
  constructor(public radnikService: RadnikService,
              public dialog: MatDialog) { }

  ngOnInit() {
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    if (this.selektovanSektor.id) {
      this.loadData();
    }
  }

  public loadData() {
    this.radnikService.getRadnik(this.selektovanSektor.id)
  .subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.filterPredicate = (data, filter: string) => {
        const accumulator = (currentTerm, key) => {
          return key === 'obrazovanje' ? currentTerm + data.obrazovanje.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      // tslint:disable-next-line:no-shadowed-variable
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch (property) {
          case 'obrazovanje': return data.obrazovanje.naziv.toLocaleLowerCase();
          default: return data[property];
        }
      };

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // tslint:disable-next-line:variable-name
  public openDialog(flag: number, id: number, ime: string, prezime: string, brojLk: number, obrazovanje: Obrazovanje, sektor: Sektor) {
    const dialogRef = this.dialog.open(RadnikDialogComponent, {
      data: {
        // tslint:disable-next-line:object-literal-shorthand
        i: id, id: id, ime: ime, prezime: prezime, brojLk: brojLk, obrazovanje: obrazovanje, sektor: sektor
      }
    });
    dialogRef.componentInstance.flag = flag;
    // tslint:disable-next-line:triple-equals
    if (flag == 1) {
      dialogRef.componentInstance.data.sektor = this.selektovanSektor;
    }

    dialogRef.afterClosed().subscribe(result => {
      // tslint:disable-next-line:triple-equals
      if (result == 1) {
      this.loadData();
      }
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

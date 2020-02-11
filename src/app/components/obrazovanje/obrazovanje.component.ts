import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Obrazovanje } from '../../models/obrazovanje';
import { HttpClient } from '@angular/common/http';
import { ObrazovanjeService } from '../../services/obrazovanje.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ObrazovanjeDialogComponent } from 'src/app/components/dialogs/obrazovanje-dialog/obrazovanje-dialog.component';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-obrazovanje',
  templateUrl: './obrazovanje.component.html',
  styleUrls: ['./obrazovanje.component.css']
})
export class ObrazovanjeComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'stepenStrucneSpreme', 'opis', 'actions'];
  // dataSource: Observable<Obrazovanje[]>;
  dataSource: MatTableDataSource<Obrazovanje>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public obrazovanjeService: ObrazovanjeService) { }

  public loadData() {
   // this.dataSource = this.obrazovanjeService.getAllObrazovanje();
   this.obrazovanjeService.getAllObrazovanje().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    // tslint:disable-next-line:no-shadowed-variable
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch (property) {
        case 'id' : return data[property];
        default: return data[property].toLocaleLowerCase();
      }
    };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
  }

  ngOnInit() {
    this.loadData();
  }


  // tslint:disable-next-line:variable-name
  public openDialog(flag: number, id: number, naziv: string, stepenStrucneSpreme: string, opis: string) {
    const dialogRef = this.dialog.open(ObrazovanjeDialogComponent,
                      // tslint:disable-next-line:object-literal-shorthand
                      {data: {id: id, naziv: naziv, stepenStrucneSpreme: stepenStrucneSpreme, opis: opis}});
    dialogRef.componentInstance.flag = flag;
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

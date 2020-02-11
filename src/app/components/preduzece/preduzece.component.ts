import { Component, OnInit } from '@angular/core';
import { Preduzece } from '../../models/preduzece';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { PreduzeceService } from '../../services/preduzece.service';
import { PreduzeceDialogComponent } from '../dialogs/preduzece-dialog/preduzece-dialog.component';
import { ViewChild } from '@angular/core';
@Component({
  selector: 'app-preduzece',
  templateUrl: './preduzece.component.html',
  styleUrls: ['./preduzece.component.css']
})
export class PreduzeceComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'pib', 'sediste', 'opis',  'actions'];
  dataSource: MatTableDataSource<Preduzece>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;

  constructor(public httpClient: HttpClient,
              public dialog: MatDialog,
              public preduzeceService: PreduzeceService) { }

  public loadData() {
     this.preduzeceService.getAllPreduzece().subscribe(data => {
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
    public openDialog(flag: number, id: number, naziv: string, pib: string, sediste: string, opis: string) {
      const dialogRef = this.dialog.open(PreduzeceDialogComponent,
                        // tslint:disable-next-line:object-literal-shorthand
                        {data: {id: id, naziv: naziv, pib: pib, sediste: sediste, opis: opis}});
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

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sektor } from '../../models/sektor';
import { SektorService } from '../../services/sektor.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SektorDialogComponent } from '../dialogs/sektor-dialog/sektor-dialog.component';
import { Preduzece } from '../../models/preduzece';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka', 'preduzece', 'actions'];

  dataSource: MatTableDataSource<Sektor>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort)sort: MatSort;

  selektovanSektor: Sektor;
  constructor(public sektorService: SektorService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.loadData();
  }

  public selectRow(row) {
    this.selektovanSektor = row;
  }
public loadData() {
  this.sektorService.getAllSektor().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);

    // tslint:disable-next-line:no-shadowed-variable
    this.dataSource.filterPredicate = (data, filter: string) => {
      const accumulator = (currentTerm, key) => {
        return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };

    // tslint:disable-next-line:no-shadowed-variable
    this.dataSource.sortingDataAccessor = (data, property) => {
      switch (property) {
        case 'preduzece': return data.preduzece.naziv.toLocaleLowerCase();
        default: return data[property];
      }
    };

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

public openDialog(flag: number, id: number, naziv: string, oznaka: string, preduzece: Preduzece) {
  // tslint:disable-next-line:object-literal-shorthand
  const dialogRef = this.dialog.open(SektorDialogComponent, {data: {id: id, naziv: naziv, oznaka: oznaka, preduzece: preduzece }});
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

import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewAddendumsComponent } from './new-addendums/new-addendums.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addendums',
  standalone: false,
  templateUrl: './addendums.component.html',
  styleUrl: './addendums.component.scss'
})
export class AddendumsComponent {
  constructor(private dialog: MatDialog) { }

  displayedColumns: string[] = ['addendumNo', 'addendumDate', 'company', 'contractNo', 'effectiveDate', 'endDate', 'file'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  openDialog(): void {
    const dialogRef = this.dialog.open(NewAddendumsComponent, {
      width: '50%',
      height: 'auto',
      maxWidth: '100%',
    });

    dialogRef.afterClosed();
  }

}

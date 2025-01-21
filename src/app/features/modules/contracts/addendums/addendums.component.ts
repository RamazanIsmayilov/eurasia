import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NewAddendumsComponent } from './new-addendums/new-addendums.component';
import { MatDialog } from '@angular/material/dialog';
import { AddendumsService } from '../../../../services/addendums.service';

@Component({
  selector: 'app-addendums',
  standalone: false,
  templateUrl: './addendums.component.html',
  styleUrl: './addendums.component.scss'
})
export class AddendumsComponent implements OnInit {
  displayedColumns: string[] = ['addendumNo', 'addendumDate', 'company', 'contractNo', 'effectiveDate', 'endDate', 'file'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  addendumList: any[] = []
  requestData: any = {
    nextPageNumber: 1,
    visibleItemCount: 15,
    filters: []
  }

  constructor(
    private addendumService: AddendumsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllAddendums()
  }

  getAllAddendums() {
    this.addendumService.getAllAddendums(0, this.requestData).subscribe({
      next: (response) => {
        this.dataSource = response.data.result
      },
      error: (error) => {
        console.log("Error", error);
      }
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewAddendumsComponent, {
      width: '70%',
      maxWidth: '100%',
    });

    dialogRef.afterClosed();
  }

}

import { Component, ViewChild } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-new-addendums',
  standalone: false,
  templateUrl: './new-addendums.component.html',
  styleUrl: './new-addendums.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class NewAddendumsComponent {
  constructor(private dialogRef: MatDialogRef<NewAddendumsComponent>) { }

  displayedColumns: string[] = ['no', 'transportationModule', 'mode', 'point', 'borderEntry', 'borderExit', 'cargo', 'type', 'quantity', 'tariff', 'cost', 'lossPercentage'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  cancel() {
    this.dialogRef.close()
  }

}

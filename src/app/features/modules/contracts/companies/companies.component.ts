import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CompaniesService } from '../../../../services/companies.service';
import { MatDialog } from '@angular/material/dialog';
import { NewCompaniesComponent } from './new-companies/new-companies.component';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup } from '@angular/forms';
import * as XLSX from 'xlsx';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-companies',
  standalone: false,
  templateUrl: './companies.component.html',
  styleUrl: './companies.component.scss'
})
export class CompaniesComponent implements AfterViewInit, OnInit {
  constructor(
    private companiesService: CompaniesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['companyType', 'name', 'taxId', 'address', 'mail', 'sapCode'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  requestData: any = {
    nextPageNumber: 1,
    visibleItemCount: 15,
    filters: []
  }

  totalCount!: number
  selectedCompanyId!: number;
  showButton: boolean = false
  searchForm!: FormGroup
  title = 'Eurasia'
  fileName = 'Eurasia.xlsx'

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      type: [''],
      name: [''],
      taxId: [''],
      address: [''],
      email: [''],
      sapcode: ['']
    })

    this.requestData.filters = [];
    this.getCompanies();
  }

  onSubmit(): void {
    const filters = Object.keys(this.searchForm.value)
      .filter(key => this.searchForm.value[key] !== '')
      .map(key => {
        return {
          columnName: key,
          value: this.searchForm.value[key],
        };
      });

    this.requestData.filters = filters;
    this.getCompanies();
  }


  onEnter(event: Event): void {
    event.preventDefault();
    this.onSubmit();
  }

  exportexcel(): void {
    let element = document.getElementById('company-table')
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element)

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, this.fileName);
  }

  async alert() {
    return Swal.fire({
      title: "Are you sure you want to delete?",
      icon: 'question',
      showCancelButton: true,
      cancelButtonColor: "#6e7881",
      confirmButtonColor: "#7066e0",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      showDenyButton: false,
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  getCompanies(): void {
    this.companiesService.getCompanies(this.requestData).subscribe({
      next: (response) => {
        this.dataSource = response.data.result;
        this.totalCount = response.data.count;
      },
      error: (error) => {
        console.error('Error:', error);
      }
    });
  }

  onRowClick(companyId: number) {
    if (this.selectedCompanyId === companyId) {
      this.selectedCompanyId = 0;
      this.showButton = false;
    } else {
      this.selectedCompanyId = companyId;
      this.showButton = true;
    }
  }


  deleteCompany(): void {
    this.alert().then((isConfirmed) => {
      if (isConfirmed) {
        this.companiesService.deleteCompany(this.selectedCompanyId).subscribe({
          next: () => {
            this.getCompanies()
            Swal.fire("Deleted!", "", "success");
          },
          error: (error) => {
            this.snackBar.open(error.message, "Close", {
              duration: 3000
            })
          }
        })
      } else {
        Swal.fire("Deletion canceled", "", "info");
      }
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onChangePage(): void {
    this.requestData.nextPageNumber = this.paginator.pageIndex + 1;
    this.requestData.visibleItemCount = this.paginator.pageSize;
    this.getCompanies();
  }

  openDialog(companyId?: number): void {
    const dialogRef = this.dialog.open(NewCompaniesComponent, {
      data: companyId ? { id: companyId } : { id: 0 }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCompanies()
    });
  }
}
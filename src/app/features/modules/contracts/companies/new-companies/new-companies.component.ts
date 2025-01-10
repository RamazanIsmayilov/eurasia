import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompaniesService } from '../../../../../services/companies.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-companies',
  standalone: false,
  templateUrl: './new-companies.component.html',
  styleUrl: './new-companies.component.scss'
})
export class NewCompaniesComponent implements OnInit {
  companyForm!: FormGroup
  companyTypes = [
    { value: 1, viewValue: 'Client' },
    { value: 2, viewValue: 'Supplier' }
  ];

  constructor(
    private dialogRef: MatDialogRef<NewCompaniesComponent>,
    private fb: FormBuilder,
    private companyService: CompaniesService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public company: any
  ) { }

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      id: [0],
      type: ['', Validators.required],
      name: ['', Validators.required],
      taxId: [''],
      address: [''],
      email: [''],
      sapcode: ['']
    });

    this.getCompanyById();
  }

  getCompanyById() {
    this.companyService.getCompanyById(this.company.id).subscribe({
      next: (response) => {
        const selectedType = this.companyTypes.find(item => item.value === response.data?.type);
        this.companyForm.patchValue({
          ...response.data,
          type: selectedType
        });
      },
      error: (error) => {
        console.log("Error", error);
      }
    });
  }

  addCompany() {
    if (this.companyForm.valid) {
      const formValue = { ...this.companyForm.value };
      formValue.type = formValue.type.value;
      this.companyService.addOrUpdateCompany(formValue).subscribe({
        next: (response) => {
          this.dialogRef.close()
          this.snackBar.open(response.message, "Close", {
            duration: 3000
          })
        },
        error: (error) => {
          console.log("Error", error);
          this.snackBar.open(error.message, "Close", {
            duration: 3000
          })
        }
      })
    }
  }

  cancel() {
    this.dialogRef.close()
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddendumsService } from '../../../../../services/addendums.service';
import { AutoCompleteService } from '../../../../../services/auto-complete.service';
import { ComboBoxService } from '../../../../../services/combo-box.service';
import momment from "moment"

@Component({
  selector: 'app-new-addendums',
  standalone: false,
  templateUrl: './new-addendums.component.html',
  styleUrl: './new-addendums.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class NewAddendumsComponent implements OnInit {
  displayedColumns: string[] = ['no', 'transportationModule', 'mode', 'point', 'borderEntry', 'borderExit', 'cargo', 'type', 'quantity', 'tariff', 'cost', 'lossPercentage'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  addendumInformationForm!: FormGroup
  companyList: any[] = []
  contractList: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<NewAddendumsComponent>,
    private addendumService: AddendumsService,
    private autoCompleteService: AutoCompleteService,
    private comboBoxService: ComboBoxService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addendumInformationForm = this.fb.group({
      id: [0],
      addendumNo: ["", Validators.required],
      addendumDate: [""],
      companyId: [null, Validators.required],
      contractId: [null, Validators.required],
      effectiveDate: ["", Validators.required],
      endDate: ["", Validators.required]
    })

    this.addendumInformationForm.get("companyId")?.valueChanges.subscribe(selectedCompanyKey => {
      const selectedCompany = this.companyList.find(company => company.value === selectedCompanyKey);
      this.getContractsByCompany(selectedCompany?.key);
    });
  }

  getCompanies() {
    this.autoCompleteService.getCompanies(this.addendumInformationForm.get("companyId")?.value.toLowerCase()).subscribe({
      next: (response) => {
        this.companyList = response.data;
      },
      error: (error) => {
        console.log("Error", error);
      }
    })
  }


  getContractsByCompany(companyId: number) {
    this.comboBoxService.getContractsByCompany(companyId).subscribe({
      next: (response) => {
        this.contractList = response.data
      },
      error: (error) => {
        console.log("Error", error);
      }
    })
  }

  saveData() {
    const addendumData = { ...this.addendumInformationForm.value }
    addendumData.addendumDate = momment(addendumData.addendumDate).format("YYYY-MM-DD");
    addendumData.effectiveDate = momment(addendumData.effectiveDate).format("YYYY-MM-DD");
    addendumData.endDate = momment(addendumData.endDate).format("YYYY-MM-DD");
    const selectedCompany = this.companyList.find(company => company.value === addendumData.companyId);
    addendumData.companyId = selectedCompany.key;

    if (this.addendumInformationForm.valid) {
      this.addendumService.addOrUpdateAddendum(addendumData).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log("Error", error);
        }
      })
    } else {
      console.log("Form is invalid");
    }
  }

  cancel() {
    this.dialogRef.close()
  }

}

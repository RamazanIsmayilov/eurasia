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
  toggleInput: boolean = false
  addendumInformationForm!: FormGroup
  addendumDetailsForm!: FormGroup
  companyList: any[] = []
  contractList: any[] = []
  transportModuleTypesList: any[] = []
  transportTypesList: any[] = []
  startPointList: any[] = []
  borderStationList: any[] = []
  transportCategoryList: any[] = []

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

    this.addendumDetailsForm = this.fb.group({
      id: [0],
      transportationModuleId: [null, Validators.required], //transportation module
      transportTypeId: [null, Validators.required], //mode
      startPointId: [{ value: null, disabled: true }, Validators.required], //shipping
      endPointId: [{ value: null, disabled: true }, Validators.required], //destination
      pointId: [null, Validators.required], //point
      borderEntryStationId: [{ value: null, disabled: true }, Validators.required], //borderEntry
      borderExitStationId: [{ value: null, disabled: true }, Validators.required], //borderExit
      categoryId: [null], //category
      wagonTypeId: [null], //type
      cargoId: [null, Validators.required], //cargo(QNQ/ETSNQ)
      quantity: [null], //quantity
      tariff: [null], //tariff
      cost: [null], //cost
      lossPercentage: [null], //lossPercentage
    })

    this.addendumInformationForm.get("companyId")?.valueChanges.subscribe(selectedCompanyKey => {
      const selectedCompany = this.companyList.find(company => company.value === selectedCompanyKey);
      this.getContractsByCompany(selectedCompany?.key);
    });

    this.getTransportTypes()
    this.getTransportModuleTypes()
    this.getBorderStations()
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

  getTransportModuleTypes() {
    this.comboBoxService.getTransportModuleTypes().subscribe({
      next: (response) => {
        this.transportModuleTypesList = response.data;
      },
      error: (error) => {
        console.log("Error", error);
      }
    });

    this.addendumDetailsForm.get('transportationModuleId')?.valueChanges.subscribe(value => {
      if (value) {
        this.addendumDetailsForm.get('startPointId')?.enable();
        this.addendumDetailsForm.get('startPointId')?.reset();
        this.addendumDetailsForm.get('endPointId')?.enable();
        this.addendumDetailsForm.get('endPointId')?.reset();
        this.startPointList = [];

        if (value === 4) {
          this.toggleInput = true;
        } else {
          this.toggleInput = false;
        }
      } else {
        this.addendumDetailsForm.get('startPointId')?.disable();
        this.addendumDetailsForm.get('endPointId')?.disable();
      }
    });

    this.addendumDetailsForm.get("transportationModuleId")?.valueChanges.subscribe(selectedTransportationModuleId => {
      this.getTransportCategories(selectedTransportationModuleId)
    })
  }

  getTransportTypes() {
    this.comboBoxService.getTransportTypes().subscribe({
      next: (response) => {
        this.transportTypesList = response.data
      },
      error: (error) => {
        console.log("Error", error);
      }
    })

    this.addendumDetailsForm.get("transportTypeId")?.valueChanges.subscribe(value => {
      if (value === 1) {
        this.addendumDetailsForm.get('borderEntryStationId')?.enable();
      } else if (value === 2) {
        this.addendumDetailsForm.get('borderExitStationId')?.enable();
      } else if (value === 3) {
        this.addendumDetailsForm.get('borderEntryStationId')?.enable();
        this.addendumDetailsForm.get('borderExitStationId')?.enable();
      } else {
        this.addendumDetailsForm.get('borderEntryStationId')?.disable();
        this.addendumDetailsForm.get('borderExitStationId')?.disable();
      }
    })
  }

  getPointsByTransportationModule() {
    const filterData = this.addendumDetailsForm.get("startPointId")?.value?.toLowerCase() ||
      this.addendumDetailsForm.get("pointId")?.value?.toLowerCase() ||
      this.addendumDetailsForm.get("endPointId")?.value?.toLowerCase();
    const transportationModuleType = this.addendumDetailsForm.get("transportationModuleId")?.value;

    const apiCall = transportationModuleType === 3
      ? this.autoCompleteService.getAllPoints(filterData)
      : this.autoCompleteService.getPointsByTransportationModule(filterData, transportationModuleType);
    apiCall.subscribe({
      next: (response) => {
        this.startPointList = response.data;
      },
      error: (error) => {
        console.error("Error", error);
      }
    });
  }

  getBorderStations() {
    this.comboBoxService.getBorderStations().subscribe({
      next: (response) => {
        this.borderStationList = response.data
      },
      error: (error) => {
        console.log("Error", error);
      }
    })
  }

  getTransportCategories(transportationModuleId: number) {
    this.comboBoxService.getTransportCategories(transportationModuleId).subscribe({
      next: (response) => {
        this.transportCategoryList = response.data
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

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
  transportTypesByCategoryList: any[] = []
  qnqEtsnqsList: any[] = []

  constructor(
    private dialogRef: MatDialogRef<NewAddendumsComponent>,
    private addendumService: AddendumsService,
    private autoCompleteService: AutoCompleteService,
    private comboBoxService: ComboBoxService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.addendumInformationForm = this.fb.group({
      id: [0],
      addendumNo: ["", Validators.required],
      addendumDate: [""],
      company: ["", Validators.required],
      companyId: [null],
      contractId: [null, Validators.required],
      effectiveDate: ["", Validators.required],
      endDate: ["", Validators.required],
      addendumDetails: [[]],
      deletedAddendumDetailIds: [[]]
    })

    this.addendumDetailsForm = this.fb.group({
      id: [0],
      transportationModule: ["", Validators.required],
      transportationModuleId: [null],
      transportType: [null, Validators.required], //mode
      transportTypeId: [null],
      startPoint: [{ value: null, disabled: true }, Validators.required], //shipping
      startPointId: [null],
      endPoint: [{ value: null, disabled: true }, Validators.required], //destination
      endPointId: [null],
      point: [null, Validators.required],
      pointId: [null],
      borderEntryStation: [{ value: null, disabled: true }, Validators.required],
      borderEntryStationId: [null],
      borderExitStation: [{ value: null, disabled: true }, Validators.required],
      borderExitStationId: [null],
      category: [""],
      categoryId: [null],
      wagonType: [""], //type
      wagonTypeId: [null],
      cargo: ["", Validators.required],
      cargoId: [null],
      quantity: [null],
      tariff: [null],
      cost: [null],
      lossPercentage: [null],
    })

    this.getTransportTypes()
    this.getTransportModuleTypes()
    this.getBorderStations()
  }

  saveDetailData() {
    const addendumDetailsData = { ...this.addendumDetailsForm.value };

    const selectedTransportationModule = this.transportModuleTypesList.find(item => item.value === addendumDetailsData.transportationModule);
    addendumDetailsData.transportationModuleId = selectedTransportationModule?.key;

    const selectedTransportationType = this.transportTypesList.find(item => item.value === addendumDetailsData.transportType);
    addendumDetailsData.transportTypeId = selectedTransportationType?.key;

    const selectedStartPoint = this.startPointList.find(item => item.value === addendumDetailsData.startPoint);
    addendumDetailsData.startPointId = selectedStartPoint?.key;

    const selectedEndPoint = this.startPointList.find(item => item.value === addendumDetailsData.endPoint);
    addendumDetailsData.endPointId = selectedEndPoint?.key;

    const selectedBorderEntryStation = this.borderStationList.find(item => item.value === addendumDetailsData.borderEntryStation);
    addendumDetailsData.borderEntryStationId = selectedBorderEntryStation?.key;

    const selectedBorderExitStation = this.borderStationList.find(item => item.value === addendumDetailsData.borderExitStation);
    addendumDetailsData.borderExitStationId = selectedBorderExitStation?.key;

    const selectedCategory = this.transportCategoryList.find(item => item.value === addendumDetailsData.category);
    addendumDetailsData.categoryId = selectedCategory?.key;

    const selectedWagonType = this.transportTypesByCategoryList.find(item => item.value === addendumDetailsData.wagonType);
    addendumDetailsData.wagonTypeId = selectedWagonType?.key;

    const selectedCargo = this.qnqEtsnqsList.find(item => item.value === addendumDetailsData.cargo);
    addendumDetailsData.cargoId = selectedCargo?.key;

    const selectedPoint = this.startPointList.find(item => item.value === addendumDetailsData.point);
    addendumDetailsData.pointId = selectedPoint?.key;

    const currentDetails = this.addendumInformationForm.get('addendumDetails')?.value || [];
    addendumDetailsData.id = currentDetails.length;
    const updatedDetails = [...currentDetails, addendumDetailsData];

    this.addendumInformationForm.patchValue({ addendumDetails: updatedDetails });
    this.dataSource = new MatTableDataSource<any>(updatedDetails);

    this.addendumDetailsForm.reset();
  }

  getCompanies() {
    this.autoCompleteService.getCompanies(this.addendumInformationForm.get("company")?.value.toLowerCase()).subscribe({
      next: (response) => {
        this.companyList = response.data;
      },
      error: (error) => {
        console.log("Error", error);
      }
    })

    this.addendumInformationForm.get("company")?.valueChanges.subscribe(company => {
      const selectedCompany = this.companyList.find(item => item.value === company);
      this.getContractsByCompany(selectedCompany?.key);
    });
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

    this.addendumDetailsForm.get('transportationModule')?.valueChanges.subscribe(transportationModule => {
      const selectedTransportationModule = this.transportModuleTypesList.find(item => item.value === transportationModule);
      this.getTransportCategories(selectedTransportationModule?.key)

      if (selectedTransportationModule?.key) {
        this.addendumDetailsForm.get('startPoint')?.enable();
        this.addendumDetailsForm.get('startPoint')?.reset();
        this.addendumDetailsForm.get('endPoint')?.enable();
        this.addendumDetailsForm.get('endPoint')?.reset();
        this.startPointList = [];

        if (selectedTransportationModule?.key === 4) {
          this.toggleInput = true;
        } else {
          this.toggleInput = false;
        }
      } else {
        this.addendumDetailsForm.get('startPoint')?.disable();
        this.addendumDetailsForm.get('endPoint')?.disable();
      }
    });

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

    this.addendumDetailsForm.get("transportType")?.valueChanges.subscribe(transportationType => {
      const selectedTransportationType = this.transportTypesList.find(item => item.value === transportationType);
      switch (selectedTransportationType?.key) {
        case 1:
          this.addendumDetailsForm.get('borderEntryStation')?.enable();
          this.addendumDetailsForm.get('borderEntryStation')?.reset();

          this.addendumDetailsForm.get('borderExitStation')?.disable();
          this.addendumDetailsForm.get('borderExitStation')?.setValidators(null);
          this.addendumDetailsForm.get('borderExitStation')?.updateValueAndValidity();
          this.addendumDetailsForm.get('borderExitStation')?.reset();
          break
        case 2:
          this.addendumDetailsForm.get('borderExitStation')?.enable();
          this.addendumDetailsForm.get('borderExitStation')?.reset();

          this.addendumDetailsForm.get('borderEntryStation')?.disable();
          this.addendumDetailsForm.get('borderEntryStation')?.setValidators(null);
          this.addendumDetailsForm.get('borderEntryStation')?.updateValueAndValidity();
          this.addendumDetailsForm.get('borderEntryStation')?.reset();
          break
        case 3:
          this.addendumDetailsForm.get('borderEntryStation')?.enable();
          this.addendumDetailsForm.get('borderEntryStation')?.reset();

          this.addendumDetailsForm.get('borderExitStation')?.enable();
          this.addendumDetailsForm.get('borderExitStation')?.reset();
          break
        case 4:
          this.addendumDetailsForm.get('borderEntryStation')?.disable();
          this.addendumDetailsForm.get('borderEntryStation')?.setValidators(null);
          this.addendumDetailsForm.get('borderEntryStation')?.updateValueAndValidity();
          this.addendumDetailsForm.get('borderEntryStation')?.reset();

          this.addendumDetailsForm.get('borderExitStation')?.disable();
          this.addendumDetailsForm.get('borderExitStation')?.setValidators(null);
          this.addendumDetailsForm.get('borderExitStation')?.updateValueAndValidity();
          this.addendumDetailsForm.get('borderExitStation')?.reset();
      }
    })
  }

  getPointsByTransportationModule() {
    const filterData = this.addendumDetailsForm.get("startPoint")?.value?.toLowerCase() ||
      this.addendumDetailsForm.get("point")?.value?.toLowerCase() ||
      this.addendumDetailsForm.get("endPoint")?.value?.toLowerCase();
    const transportationModule = this.addendumDetailsForm.get("transportationModule")?.value;
    const transportationModuleType = this.transportModuleTypesList.find(item => item.value === transportationModule);

    const apiCall = transportationModuleType.key === 3
      ? this.autoCompleteService.getAllPoints(filterData)
      : this.autoCompleteService.getPointsByTransportationModule(filterData, transportationModuleType.key);

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

    this.addendumDetailsForm.get("category")?.valueChanges.subscribe(category => {
      const selectedTransportCategory = this.transportCategoryList.find(item => item.value === category);
      this.getTransportTypesByCategory(selectedTransportCategory?.key)
    })
  }

  getTransportTypesByCategory(categoryId: number) {
    this.comboBoxService.getTransportTypesByCategory(categoryId).subscribe({
      next: (response) => {
        this.transportTypesByCategoryList = response.data
      },
      error: (error) => {
        console.log("Error", error);
      }
    })
  }

  getQnqEtsnqs() {
    const filterData = this.addendumDetailsForm.get("cargo")?.value
    this.autoCompleteService.getQnqEtsnqs(filterData).subscribe({
      next: (response) => {
        this.qnqEtsnqsList = response.data
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
    const selectedCompany = this.companyList.find(company => company.value === addendumData.company);
    addendumData.companyId = selectedCompany?.key;

    if (this.addendumInformationForm.valid) {
      this.addendumService.addOrUpdateAddendum(addendumData).subscribe({
        next: (response) => {
          console.log(response.data);
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

import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModulesService } from '../../services/modules.service';
import { CommonModule } from '@angular/common';
import { ModulesHeaderComponent } from "../../components/modules-header/modules-header.component";

@Component({
  selector: 'app-modules',
  imports: [RouterModule, CommonModule, ModulesHeaderComponent],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent implements OnInit {
  moduleList: any[] = []
  constructor(
    private moduleService: ModulesService
  ) { }

  ngOnInit(): void {
    this.moduleService.getModules().subscribe(response => {
      this.moduleList = response.data
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { CommonModule } from '@angular/common';
import { ModulesService } from '../../services/modules.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderDropdownComponent } from '../header-dropdown/header-dropdown.component';

@Component({
  selector: 'app-header',
  imports: [CommonModule, HeaderDropdownComponent, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  menuList: any[] = [];
  moduleList: any[] = [];
  moduleName: string = '';
  selectedModuleId!: number;

  constructor(
    private menuService: MenuService,
    private moduleService: ModulesService
  ) { }

  ngOnInit(): void {
    this.getModules();
  }

  getMenus(id: number): void {
    this.menuService.getMenus(id).subscribe(response => {
      this.menuList = response.data;
    });
  }

  getModules(): void {
    this.moduleService.getModules().subscribe(response => {
      this.moduleList = response.data
      this.selectedModuleId = this.moduleList[0].id;
      const selectedModule = this.moduleList.find(module => module.id === this.selectedModuleId);
      this.moduleName = selectedModule.value.toLowerCase();
      this.getMenus(this.selectedModuleId)
    });
  }
}


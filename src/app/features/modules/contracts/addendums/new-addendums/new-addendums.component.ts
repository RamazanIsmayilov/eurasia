import { Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-addendums',
  standalone: false,
  templateUrl: './new-addendums.component.html',
  styleUrl: './new-addendums.component.scss',
  providers: [provideNativeDateAdapter()]
})
export class NewAddendumsComponent {
  constructor(private dialogRef: MatDialogRef<NewAddendumsComponent>) { }

  cancel() {
    this.dialogRef.close()
  }

}

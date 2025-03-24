import { Component, inject, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import{ MatDialogTitle, MatDialogContent, MatDialogActions,

  MatDialogRef, MAT_DIALOG_DATA, }from'@angular/material/dialog'
  
  

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  
}

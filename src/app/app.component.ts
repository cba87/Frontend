import { Component, ViewChild } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { FormsModule } from "@angular/forms";





@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, MatTableModule, MatPaginatorModule, FormsModule,RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  
}

import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-addlist',
  standalone: true,
  imports: [MatTabsModule,RouterOutlet],
  templateUrl: './addlist.component.html',
  styleUrl: './addlist.component.scss'
})
export class AddlistComponent {

  links=[
    {path:'/tab/addlist1',name:'問卷'},
    {path:'/tab/addlist2',name:'題目'},
    {path:'/tab/addlist3',name:'回饋'},
  ];
  activeLink = this.links.find(link => link.name === "Tab 2")?.name || this.links[0].name;}

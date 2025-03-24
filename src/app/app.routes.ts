import { Routes } from "@angular/router";
import { ListComponent } from "./list/list.component";
import { InsideComponent } from "./inside/inside.component";
import { ConfirmationComponent } from "./confirmation/confirmation.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { RouterModule } from "@angular/router";
import { ManagerComponent } from "./manager/manager.component";
import { AddlistComponent } from "./tab/addlist.component";
import { Addlist1Component } from "./addlist1/addlist1.component";
import { Addlist2Component } from "./addlist2/addlist2.component";
import { Addlist3Component } from "./addlist3/addlist3.component";
import { Addlist4Component } from "./addlist4/addlist4.component";
import { PreviewComponent } from "./preview/preview.component";
import { ReplyComponent } from "./reply/reply.component";

export const routes: Routes = [
  {path: "list",component: ListComponent,},
  {path: "inside",component: InsideComponent,},
  {path: "Confirmation",component: ConfirmationComponent,},
  { path: "statisics", component: StatisticsComponent },
  { path: "manager", component: ManagerComponent },
  { path: "preview", component:PreviewComponent },
  { path: "reply", component:ReplyComponent },
  {path: "addlist4", component:Addlist4Component},      
  { path: "tab", component: AddlistComponent,
     children:[
      {path: "addlist1", component:Addlist1Component},
      {path: "addlist2", component:Addlist2Component},
      {path: "addlist3", component:Addlist3Component},
    ],
  
},

];

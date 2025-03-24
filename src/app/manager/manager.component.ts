import { Component, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { Router } from "@angular/router";
import { HttpClientService } from "../http-service/http-service";
import { createlist } from "../@services/createlist";
import { DatePipe } from "@angular/common";
import { statistics } from "../@services/statistics";

export interface ApiResponse {
  code: number;
  message: string;
  search: Quiz[];
}
export interface ApiFeedbackResponse {
  code: number;
  message: string;
  feedbackDtoList: any[];
}
export interface ApiStatisticsResponse {
  code: number;
  message: string;
  statisticVoList: any[];
}
export interface Quiz {
  name: string;
  id: number;
  description: string;
  published: boolean;
  startDate: string;
  endDate: string;
  result: string;
  checkBox: boolean;
  ispublish: string;
  quesList: any;
}

const QuizArray1: Quiz[] = [];

@Component({
  selector: "app-manager",
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, FormsModule, MatIconModule],
  templateUrl: "./manager.component.html",
  styleUrl: "./manager.component.scss",
  providers: [DatePipe], // 添加 DatePipe 到提供者
})
export class ManagerComponent {
  statisticVoList: any = [];
  inputData!: any;
  title = "demo2";
  quizId?: number;
  searchData!: any;
  startDate: string = "";
  endDate: string = "";
  deleteboolean = false;
  elementArray: any[] = [];
  QuizArray: Quiz[] = [];
  nowData: Date = new Date();
  state: string = "";
  // deleteArray: any[] = [];
  displayedColumns: string[] = [
    "checkBox",
    "id",
    "name",
    "ispublish",
    "startDate",
    "endDate",
    "result",
  ];
  checkBox = false;

  ngOnInit(): void {
    
    this.createlist.clearAll();
    this.search();
  }
  constructor(
    private router: Router,
    private http: HttpClientService,
    private createlist: createlist,
    private statistics: statistics
  ) {}

  dataSource = new MatTableDataSource<Quiz>(QuizArray1);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  //檢查checkbox的狀態
  check(event: Event) {
    const checkbox = event.target as HTMLInputElement;
  }
  delete() {
    let quizIdList: number[] = [];
    for (const element of this.dataSource.data) {
      if (element.checkBox&&element.ispublish=="進行中") {
        alert("進行中的問卷不能刪除!!")
        return
      }
      if (element.checkBox) {
        quizIdList.push(element.id);
      }
    }
    const daleteData = { quizIdList };
    console.log(daleteData);

    this.http
      .postApi("http://localhost:8080/quiz/delete", daleteData)
      .subscribe(
        (res) => {
        },
        (err) => {
          console.error("Error:", err);
        }
      );
    // 取得當前路由的 URL
    const currentUrl = this.router.url;

    // 使用路由重新導航到當前 URL
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  add() {
    this.router.navigateByUrl("/tab/addlist1");
  }

  //點擊時獲取問卷資料
  getQuizById(Event: MouseEvent) {
    Event.preventDefault();
    // 確保 target 是一個 HTMLAnchorElement
    const target = Event.target as HTMLAnchorElement;

    // 獲取 a 標籤的文字內容
    const textContent = target.textContent;
    for (let data of this.QuizArray) {
      if (data.name == textContent) {
        this.quizId = data.id;
        this.state = data.ispublish;
      }
    }
    this.http
      .getApi("http://localhost:8080/quiz/getQuiz?quizId=" + this.quizId)
      .subscribe(
        (res) => {
          console.log(res);
          this.createlist.name = res.name;
          this.createlist.description = res.description;
          this.createlist.startDate = res.startDate;
          this.createlist.endDate = res.endDate;
          
            for (let data of res.quesList) {
              data.options = JSON.parse(data.options);
            }
           
          this.createlist.quesList = res.quesList;
          this.createlist.id = res.id;
          if (this.state == "進行中") {
            this.router.navigateByUrl("/tab/addlist3");
          }
          if (this.state != "進行中") {
            this.router.navigateByUrl("/tab/addlist1");
          }
          
        },
        (err) => {
          console.error("Error:", err);
        }
      );
  }

  //搜尋方法
  search() {
    this.searchData = {
      name: this.inputData,
      startDate: this.startDate,
      endDate: this.endDate,
    };
    this.http
      .postApiForSearch("http://localhost:8080/quiz/search", this.searchData)
      .subscribe(
        (res) => {
          this.QuizArray = res.search;

          for (let Quiz of this.QuizArray) {
            let startDate = new Date(Quiz.startDate);
            let endDate = new Date(Quiz.endDate);
            

            (Quiz.checkBox = false), (Quiz.result = "前往");

            if (
              Quiz.published &&
              this.nowData.getTime() < startDate.getTime()
            ) {
              Quiz.ispublish = "未開始";
            }
            if (
              Quiz.published &&
              this.nowData.getTime() >= startDate.getTime()
            ) {
              Quiz.ispublish = "進行中";
            }
            if (Quiz.published && this.nowData.getTime() > endDate.getTime()) {
              Quiz.ispublish = "已結束";
            }
            if (!Quiz.published) {
              Quiz.ispublish = "未發布";
            }
          }
          this.dataSource = new MatTableDataSource<Quiz>(this.QuizArray);
          this.dataSource.paginator = this.paginator; // 重新設定分頁器
        },
        (err) => {
          console.error("Error:", err);
        }
      );
  }
  getStastisticById(quizId: number, event: Event) {
    event.preventDefault();

    this.http
      .getApiForStastictis(
        "http://localhost:8080/quiz/statistics?quizId=" + quizId
      )
      .subscribe(
        (res) => {
          this.statisticVoList = res.statisticVoList;
          let ststisticsData: any[] = [];

          let keys: string[] = [];
          let option: any[] = [];
          let values: any[] = [];
          let optionCountArray: any[] = [];
          for (let statistic of this.statisticVoList) {
            if (
              statistic.qeesIdOptionCountMap &&
              Object.keys(statistic.qeesIdOptionCountMap).length > 0
            ) {
              keys = Object.keys(statistic.qeesIdOptionCountMap);
              values = Object.values(statistic.qeesIdOptionCountMap);
            }
            ststisticsData.push({
              quizName: statistic.quizName,
              quesName: statistic.quesName,
              quesId: statistic.quesId,
              option: keys,
              result: values,
            });

            keys = [];
            values = [];
          }
          this.statistics.ststisticsData=ststisticsData;
          this.router.navigateByUrl("/statisics");

        },
        (err) => {
          console.error("Error:", err);
        }
      );
  }
}

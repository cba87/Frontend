import { Component } from "@angular/core";
import { ChartComponent } from "../chart/chart.component";
import { HttpClientService } from "../http-service/http-service";
import { statistics } from "../@services/statistics";
import Chart from "chart.js/auto";
import { CommonModule } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-statistics",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./statistics.component.html",
  styleUrl: "./statistics.component.scss",
})
export class StatisticsComponent {
  quizName: string = "";
  ststisticsData: any[] = [];
  chartArray: any[] = [];
  constructor(
    private http: HttpClientService,
    private statistics: statistics,
    private router:Router
  ) {}
  pieChartType = "pie";
  ngOnInit(): void {
    
    this.ststisticsData = this.statistics.getststisticsData();
    if(!this.ststisticsData||this.ststisticsData.length==0){
      this.router.navigateByUrl("addlist4")
    }
    // 獲取容器元素（假設有一個 <div id="charts-container"></div>）
    let container = document.getElementById("charts-container");
    if (!container) {
      console.error("未找到 charts-container 元素！");
      return;
    }

    for (let ststistics of this.ststisticsData) {
      if (ststistics.quesId == 1) {
        this.quizName = ststistics.quizName;
      }
      // 為每個圖表創建一個 canvas 元素
      let canvas = document.createElement("canvas");

      container.appendChild(canvas); // 動態加入 DOM

      let ctx = canvas.getContext("2d"); // 獲取繪圖上下文
      if (!ctx) {
        console.error("Canvas 初始化失敗！");
        continue;
      }

      let data = {
        // x 軸文字
        labels: ststistics.option,
        datasets: [
          {
            // 上方分類文字
            label: ststistics.quesName,
            // 數據
            data: ststistics.result,
            // 線與邊框顏色
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
              "#fb5607",
              "#ffb3c6"
            ],
            //設定hover時的偏移量，滑鼠移上去表會偏移，方便觀看選種的項目
            hoverOffset: 4,
          },
        ],
      };
      let chart = new Chart(ctx, {
        //pie是圓餅圖,doughnut是環狀圖
        type: "pie",
        data: data,
      });
      this.chartArray.push(chart);
    }
  }
}

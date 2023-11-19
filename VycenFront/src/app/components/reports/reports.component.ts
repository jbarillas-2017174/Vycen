import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  doughnutChartLabels: string[] = ['Ropero', 'Cajon', 'Blusa'];
  doughnutChartData: number[] = [350, 450, 100];

  colors: any = ["#020470"]

  constructor() { }

  ngOnInit(): void {
  }

  barChartOptions: any = {
    responsive: true,
    backgroundColor: ['red', 'blue', 'green', 'orange', 'purple', 'yellow', 'cyan']
  };

}

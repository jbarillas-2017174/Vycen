import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  doughnutChartLabels: string[] = ['Label 1', 'Label 2', 'Label 3'];
  doughnutChartData: number[] = [350, 450, 100];
  constructor() { }

  ngOnInit(): void {
  }

}

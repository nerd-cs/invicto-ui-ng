import { Component, OnInit, ViewChild } from '@angular/core';

import {
    ChartComponent,
    ApexAxisChartSeries,
    ApexChart,
    ApexXAxis,
    ApexDataLabels,
    ApexTitleSubtitle,
    ApexStroke,
    ApexGrid
} from "ng-apexcharts";
import { dataSeries } from "./data-series";

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};


@Component({
    selector: 'app-user-graph',
    templateUrl: './user-graph.component.html',
    styleUrls: ['./user-graph.component.scss']
})
export class UserGraphComponent implements OnInit {

    @ViewChild("chart", { static: false }) chart!: ChartComponent;
    public chartOptions!: Partial<ChartOptions> | any;

    dates: any = [];

    constructor() {
        for (let i = 0; i < 120; i++) {
            this.dates.push([dataSeries[1][i].date, Math.floor(dataSeries[1][i].value/100000)]);
        }
    }

    ngOnInit() {

        this.chartOptions = {
            series: [
                {
                    name: "Users",
                    data: this.dates
                }
            ],
            chart: {
                height: 360,
                type: "line",
                zoom: {
                    enabled: true
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Number of Attendance",
                align: "left"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            },
            xaxis: {
                title: {
                    text: "Days of Year"
                },
                type: "datetime",
            },
            yaxis: {
                title: {
                    text: "Number of Users"
                }
            }
        };
    }
}




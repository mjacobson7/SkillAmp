import { Component, OnInit, ViewChild } from '@angular/core';
import * as shape from 'd3-shape';
import { DashboardService } from '../../../services/dashboard/dashboard.service';



@Component({
    selector: 'app-survey-chart',
    templateUrl: './survey-chart.component.html',
    styleUrls: ['./survey-chart.component.scss']
})
export class SurveyChartComponent implements OnInit {
    sortFilter: string = '1M';
    chartLoaded: boolean = false;

    lineChartData: Array<any> = [{ data: [] }];
    lineChartLabels: Array<any>;
    lineChartType: string = 'bar';

    lineChartColors: Array<any> = [{
        backgroundColor: 'rgba(32,168,216,0.1)',
        borderColor: 'rgba(32,168,216,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }]

    lineChartOptions: any = {
        responsive: true,
        maintainAspectRatio: false,
        legend: { display: false },
        scales: {
            yAxes: [{ ticks: { beginAtZero: true, max: 5, stepSize: 1 } }],
            xAxes: [{ ticks: { max: 5 }, gridLines: { display: false } }]
        }
    };

    ngOnInit() { }
    
    constructor(private dashboardService: DashboardService) {
        this.getSurveyChartData();
    }

    getSurveyChartData() {
        let params = {
            sort: this.sortFilter
        }        
        this.dashboardService.getSurveyChartData(params).subscribe(response => {
            this.lineChartData = response.data;
            this.lineChartLabels = response.labels;               
            this.chartLoaded = true;
        })
    }

    onSelectFilter(sortBy) {
        this.sortFilter = sortBy;
        this.getSurveyChartData();
    }


} //end component

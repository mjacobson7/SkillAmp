import { Component, OnInit, ViewChild, SimpleChanges, OnChanges, Input } from '@angular/core';
import * as shape from 'd3-shape';
import { DashboardService } from '../../../services/dashboard/dashboard.service';



@Component({
    selector: 'app-survey-chart',
    templateUrl: './survey-chart.component.html',
    styleUrls: ['./survey-chart.component.scss']
})
export class SurveyChartComponent implements OnInit, OnChanges {
    daysFilterList: Object[] = [
        { label: '7 Days', value: 7 },
        { label: '30 Days', value: 30 },
        { label: '3 Months', value: 90 },
        { label: '6 Months', value: 180 },
        { label: '1 Year', value: 365 }
    ];
    daysFilter = 7;
    @Input() dashboardView;

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
    }];

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

    constructor(private dashboardService: DashboardService) { }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.dashboardView !== undefined && changes.dashboardView.previousValue !== changes.dashboardView.currentValue) {
            this.getSurveyChartData(changes.dashboardView.currentValue);
        }
    }

    getSurveyChartData(view) {
        this.dashboardService.getSurveyChartData(view, this.daysFilter).subscribe(response => {
            this.lineChartData = response.data;
            this.lineChartLabels = response.labels;
            this.chartLoaded = true;
        });
    }

    onSelectFilter(sortBy) {
        this.daysFilter = sortBy;
        this.getSurveyChartData(this.dashboardView);
    }


} // end component

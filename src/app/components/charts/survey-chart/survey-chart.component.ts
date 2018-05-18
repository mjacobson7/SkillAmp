import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';
import { DashboardService } from '../../../services/dashboard/dashboard.service';


@Component({
    selector: 'app-survey-chart',
    templateUrl: './survey-chart.component.html',
    styleUrls: ['./survey-chart.component.css']
})
export class SurveyChartComponent implements OnInit {
    data: any;
    options: any;
    sort: string = 'YEAR'; //other options are QUARTER and MONTH
    labels: any[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
    chartData: number[];

    ngOnInit() { }

    constructor(private dashboardService: DashboardService) {
        this.getSurveyChartData();
    }

    getSurveyChartData() {
        let params = {
            sort: this.sort
        }
        this.dashboardService.getSurveyChartData(params).subscribe(response => {
            console.log(response);

            this.data = {
                labels: response.labels,
                datasets: [
                    {
                        backgroundColor: '#42A5F5',
                        borderColor: '#1E88E5',
                        data: response.data
                    }
                ]
            }

            this.options = {
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0, max: 5 } }]
                }
            };
        })
    }


} //end component

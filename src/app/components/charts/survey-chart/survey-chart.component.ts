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

    ngOnInit() { }

    constructor(private dashboardService: DashboardService) {
        this.data = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
            datasets: [
                {
                    backgroundColor: '#42A5F5',
                    borderColor: '#1E88E5',
                    data: [65, 59, 80, 81, 56, 55, 45, 80, 45, 70, 53, 74]
                }
            ]
        }

        this.options = {
            legend: {
                display: false
            }
        };
    }


} //end component

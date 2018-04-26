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
    single: any[];
    
    // options
    showXAxis = true;
    showYAxis = true;
  
    // line, area
    autoScale = true;


    colorScheme = {
        domain: [
            // 'rgb(89, 218, 213, 0.4)',
            // 'rgb(252, 97, 128, 0.4)', 
            'rgb(98, 209, 243, 0.4)', 
            'rgb(249, 208, 149, 0.4)', 
            'rgb(141, 175, 249, 0.4)'
        ]
    }
  
    onSelect(event) {
      console.log(event);
    }

    ngOnInit() {}

    constructor(private dashboardService: DashboardService) {
        this.single = this.dashboardService.getSingle();
    }


} //end component

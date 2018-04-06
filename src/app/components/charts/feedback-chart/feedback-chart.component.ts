import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as shape from 'd3-shape';
import { DashboardService } from '../../../services/dashboard/dashboard.service';


@Component({
    selector: 'app-feedback-chart',
    templateUrl: './feedback-chart.component.html',
    styleUrls: ['./feedback-chart.component.css']
})
export class FeedbackChartComponent implements OnInit {
    single: any[] = [];
    
  
    // options
    showXAxis = true;
    showYAxis = true;
    yScaleMin = 0;
    yScaleMax = 5;
    curve = shape.curveCardinal;
    colorScheme = {
        domain: ['rgba(37, 162, 183, 0.4)']
        // ['#25A2B7']
        // ['#00B6EE'] -light blue
    }
  
    onSelect(event) {
      console.log(event);
    }

    ngOnInit() {}

    constructor(private dashboardService: DashboardService) {
        this.single = this.dashboardService.getSingle();
    }


} //end component

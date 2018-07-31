import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-cards',
  templateUrl: './dashboard-cards.component.html',
  styleUrls: ['./dashboard-cards.component.scss']
})
export class DashboardCardsComponent implements OnInit, OnChanges {
  widgetData;
  @Input() dashboardView;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.dashboardView !== undefined && changes.dashboardView.previousValue !== changes.dashboardView.currentValue) {
      if (changes.dashboardView.currentValue === 'ADMIN') {
        this.dashboardService.getAdminWidgets().subscribe(data => {
          this.widgetData = data;
        });
      } else if (changes.dashboardView.currentValue === 'SUPERVISOR') {
        this.dashboardService.getSupervisorWidgets().subscribe(data => {
          this.widgetData = data;
        });
      } else if (changes.dashboardView.currentValue === 'AGENT') {
        this.dashboardService.getAgentWidgets().subscribe(data => {
          this.widgetData = data;
        });
      }
    }
  }

}

import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { Chart } from 'angular-highcharts'; 


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  recommend: {};
  politeness: {};
  helpfulness: {};
  trustworthiness: {};
  msgs: any;
  options: any;

  chart = new Chart({
    chart: {
      type: 'spline'
    },
    title: {
      text: 'Score'
    },
    subtitle: {
      text: 'Liklihood to Recommend'
  },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: { // don't display the dummy year
          month: '%e. %b',
          year: '%b'
      },
      title: {
          text: 'Date'
      }
  },
  yAxis: {
      title: {
          text: 'Liklihood to Recommend'
      },
      min: 0,
      max: 5
  },
  tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
  },

  plotOptions: {
      spline: {
          marker: {
              enabled: true
          }
      }
  },
  series: [{
    name: 'Survey Scores',
    // Define the data points. All series have a dummy year
    // of 1970/71 in order to be compared on the same x axis. Note
    // that in JavaScript, months start at 0 for January, 1 for February etc.
    data: [
        [Date.UTC(1970, 9, 21), 3],
        [Date.UTC(1970, 10, 4), 5],
        [Date.UTC(1970, 10, 9), 4.5],
        [Date.UTC(1970, 10, 27), 4],
        [Date.UTC(1970, 11, 2), 5],
        [Date.UTC(1970, 11, 26), 2.5],
        [Date.UTC(1970, 11, 29), 3],
        [Date.UTC(1971, 0, 11), 3.5],
        [Date.UTC(1971, 0, 26), 1],
        [Date.UTC(1971, 1, 3), 4],
        [Date.UTC(1971, 1, 11), 3.5],
        [Date.UTC(1971, 1, 25), 5],
        [Date.UTC(1971, 2, 11), 5],
        [Date.UTC(1971, 3, 11), 4],
        [Date.UTC(1971, 4, 1), 4.5],
        [Date.UTC(1971, 4, 5), 2.5],
        [Date.UTC(1971, 4, 19), 3.5],
        [Date.UTC(1971, 5, 3), 4]
    ]
}]
  });

  add() {
    this.chart.addPoint(Math.floor(Math.random() * 60));
  }

  constructor() { }

  ngOnInit() {

    // this.recommend = {
    //   datasets: [
    //     {
    //       label: "Score",
    //       data: [
    //         {x: moment('01/01/2017', 'MM/DD/YYYY'), y: 4.5},
    //         {x: moment('01/02/2017', 'MM/DD/YYYY'), y: 1},                        
    //         {x: moment('01/03/2017', 'MM/DD/YYYY'), y: 4},
    //         {x: moment('01/04/2017', 'MM/DD/YYYY'), y: 3.75},
    //         {x: moment('01/05/2017', 'MM/DD/YYYY'), y: 4.25},
    //         {x: moment('01/06/2017', 'MM/DD/YYYY'), y: 5},
    //         {x: moment('01/07/2017', 'MM/DD/YYYY'), y: 4},
    //         {x: moment('01/08/2017', 'MM/DD/YYYY'), y: 5},
    //         {x: moment('01/09/2017', 'MM/DD/YYYY'), y: 4},                        
    //         {x: moment('01/10/2017', 'MM/DD/YYYY'), y: 4},
    //         {x: moment('01/11/2017', 'MM/DD/YYYY'), y: 3.75},
    //         {x: moment('01/12/2017', 'MM/DD/YYYY'), y: 2.25},
    //         {x: moment('01/13/2017', 'MM/DD/YYYY'), y: 3},
    //         {x: moment('01/14/2017', 'MM/DD/YYYY'), y: 1},
    //         {x: moment('01/15/2017', 'MM/DD/YYYY'), y: 4.5},
    //         {x: moment('01/16/2017', 'MM/DD/YYYY'), y: 5},                        
    //         {x: moment('01/17/2017', 'MM/DD/YYYY'), y: 5},
    //         {x: moment('01/18/2017', 'MM/DD/YYYY'), y: 2.75},
    //         {x: moment('01/19/2017', 'MM/DD/YYYY'), y: 3.25},
    //         {x: moment('01/20/2017', 'MM/DD/YYYY'), y: 5},
    //         {x: moment('01/21/2017', 'MM/DD/YYYY'), y: 4}
    //       ],
    //         borderColor: '#1D9DFC',
    //         backgroundColor: 'rgba(138, 206, 253, 0.5)',
    //         borderWidth: 2
    //       }
    //   ]
    // };
  

    //   this.options = {
    //     scales: {
    //       xAxes: [
    //         {
    //           scaleLabel: {
    //             display: true
    //           },
    //           type: "time",
    //           time: {
    //             unit: "day",
    
    //             displayFormats: {
    //               month: "dd"
    //             }
    //           },
    
    //           position: "bottom"
    //         }
    //       ],
    //       yAxes: [{
    //         ticks: {
    //             min: 0,
    //             max: 5,
    //            stepSize: 1
    //         }
    //     }],
    //     }
    //   }

    }

    // selectData(event) {
    //   this.msgs = [];
    //   this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    //   console.log(this.msgs);
    //   console.log(event);
    // }



} //end component

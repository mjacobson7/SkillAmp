import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


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

  constructor() { }

  ngOnInit() {

    this.recommend = {
      datasets: [
        {
          label: "Likelihood to Recommend",
          data: [
            {x: moment('01/01/2017', 'MM/DD/YYYY'), y: 4.5},
            {x: moment('01/02/2017', 'MM/DD/YYYY'), y: 1},                        
            {x: moment('01/03/2017', 'MM/DD/YYYY'), y: 4},
            {x: moment('01/04/2017', 'MM/DD/YYYY'), y: 3.75},
            {x: moment('01/05/2017', 'MM/DD/YYYY'), y: 4.25},
            {x: moment('01/06/2017', 'MM/DD/YYYY'), y: 5},
            {x: moment('01/07/2017', 'MM/DD/YYYY'), y: 4}
          ],
            borderColor: '#1D9DFC',
            backgroundColor: 'rgba(138, 206, 253, 0.5)',
            borderWidth: 2
          }
      ]
    };

    this.politeness = {
      datasets: [
        {
          label: "Politeness",
          data: [
            {x: moment('01/01/2017', 'MM/DD/YYYY'), y: 4.5},
            {x: moment('01/02/2017', 'MM/DD/YYYY'), y: 1},                        
            {x: moment('01/03/2017', 'MM/DD/YYYY'), y: 4},
            {x: moment('01/04/2017', 'MM/DD/YYYY'), y: 3.75},
            {x: moment('01/05/2017', 'MM/DD/YYYY'), y: 4.25},
            {x: moment('01/06/2017', 'MM/DD/YYYY'), y: 5},
            {x: moment('01/07/2017', 'MM/DD/YYYY'), y: 4}
          ],
            borderColor: '#FC416A',
            backgroundColor: 'rgba(254, 160, 180, 0.5)',
            borderWidth: 2
          }
      ]
    };
    
    this.helpfulness = {
      datasets: [
        {
          label: "Helpfulness",
          data: [
            {x: moment('01/01/2017', 'MM/DD/YYYY'), y: 4.5},
            {x: moment('01/02/2017', 'MM/DD/YYYY'), y: 1},                        
            {x: moment('01/03/2017', 'MM/DD/YYYY'), y: 4},
            {x: moment('01/04/2017', 'MM/DD/YYYY'), y: 3.75},
            {x: moment('01/05/2017', 'MM/DD/YYYY'), y: 4.25},
            {x: moment('01/06/2017', 'MM/DD/YYYY'), y: 5},
            {x: moment('01/07/2017', 'MM/DD/YYYY'), y: 4}
          ],
            borderColor: '#814CFB',
            backgroundColor: 'rgba(192, 164, 253, 0.5)',
            borderWidth: 2
          }
      ]
    };

    this.trustworthiness = {
      datasets: [
        {
          label: "Trustworthiness",
          data: [
            {x: moment('01/01/2017', 'MM/DD/YYYY'), y: 4.5},
            {x: moment('01/02/2017', 'MM/DD/YYYY'), y: 1},                        
            {x: moment('01/03/2017', 'MM/DD/YYYY'), y: 4},
            {x: moment('01/04/2017', 'MM/DD/YYYY'), y: 3.75},
            {x: moment('01/05/2017', 'MM/DD/YYYY'), y: 4.25},
            {x: moment('01/06/2017', 'MM/DD/YYYY'), y: 5},
            {x: moment('01/07/2017', 'MM/DD/YYYY'), y: 4}
          ],
            borderColor: '#32CECD',
            backgroundColor: 'rgba(151, 230, 229, 0.5)',
            borderWidth: 2
          }
      ]
    };

      this.options = {
        scales: {
          xAxes: [
            {
              scaleLabel: {
                display: true
              },
              type: "time",
              time: {
                unit: "day",
    
                displayFormats: {
                  month: "dd"
                }
              },
    
              position: "bottom"
            }
          ],
          yAxes: [{
            ticks: {
                min: 0,
                max: 5,
               stepSize: 1
            }
        }],
        }
      }

    }

    selectData(event) {
      // this.msgs = [];
      // this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
      // console.log(this.msgs);
      console.log(event);
    }



} //end component

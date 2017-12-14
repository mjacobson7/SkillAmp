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
            {x: moment('01/01/2017', 'MM/DD/YYYY'), y: 5},
            {x: moment('01/02/2017', 'MM/DD/YYYY'), y: 1},                        
            {x: moment('01/02/2017', 'MM/DD/YYYY'), y: 5},
            {x: moment('01/03/2017', 'MM/DD/YYYY'), y: 4},
            {x: moment('01/03/2017', 'MM/DD/YYYY'), y: 1.5},            
            {x: moment('01/04/2017', 'MM/DD/YYYY'), y: 3.75},
            {x: moment('01/05/2017', 'MM/DD/YYYY'), y: 4.25},
            {x: moment('01/06/2017', 'MM/DD/YYYY'), y: 5},
            {x: moment('01/07/2017', 'MM/DD/YYYY'), y: 4}
          ],
            borderColor: '#24272D',
            backgroundColor: '#1FB7EC',
            pointRadius: 5
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
                min: 1,
                max: 5,
               stepSize: 1
            }
        }],
        }
      }










  //   this.options = {
  //     scales: {
  //         xAxes: [{
  //             time: {
  //               displayFormats: {
  //                 quarter: 'MMM YYYY'
  //             }
  //             }
  //         }]
  //     }
  // }


    // this.recommend = {
    //   labels: [1,5,10,15,20,25,30],
    //   datasets: [
    //       {
    //           label: 'Likelihood to Recommend',
    //           data: [
    //             {x: new Date().getDate(), y: 4},
    //             {x: new Date().getMonth(), y: 4}, 
    //             {x: new Date().getFullYear(), y: 5},
    //             // {x: 4, y: 3},
    //             // {x: 5, y: 4},
    //             // {x: 6, y: 3},
    //             // {x: 7, y: 4},
    //             // {x: 8, y: 5},
    //             // {x: 9, y: 4},
    //             // {x: 10, y: 5},
    //             // {x: 11, y: 5}
    //       ],
    //           borderColor: '#1FB7EC',
    //           fill: true
    //       }
    //     ]
    //   }

      this.politeness = {
        labels: [1,5,10,15,20,25,30],
        datasets: [
            {
                label: 'Politeness',
                data: [4,3,5,10,6,7,8,9,3,9,7,10,7,3,7,10,7,8,5,3,4,3,5,9,9,8,6,4,5,5,5,6,8,7],
                borderColor: '#1FB7EC',
                fill: true
            }
          ]
        }

        this.helpfulness = {
          labels: [1,5,10,15,20,25,30],
          datasets: [
              {
                  label: 'Helpfulness',
                  data: [4,3,3,7,9,9,8,6,4,5,5,10,7,8,5,3,4,3,5,9,9,8,6,4,5,5,5,6,8,7],
                  borderColor: '#1FB7EC',
                  fill: true
              }
            ]
          }

          this.trustworthiness = {
            labels: [1,5,10,15,20,25,30],
            datasets: [
                {
                    label: 'Trustworthiness',
                    data: [4,3,5,10,6,7,8,9,3,4,3,5,9,9],
                    borderColor: '#1FB7EC',
                    fill: true
                }
              ]
            }

    }

    selectData(event) {
      // this.msgs = [];
      // this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
      // console.log(this.msgs);
      console.log(event);
    }



} //end component

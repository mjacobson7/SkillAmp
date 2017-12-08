import { Component, OnInit } from '@angular/core';


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

  constructor() { }

  ngOnInit() {
    this.recommend = {
      labels: [1,5,10,15,20,25,30],
      datasets: [
          {
              label: 'Likelihood to Recommend',
              data: [5,10,9,7,9,9,10,8,6,4,9,3,6,4,4,4,4,6,8,5,3,4,3,5,9,9,8,6,4,5,5,5,6,8,7],
              borderColor: '#1FB7EC',
              fill: true
          }
        ]
      }

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
                  label: 'Politeness',
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
                    label: 'Politeness',
                    data: [4,3,5,10,6,7,8,9,3,4,3,5,9,9],
                    borderColor: '#1FB7EC',
                    fill: true
                }
              ]
            }

    }

    // selectData(event) {
    //   this.msgs = [];
    //   this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
    //   console.log(this.msgs);
    // }



} //end component

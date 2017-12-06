import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  data: any;
  msgs: any;

  constructor() { }

  ngOnInit() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
          {
              label: 'Likelihood to Recommend',
              data: [7,9,9,4,4,3,6,7,8,10,7,7,9,4,4,3,3,6,3,10,5,9,3,9,7,10,7,3,7,10,4,7,5,10,9,9,7,10,6,10,10,3,6,8,3,3,5,9,4,3,5,10,10,6,3,7,7,6,6,3,7,9,8,3,7,8,6,8,6,6,4,8,8,8,10,6,5,6,3,6,9,4,5,10,8,3,4,3,4,9,9,6,9,5,10,4,3,9,5,7,4,9,8,,5,8,3,6,3,6,6,4,6,8,9,4,4,3,5,4,6,4,6,3,7,6,9,7,9,10,10,6,3,3,6,6,6,6,7,3,10,3,10,5,10,9,7,9,9,10,8,6,4,9,3,6,4,4,4,4,6,3,10,7,4,9,7,6,8,5,3,9,8,8,7,9,9,4,8,6,6,9,10,7,8,5,3,4,3,5,9,9,8,6,4,5,5,5,6,8,7],
              borderColor: '#1FB7EC',
              fill: true
          }
        ]
      }
    }

    selectData(event) {
      this.msgs = [];
      this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
      console.log(this.msgs);
    }



} //end component

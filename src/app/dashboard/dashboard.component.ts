import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  frontJS: any = [0, 0, 0, 0];
  backJs: any = [0, 0, 0, 0];
  backPhp: any = [0, 0, 0, 0];

  //start graph variable
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [ '2018', '2017', '2016', '2015'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: this.frontJS , label: 'Front Javascript' },
    { data: this.backJs, label: 'Back Javascript' },
    { data: this.backPhp, label: 'Back PHP' },

  ];
  //end graph variable

  data: any;

  dataForm = {
    speciality: null,
    number: null,
    category: null,
    technology: null
  };

  isValide: boolean;


  constructor(private dataService: DataService) {
    this.data = this.dataService.getData();
    this.setDataChart();
  }

  addData() {
    if (this.dataForm.category
      && this.dataForm.number
      && this.dataForm.speciality
      && this.dataForm.technology ) {
        this.data[0].push(this.dataForm);
        this.dataService.sendData(this.data);
        this.setDataChart();

        //update la vue
        this.barChartData = [
          { data: this.frontJS , label: 'Front Javascript' },
          { data: this.backJs, label: 'Back Javascript' },
          { data: this.backPhp, label: 'Back PHP' },
        ];
        this.dataForm = {
          speciality: null,
          number: null,
          category: null,
          technology: null
        };
        this.isValide = true;
      } else {
        this.isValide = false;
      }
  }

  /**
   * ajouter des donneés 
   * pour la vue chart (graph)
   * 
   */
  setDataChart() {
    console.log(this.data.length);
    for (let j = 0; j < this.data.length; j++) {
      for (let i = this.data[j].length - 1 ; i > 0;  i--) {
        if (this.data[j][i].category === 'Front' && this.data[j][i].technology === 'Javascript') {
          this.frontJS[j] = + parseInt(this.data[j][i].number, 10);
        }
        if (this.data[j][i].category === 'Back' && this.data[j][i].technology === 'Javascript') {
          this.backJs[j] = + parseInt(this.data[j][i].number, 10);
        }
        if (this.data[j][i].category === 'Back' && this.data[j][i].technology === 'PHP') {
          this.backPhp[j] = + parseInt(this.data[j][i].number, 10);
        }
      }
    }
  }



  ngOnInit() {

  }


}


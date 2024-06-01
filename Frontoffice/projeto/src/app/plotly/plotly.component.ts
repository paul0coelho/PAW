import { Component, OnInit } from '@angular/core';
import { PlotlyService } from '../services/plotly.service'

@Component({
  selector: 'app-plotly',
  templateUrl: './plotly.component.html',
  styleUrls: ['./plotly.component.css']
})
export class PlotlyComponent implements OnInit {
constructor(private plot:PlotlyService) { }
ngOnInit(): void {
    let x:number[] = [1,2,3,4,5];
    let y:number[] = [1,2,3,4,5];
    this.plot.plotLine("Line Plot","plot",x,y);
  }
}
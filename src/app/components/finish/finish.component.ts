import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-finish',
  templateUrl: './finish.component.html',
  styleUrls: ['./finish.component.css']
})
export class FinishComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  tryAgain(){
    this._router.navigate(["/"])
  }

}

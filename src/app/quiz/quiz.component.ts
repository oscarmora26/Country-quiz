import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  country: any
  question: any
  answer: any[] = []
  preguntasHechas: number[] = []
  correctAnswer: number = 0
  @ViewChild('next', { static: true }) next: ElementRef

  constructor(private _countryService: CountryService) {
    this.getCountry()
  }

  ngOnInit(): void {
  }

  getCountry() {
    this._countryService.getCountry().subscribe(resp => {
      this.country = resp
      this.getCountyAndCapital()
    })
  }

  getCountyAndCapital() {
    for (let index = 0; index < 4; index++) {
      let id = (Math.ceil(Math.random() * (250 - 0)) + 0)

      if (index == 0) {
        this.preguntasHechas.push(id)
      }
      if (index == 0) {
        this.answer.push({ capital: this.country[id]['name'], correct: true })
        this.question = `La capital de ${this.country[id]['capital']} es`
      } else {
        this.answer.push({ capital: this.country[id]['capital'], correct: false })
      }
    }
  }

  checkAnswer(e, i) {
    if (e['correct']) {
      this.correctAnswer = this.correctAnswer + 1
    }
    else {
    }
    this.next.nativeElement.classList.remove('d-none')
    this.filtro(i)
  }

  filtro(i) {
    const inputList = document.getElementsByTagName('input')
    for (let index = 0; index < inputList.length; index++) {
      if (inputList[index].getAttribute('value') == 'true') {
        const padre = inputList[index].parentElement
        padre.classList.add('correct')
      }
    }
    if (inputList[i].getAttribute('value') == 'true') {
      const padre = inputList[i].parentElement
      padre.classList.add('correct')
    } else {
      const padre = inputList[i].parentElement
      padre.classList.add('incorrect')
    }
  }

  nextAnswer() {
    this.answer = []
    this.next.nativeElement.classList.remove('d-none')
    console.log(this.correctAnswer)
    if (this.correctAnswer == 1) {
      const a = document.getElementById('card-question')
      const b = document.getElementById('card-result')
      a.classList.add('d-none')
      b.classList.remove('d-none')
    }
    this.getCountyAndCapital()
  }

  tryAgain(){
    const a = document.getElementById('card-question')
    const b = document.getElementById('card-result')
    a.classList.remove('d-none')
    b.classList.add('d-none')
    this.answer = []
    this.correctAnswer = 0
    this.getCountyAndCapital()
  }
}

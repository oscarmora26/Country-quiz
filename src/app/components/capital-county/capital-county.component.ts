import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CountryService } from 'src/app/services/country.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-capital-county',
  templateUrl: './capital-county.component.html',
  styleUrls: ['./capital-county.component.css']
})
export class CapitalCountyComponent implements OnInit {

  countryList: any[] = []
  answerListRandon: any[] = []
  arrayRandon: any[] = []
  response: any = null
  selectAnswer: boolean = false
  typeSelectQuestion: number
  @ViewChildren('answers') answers!: QueryList<ElementRef>
  countSelectQuestion: number = 0

  constructor(private _countryService: CountryService, private _router: Router) {
    
  }

  ngOnInit(): void {
    this.getPaises()
  }  

  ngAfterViewInit() {
    this.setArrayRandon()
  }

  //Obtiene la lista de paise
  getPaises() {
    this._countryService.getCountry().subscribe(res => {
      this.countryList = <any[]>res
      this.getCapitalCuntryRandon()
      console.log(res)
    })
  }

  //Obtiene las preguntas (Dado una capital seleccionar el pais)
  getCapitalCuntryRandon() {
    for (let i = 0; i < 4; i++) {
      let numberRandon = (Math.floor((Math.random() * (250 - 0 + 1)) + 0))
      console.log(numberRandon)
      if (!this.countryList.includes(numberRandon)) {
        this.answerListRandon.push(this.countryList[numberRandon]['name'])
        if (i == 0){
          this.response = { response: this.countryList[numberRandon]['name'],
          question: this.countryList[numberRandon]['capital'] + " es la capital de"}
        } 
      } else {
        i = i - 1
      }
    }
  }

  //Obtiene las preguntas (Dado una bandera seleccionar el pais)
  getFlagCountryRandon(){
    for (let i = 0; i < 4; i++) {
      let numberRandon = (Math.floor((Math.random() * (250 - 0 + 1)) + 0))
      console.log(numberRandon)
      if (!this.countryList.includes(numberRandon)) {
        this.answerListRandon.push(this.countryList[numberRandon]['name'])
        if (i == 0){
          this.response = { response: this.countryList[numberRandon]['name'], 
          question: "Cual pais tiene esta bandera", 
          flag: this.countryList[numberRandon]['flag']}
        } 
      } else {
        i = i - 1
      }
    }
  }

  //Verifica si la respuesta que se selecciono es la correcta
  checkAnswer(resp, element) {
    if (this.selectAnswer == false) {
      if (resp == this.response.response) {
        let contador: number = 1
        this.answers.map(x => {
          if (contador == element) {
            //Si selecciona la respuesta correcta se pone en verde
            x.nativeElement.classList.replace('answer-neutral', 'answer-correct')
          }
          contador = contador + 1
        })
      } else {
        let contador: number = 1
        this.answers.map(x => {
          if (contador == element) {
            //Si se pone la incorrecta se pone en rojo
            x.nativeElement.classList.replace('answer-neutral', 'answer-incorrect')
          }
          contador = contador + 1
        })
        //Se busca cual es la respuesta correcta
        this.searchCorrectAnswer()
      }
    }
    this.selectAnswer = true
  }

  //Busca la respuesta correcta
  searchCorrectAnswer(){
    let contador = 0
    let indexCorrectAnswer = this.arrayRandon.indexOf(0)
    console.log(indexCorrectAnswer)
    this.answers.map(x => {
      if (contador == indexCorrectAnswer) {
        x.nativeElement.classList.replace('answer-neutral', 'answer-correct')
      }
      contador = contador + 1
    })
  }

  nextAnswer() {
    this.answerListRandon = []
    this.arrayRandon = []
    this.response = null
    this.selectAnswer = false
    this.answers.map(element => {
      element.nativeElement.setAttribute('class', 'answer answer-neutral')
    })
    this.setArrayRandon()

    let numberRandon = (Math.floor((Math.random() * (1 - 0 + 1)) + 0))
    if (numberRandon == 0) {
       this.getCapitalCuntryRandon()
    }else{
      this.getFlagCountryRandon()
    }
    this.typeSelectQuestion = numberRandon
    this.countSelectQuestion ++

    if(this.countSelectQuestion == 4){
      this._router.navigate(['/finish'])
    }
  }

  //Agrega a un array los numeros del 0 al 3 de forma aleatoria para colocar el orden de las preguntas
  setArrayRandon() {
    for (let i = 0; i < 4; i++) {
      let numberRandon = (Math.floor(Math.random() * (4 - 0)) + 0)

      if (!this.arrayRandon.includes(numberRandon)) {
        this.arrayRandon.push(numberRandon)
      } else {
        i = i - 1        
      }
    }
    console.log(this.arrayRandon)
  }

}

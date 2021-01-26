import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CapitalCountyComponent } from './components/capital-county/capital-county.component';
import { FinishComponent } from './components/finish/finish.component';

const routes: Routes = [
  { path: 'capital', component: CapitalCountyComponent },
  { path: 'finish', component: FinishComponent },
  { path: '', component: CapitalCountyComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CalculatorComponent } from "./features/calculator/calculator.component";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "calculator",
  },
  {
    path: "calculator",
    component: CalculatorComponent,
  },
  {
    path: "**",
    redirectTo: "calculator",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

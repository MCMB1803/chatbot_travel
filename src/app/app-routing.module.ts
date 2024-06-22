import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FaqComponent } from './faq/faq.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  {path: '', component: ChatbotComponent}, {path: 'home', component: ChatbotComponent}, {path: 'faq', component: FaqComponent}, {path: 'about', component: AboutComponent,}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

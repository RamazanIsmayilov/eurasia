import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes)
    ]
})

export class AppModule { }

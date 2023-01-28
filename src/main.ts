import 'zone.js/dist/zone';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import {
  BehaviorSubject,
  forkJoin,
  merge,
  Observable,
  first,
  switchMap,
  of,
  tap,
  combineLatest,
  take,
} from 'rxjs';

@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Hello from {{name}}!</h1>
    <a target="_blank" href="https://angular.io/start">
      Learn more about Angular 
    </a>
    <button (click)="start()">start beha</button>
    <button (click)="startEv()">start ev</button>
    <button (click)="startEv2()">start ev2</button>
  `,
})
export class App implements OnInit {
  name = 'Angular';
  ev = new BehaviorSubject<number>(3);
  ev2 = new BehaviorSubject<number>(3);
  beha = new BehaviorSubject<number>(3);

  ngOnInit(): void {
    combineLatest([merge(this.ev, this.ev2), this.beha])
      .pipe(
        switchMap(([ev, beha]) => {
          return of(beha);
        }),
        tap((beha) => {
          console.log(2);
        })
      )
      .subscribe();
  }

  public start() {
    this.beha.next(this.beha.getValue() + 1);
  }
  public startEv() {
    this.ev.next(0);
  }
  public startEv2() {
    this.ev2.next(1);
  }
}
bootstrapApplication(App);

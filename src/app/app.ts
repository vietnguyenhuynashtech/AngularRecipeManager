import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgClass, RouterLinkWithHref],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('RecipeManager');
  activeLink:string = "/";

  setActiveLink(link:string): void {
    this.activeLink = link;
  }
}

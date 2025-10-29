import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NgClass, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  activeLink:string = "/";

  setActiveLink(link:string): void {
    this.activeLink = link;
  }
}

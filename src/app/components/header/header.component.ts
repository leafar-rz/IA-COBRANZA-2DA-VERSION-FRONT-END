import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

//aqui declaramos la variable que tenemos en el html, ocupamos importar el Input en las importaciones para que no de error
  @Input() titulo: string | undefined;

  constructor() { }

  ngOnInit() {}

}

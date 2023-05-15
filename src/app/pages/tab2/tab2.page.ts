import { Component } from '@angular/core';
import { BuscarResponse } from 'src/app/interfaces/buscador';
import { ServicesService } from 'src/app/services.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  busquedaResponse: BuscarResponse[] | undefined;
  searchText: string = '';
  showSpecificCard: boolean = false;

  constructor(
    private serviceBuscador: ServicesService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.searchText = params['searchText'];
      this.buscar();
    });
  }

  buscar() {
    const valorBusqueda = this.searchText.trim();
  
    if (valorBusqueda !== '') {
      this.serviceBuscador.getappNoti(valorBusqueda).subscribe((resp: any) => {
        this.busquedaResponse = resp as BuscarResponse[];
        console.log(resp);
      }, (error: any) => {
        console.error(error);
      }, () => {
        console.log('Consulta completada');
      });
    } else {
      // Realiza la solicitud sin la variable de búsqueda
      this.serviceBuscador.getappNoti().subscribe((resp: any) => {
        this.busquedaResponse = resp as BuscarResponse[];
        console.log(resp);
      }, (error: any) => {
        console.error(error);
      }, () => {
        console.log('Consulta completada');
      });
    }
  }
}

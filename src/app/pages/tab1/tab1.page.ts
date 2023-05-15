import { Component } from '@angular/core';
import {BuscarResponse} from '../../interfaces/buscador';
import { ServicesService } from '../../services.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  searchText: string = '';
  busquedaResponse: BuscarResponse[] | undefined;

  constructor(private serviceBuscador: ServicesService, private router: Router) {}
  

  ngOnInit() {
    this.buscar();
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

  irATab2() {
    if (this.searchText.trim() !== '') {
      this.router.navigate(['/tab2', { searchText: this.searchText.trim() }]);
    } else {
      this.router.navigate(['/tab2'], { queryParams: { showCard: true } });
    }
  }

  irAPaginaDetalle(item: BuscarResponse) {
    // Aquí debes determinar qué parámetro debes pasar a la página de detalle, como el ID o cualquier otro identificador único de la publicación
    const parametro = item.Contenido; // Reemplaza "id" con el nombre de la propiedad que identifica la publicación
    
    this.router.navigate(['/pagina-detalle', parametro]);
  }
  
  
}

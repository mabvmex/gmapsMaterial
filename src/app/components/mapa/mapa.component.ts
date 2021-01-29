import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Marcador } from '../../classes/marcador.class';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  marcadores: Marcador[] = [];

  lat = 51.678418;
  lng = 7.809007;
  marcador: any;
  
  constructor( public snackBar: MatSnackBar,
               public dialog: MatDialog 
    ) { 

    if(localStorage.getItem('marcadores')){
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento) {

    const coords: {lat: number, lng: number} = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng );
    this.marcadores.push(nuevoMarcador); 

    this.guardarStorage();
    
    console.log(evento.coords.lat);
    console.log(evento.coords.lng);

    this.snackBar.open('Marcador agregado ', 'Cerrar', { duration: 3000 })
  }


  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }

  borrarMarcador(i: number) {
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open('Marcador borrado ', 'Cerrar', { duration: 3000 })
  }

 editarMarcador(marcador: Marcador) {
  const dialogRef = this.dialog.open(MapaEditarComponent, {
    width: '250px',
    data: {name: marcador.titulo, desc: marcador.desc}
  });

 }
  
}

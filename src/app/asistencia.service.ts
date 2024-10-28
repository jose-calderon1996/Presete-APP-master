import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private datosQr: any; 

  setDatosQr(datosQr: any) {
    this.datosQr = datosQr; 
    console.log('Datos QR guardados:', this.datosQr);
  }

  getDatosQr() {
    return this.datosQr; 
  }

  

  constructor() {}

  

  
}

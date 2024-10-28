import { Component } from '@angular/core';
import { AsistenciaService } from '../asistencia.service';

@Component({
  selector: 'app-escaner',
  templateUrl: './escaner.page.html',
  styleUrls: ['./escaner.page.scss'],
})
export class EscanerPage {
  constructor(private asistenciaService: AsistenciaService) {}

  async escanear() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = async (e: any) => {
          const img = new Image();
          img.src = e.target.result;
          img.onload = async () => {
            const imageData = await this.obtenerDatosQr(img);
            this.asistenciaService.setDatosQr(imageData); // Guardar datos en el servicio
          };
        };
        reader.readAsDataURL(file);
      }
    };
    input.click(); // Abrir el selector de archivos
  }

  async obtenerDatosQr(img: HTMLImageElement) {
    
    return { fecha: '2024-10-27', asistio: true }; 
  }
}

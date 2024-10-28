import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cambio-pass',
  templateUrl: './cambio-pass.page.html',
  styleUrls: ['./cambio-pass.page.scss'],
})
export class CambioPassPage {
  nuevaContrasena: string = '';
  confirmarContrasena: string = '';
  

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  async cambiarContrasena() {
    if (this.nuevaContrasena === this.confirmarContrasena) {
      const loading = await this.loadingController.create({
        message: 'Cambiando contraseña...',
        duration: 2000, // Duración de la animación
      });

      await loading.present(); // Muestra el loading

      try {
        await this.authService.cambiarContrasena(this.nuevaContrasena);
        loading.dismiss(); // Oculta el loading

        // Mostrar mensaje de éxito
        const toast = await this.toastController.create({
          message: 'Contraseña cambiada con éxito',
          duration: 2000,
          position: 'top',
          color: 'success',
        });
        await toast.present(); // Muestra el toast

        this.navCtrl.navigateBack('/perfil-estudiante'); // Redirige al perfil
      } catch (error) {
        loading.dismiss(); // Oculta el loading
        console.error('Error al cambiar la contraseña:', error);
        
        const toast = await this.toastController.create({
          message: 'Error al cambiar la contraseña',
          duration: 2000,
          position: 'top',
          color: 'danger',
        });
        await toast.present(); 
      }
    } else {
      console.error('Las contraseñas no coinciden');
      
      const toast = await this.toastController.create({
        message: 'Las contraseñas no coinciden',
        duration: 2000,
        position: 'top',
        color: 'warning',
      });
      await toast.present(); 
    }
  }

  navegarPerfil() {
    this.navCtrl.navigateBack('/perfil-estudiante');
  }
 
}

import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-estudiantil',
  templateUrl: './registro-estudiantil.page.html',
})
export class RegistroEstudiantilPage {
  correo: string = '';
  contrasena: string = '';
  nombre: string = '';
  comuna: string = '';
  direccion: string = '';
  fechaNacimiento: string = '';
  carrera: string = '';
  userData: unknown;

  constructor(
    private authService: AuthService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.userData = null; 
  }

  async registrar() {
    const loading = await this.loadingController.create({
      message: 'Registrando...',
      spinner: 'crescent',
    });
    await loading.present();

    try {
      const userCredential = await this.authService.register(this.correo, this.contrasena);
      
      if (userCredential.user) {
        await this.authService.saveUserData(userCredential.user.uid, {
          nombre: this.nombre,
          comuna: this.comuna,
          direccion: this.direccion,
          fechaNacimiento: this.fechaNacimiento,
          carrera: this.carrera
        });
        this.mostrarToast('Registro exitoso');
        this.router.navigate(['/home']);
      } else {
        this.mostrarToast('Error en el registro');
      }

    } catch (error) {
      this.mostrarToast('Error en el registro');
      console.error('Error en el registro:', error);
    } finally {
      await loading.dismiss();
    }
  }

  async mostrarToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success',
    });
    await toast.present();
  }

  // Función para navegar a la página de inicio de sesión
  navigateToLogin() {
    this.navCtrl.navigateBack('/login'); 
  }
}

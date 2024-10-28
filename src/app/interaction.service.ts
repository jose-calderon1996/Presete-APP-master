import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class InteractionService {
  private loading: any;

  constructor(private toastController: ToastController, private loadingController: LoadingController) {}

  async showLoading(message: string) {
    this.loading = await this.loadingController.create({
      message: message,
      spinner: 'crescent',
      duration: 2000 
    });
    await this.loading.present();
  }

 

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async dismissLoading() {
    if (this.loading) {
      await this.loading.dismiss();
      this.loading = null;
    }
  }
}

export const showAlert = async function (alertCtrl: any, title: string, message: string) {
    const alert = await alertCtrl.create({
      title: title,
      message: message,
      cssClass: 'alertConfirm',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
  
          }
        }
      ]
    });
    alert.present();
  }
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements AfterViewInit {
  @ViewChild('dfMessengerElement') dfMessengerElement: ElementRef | undefined;

  private inactivityTimer: any;
  private autoMessageTimeout1: number = 60000; // 1 minuto en milisegundos
  private autoMessageTimeout2: number = 120000; // 2 minutos en milisegundos
  private closeTimeout: number = 300000; // 5 minutos en milisegundos

  constructor() {}

  ngAfterViewInit(): void {
    console.log('dfMessengerElement:', this.dfMessengerElement);
    this.initializeTimers();
  }

  initializeTimers(): void {
    if (this.dfMessengerElement && this.dfMessengerElement.nativeElement) {
      console.log('dfMessengerElement.nativeElement:', this.dfMessengerElement.nativeElement);
      this.dfMessengerElement.nativeElement.addEventListener('df-chatsession-started', () => {
        this.resetTimers();
      });
      this.startCloseTimer();
      this.startAutoMessageTimer1(); // Iniciar el primer mensaje automático al cargar
    }
  }

  startCloseTimer(): void {
    this.inactivityTimer = setTimeout(() => {
      this.closeChat();
    }, this.closeTimeout);
  }

  resetTimers(): void {
    clearTimeout(this.inactivityTimer);
    this.startCloseTimer();
    this.startAutoMessageTimer1();
  }

  startAutoMessageTimer1(): void {
    setTimeout(() => {
      this.sendAutoMessage("Si deseas más información sobre esta opción, por favor pregúntame. O escribe 'Menú' para volver al menú principal y seleccionar otra opción.");
      this.startAutoMessageTimer2();
    }, this.autoMessageTimeout1);
  }

  startAutoMessageTimer2(): void {
    setTimeout(() => {
      this.sendAutoMessage('¿Necesitas más información que pueda proporcionarte? El chat se cerrará si no hay interacción en los próximos 5 minutos.');
    }, this.autoMessageTimeout2);
  }

  sendAutoMessage(message: string): void {
    if (this.dfMessengerElement && this.dfMessengerElement.nativeElement) {
      const dfMessengerElement = this.dfMessengerElement.nativeElement as HTMLElement;
      const dfMessengerChat = dfMessengerElement.querySelector('df-messenger-chat');
      if (dfMessengerChat) {
        const dfMessengerInstance = (dfMessengerChat as any).dfMessenger._dfMessenger;
        dfMessengerInstance.sendMessage({ content: message, isUserMessage: false });
      }
    }
  }

  closeChat(): void {
    if (this.dfMessengerElement && this.dfMessengerElement.nativeElement) {
      const dfMessengerElement = this.dfMessengerElement.nativeElement as HTMLElement;
      const dfMessengerChat = dfMessengerElement.querySelector('df-messenger-chat');
      if (dfMessengerChat) {
        const dfMessengerInstance = (dfMessengerChat as any).dfMessenger._dfMessenger;
        dfMessengerInstance.sendMessage({
          content: 'El chat se cerró debido a falta de interacción en los últimos 5 minutos.',
          isUserMessage: false
        });
        dfMessengerInstance.close();
      }
    }
  }
}

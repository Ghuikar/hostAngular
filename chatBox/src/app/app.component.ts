import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'], // Note: Use 'styleUrls' instead of 'styleUrl'
})
export class AppComponent implements OnInit {
  title = 'chatBox';
  colorLoad: any;
  urlLoad: any;
  counter = 0;

  chatboxHeight!: string;
  chatboxWidth!: string;

  ngOnInit(): void {
    this.initializeConfig();
  }

  private initializeConfig(): void {
    setTimeout(() => {
      const config = (window as any).customConfig || {};
      console.log('Configuration received:', config);

      this.urlLoad = config.url || '';
      this.chatboxHeight = config.height || '400px';
      this.chatboxWidth = config.width || '300px';

      const color = config.color || 'defaultColor';
      this.colorLoad = color;
      console.log('colorLoad', this.colorLoad);
      console.log('this.chatboxHeight', this.chatboxHeight);
      console.log('this.chatboxWidth', this.chatboxWidth);

      this.applyConfiguration();
    }, 100);
  }

  private applyConfiguration(): void {
    const heading = document.getElementById('configurable-heading');
    const chatbox = document.querySelector('.chatbox') as HTMLElement;

    if (heading) {
      heading.style.backgroundColor = this.colorLoad;
    } else {
      console.error('Element with ID "configurable-heading" not found.');
    }

    if (chatbox) {
      chatbox.style.height = this.chatboxHeight;
      chatbox.style.width = this.chatboxWidth;
    }
  }

  isChatboxOpen = false;
  message = '';
  messages: {
    text: string;
    type: 'user' | 'reply';
    time: Date;
    isRead: boolean;
  }[] = [];

  toggleChatbox(): void {
    this.isChatboxOpen = !this.isChatboxOpen;
    if (this.isChatboxOpen) {
      if (this.counter == 0) {
        this.receiveReply(
          'Hi, I am virtual assistant here to help you find what you need.'
        );
        this.counter++;
      }
    }
  }

  sendMessage(): void {
    if (this.message.trim()) {
      this.messages.push({
        text: this.message,
        type: 'user',
        time: new Date(),
        isRead: false,
      });
      this.message = '';

      setTimeout(() => {
        const messagesContainer = document.querySelector(
          '.chatbox__messages'
        ) as HTMLElement;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      });

      setTimeout(() => {
        this.receiveReply(
          'Thank you for your inquiry. One of our agents will be in touch with you shortly. Please note that this is an automatically generated reply. Thank you for your understanding.'
        );
      }, 1000);
    }
  }

  receiveReply(msg: string): void {
    setTimeout(() => {
      this.messages.push({
        text: msg,
        type: 'reply',
        time: new Date(),
        isRead: true,
      });

      setTimeout(() => {
        const messagesContainer = document.querySelector(
          '.chatbox__messages'
        ) as HTMLElement;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }, 0);
    }, 500);
  }
}

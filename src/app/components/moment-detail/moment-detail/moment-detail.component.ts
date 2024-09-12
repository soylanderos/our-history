import { Component, Input, ElementRef, Renderer2 } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-moment-detail',
  templateUrl: './moment-detail.component.html',
  styleUrls: ['./moment-detail.component.scss']
})
export class MomentDetailComponent {
  @Input() moment: any;
  showText: boolean = true;
  private scale: number = 1;
  private lastScale: number = 1;

  constructor(private modalController: ModalController, private el: ElementRef, private renderer: Renderer2) {}

  closeModal() {
    this.modalController.dismiss();
  }

  toggleText() {
    this.showText = !this.showText;
  }

  ngAfterViewInit() {
    // const image = this.el.nativeElement.querySelector('.background-image');
    
    // image.addEventListener('wheel', (event: WheelEvent) => {
    //   event.preventDefault();
    //   this.scale += event.deltaY * -0.01;
    //   this.scale = Math.min(Math.max(1, this.scale), 4);
    //   this.renderer.setStyle(image, 'transform', `scale(${this.scale})`);
    // });

    let initialDistance = 0;
    let currentDistance = 0;

    // image.addEventListener('touchstart', (event: TouchEvent) => {
    //   if (event.touches.length === 2) {
    //     initialDistance = Math.hypot(
    //       event.touches[0].pageX - event.touches[1].pageX,
    //       event.touches[0].pageY - event.touches[1].pageY
    //     );
    //   }
    // });

    // image.addEventListener('touchmove', (event: TouchEvent) => {
    //   if (event.touches.length === 2) {
    //     currentDistance = Math.hypot(
    //       event.touches[0].pageX - event.touches[1].pageX,
    //       event.touches[0].pageY - event.touches[1].pageY
    //     );
    //     this.scale = (currentDistance / initialDistance) * this.lastScale;
    //     this.scale = Math.min(Math.max(1, this.scale), 4);
    //     this.renderer.setStyle(image, 'transform', `scale(${this.scale})`);
    //   }
    // });

    // image.addEventListener('touchend', () => {
    //   this.lastScale = this.scale;
    // });

    // image.addEventListener('wheel', (event: WheelEvent) => {
    //   // Tu lógica de manejo de eventos aquí
    // }, { passive: true });

    // image.addEventListener('touchstart', (event: TouchEvent) => {
    //   // Tu lógica de manejo de eventos aquí
    // }, { passive: true });
    
    // image.addEventListener('touchmove', (event: TouchEvent) => {
    //   // Tu lógica de manejo de eventos aquí
    // }, { passive: true });
    
    
  }
}

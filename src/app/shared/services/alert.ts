import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

interface AlertProps {
  icon: SweetAlertIcon;
  message: string;
  position?: SweetAlertPosition;
  title?: string;
  timer?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  createAlert({ icon, message, position = 'top-end', title, timer = 3000 }: AlertProps) {
    const Toast = Swal.mixin({
      toast: position !== 'center',
      position: position,
      showConfirmButton: position === 'center',
      timer: timer,
      timerProgressBar: true,
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
      color: '#e2e8f0',
      didOpen: (toast) => {
        Object.assign(toast.style, {
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1)',
          fontFamily: 'Inter, Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        });

        const progressBar = toast.querySelector('.swal2-timer-progress-bar') as HTMLElement;
        if (progressBar) {
          progressBar.style.background = 'linear-gradient(90deg, #3b82f6, #1d4ed8)';
          progressBar.style.height = '3px';
        }

        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: icon,
      title: title || message,
      text: title ? message : undefined,
    });
  }
}

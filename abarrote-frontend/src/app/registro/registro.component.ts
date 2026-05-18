import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-marca-oscuro via-indigo-800 to-marca-oscuro flex items-center justify-center p-4">
      <div class="w-full max-w-lg">

        <!-- Logo -->
        <div class="text-center mb-8">
          <div class="bg-white rounded-2xl p-5 inline-block shadow-2xl mb-4">
            <img src="logo.png" alt="AbarroteXpress" class="h-16 w-auto" />
          </div>
          <p class="text-slate-300 text-sm">Registra tu tienda y únete a la red</p>
        </div>

        <!-- Éxito -->
        <div *ngIf="enviado" class="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <h2 class="text-xl font-bold text-slate-800 mb-2">¡Solicitud enviada!</h2>
          <p class="text-slate-500 text-sm mb-6">
            Nuestro equipo revisará los datos de tu tienda. Recibirás una confirmación cuando tu cuenta esté activa.
          </p>
          <a routerLink="/login" class="inline-block bg-indigo-600 text-white font-semibold px-6 py-2.5 rounded-lg hover:bg-indigo-700 transition-all">
            Volver al inicio de sesión
          </a>
        </div>

        <!-- Formulario -->
        <div *ngIf="!enviado" class="bg-white rounded-2xl shadow-2xl p-8">
          <h2 class="text-xl font-bold text-slate-800 mb-6">Datos de tu tienda</h2>

          <!-- Error -->
          <div *ngIf="error" class="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-2">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {{ error }}
          </div>

          <form (ngSubmit)="enviar()" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Nombre de la tienda</label>
                <input
                  type="text"
                  [(ngModel)]="form.nombre"
                  name="nombre"
                  required
                  placeholder="Tienda La Esperanza"
                  class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-slate-700 mb-1">Teléfono</label>
                <input
                  type="tel"
                  [(ngModel)]="form.telefono"
                  name="telefono"
                  required
                  placeholder="614 123 4567"
                  class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Dirección</label>
              <input
                type="text"
                [(ngModel)]="form.direccion"
                name="direccion"
                required
                placeholder="Calle Juárez 123, Col. Centro, Chihuahua"
                class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                [(ngModel)]="form.email"
                name="email"
                required
                placeholder="contacto@mitienda.com"
                class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
              <div class="relative">
                <input
                  [type]="mostrarPassword ? 'text' : 'password'"
                  [(ngModel)]="form.password"
                  name="password"
                  required
                  placeholder="Mínimo 6 caracteres"
                  class="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all pr-10"
                />
                <button
                  type="button"
                  (click)="mostrarPassword = !mostrarPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg *ngIf="!mostrarPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  <svg *ngIf="mostrarPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  </svg>
                </button>
              </div>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-700 flex items-start gap-2">
              <svg class="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Tu solicitud será revisada por el administrador antes de poder acceder al sistema.
            </div>

            <button
              type="submit"
              [disabled]="cargando"
              class="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <svg *ngIf="cargando" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              {{ cargando ? 'Enviando...' : 'Enviar solicitud' }}
            </button>
          </form>

          <p class="text-center text-sm text-slate-500 mt-6">
            ¿Ya tienes cuenta?
            <a routerLink="/login" class="text-indigo-600 font-semibold hover:text-indigo-700">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  `,
})
export class RegistroComponent {
  form = { nombre: '', direccion: '', telefono: '', email: '', password: '' };
  error = '';
  cargando = false;
  enviado = false;
  mostrarPassword = false;

  constructor(private auth: AuthService) {}

  enviar() {
    if (!this.form.nombre || !this.form.email || !this.form.password) return;
    this.cargando = true;
    this.error = '';

    this.auth.registro(this.form).subscribe({
      next: () => {
        this.enviado = true;
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.error?.message ?? 'Error al enviar la solicitud';
        this.cargando = false;
      },
    });
  }
}

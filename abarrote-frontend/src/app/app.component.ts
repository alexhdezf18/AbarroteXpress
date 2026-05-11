import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosService } from './pedidos.service';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-100 p-6">
      <header class="mb-8">
        <h1 class="text-3xl font-bold text-marca-oscuro">AbarroteXpress Dashboard</h1>
        <p class="text-gray-500">Gestión de pedidos en tiempo real</p>
      </header>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          *ngFor="let pedido of pedidos"
          [@fadeSlideInOut]
          class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
        >
          <div class="flex justify-between items-start mb-4">
            <span
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              [ngClass]="{
                'bg-yellow-100 text-yellow-800': pedido.estado === 'pendiente',
                'bg-blue-100 text-blue-800': pedido.estado === 'preparacion',
                'bg-marca-verde text-white': pedido.estado === 'en_camino',
              }"
            >
              {{ pedido.estado | uppercase }}
            </span>
            <span class="text-sm text-gray-500">{{
              pedido.fechaCreacion | date: 'shortTime'
            }}</span>
          </div>

          <h3 class="text-lg font-semibold text-gray-900">{{ pedido.productoNombre }}</h3>
          <p class="text-sm text-gray-500 mb-4">Tel: {{ pedido.clienteTelefono }}</p>

          <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
            <span class="text-lg font-bold text-marca-verde">\${{ pedido.totalCosto }}</span>

            <div class="flex gap-2">
              <button
                *ngIf="pedido.estado === 'pendiente'"
                (click)="cambiarEstado(pedido, 'preparacion')"
                class="bg-marca-oscuro text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                Preparar
              </button>
              <button
                *ngIf="pedido.estado === 'preparacion'"
                (click)="cambiarEstado(pedido, 'en_camino')"
                class="bg-marca-verde text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600"
              >
                Despachar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  pedidos: any[] = [];

  constructor(private pedidosService: PedidosService) {}

  ngOnInit() {
    this.cargarPedidos();
    setInterval(() => this.cargarPedidos(), 3000);
  }

  cargarPedidos() {
    this.pedidosService.obtenerPedidos().subscribe((data) => {
      this.pedidos = data;
    });
  }

  cambiarEstado(pedido: any, nuevoEstado: string) {
    this.pedidosService.actualizarEstado(pedido.id, nuevoEstado).subscribe(() => {
      pedido.estado = nuevoEstado;
    });
  }
}

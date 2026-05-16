import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from './pedidos.service';
import { ProductosService } from './productos.service';
import { trigger, style, transition, animate } from '@angular/animations';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex h-screen bg-[#f1f5f9] font-sans text-slate-800">
      <aside class="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm z-10">
        <div class="h-16 flex items-center px-6 border-b border-slate-100">
          <div class="flex items-center gap-2 text-indigo-600">
            <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span class="text-xl font-bold text-slate-900 tracking-tight">AbarroteXpress</span>
          </div>
        </div>
        <div class="p-4">
          <p class="text-xs font-semibold text-slate-400 mb-4 tracking-wider">MENÚ PRINCIPAL</p>
          <nav class="space-y-1">
            <button
              (click)="pestanaActual = 'pedidos'"
              [ngClass]="{
                'bg-indigo-50 text-indigo-600': pestanaActual === 'pedidos',
                'text-slate-500 hover:bg-slate-50': pestanaActual !== 'pedidos',
              }"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                ></path>
              </svg>
              Dashboard
            </button>
            <button
              (click)="pestanaActual = 'inventario'"
              [ngClass]="{
                'bg-indigo-50 text-indigo-600': pestanaActual === 'inventario',
                'text-slate-500 hover:bg-slate-50': pestanaActual !== 'inventario',
              }"
              class="w-full flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors mt-1"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                ></path>
              </svg>
              Inventario / Stock
            </button>
          </nav>
        </div>
      </aside>

      <div class="flex-1 flex flex-col overflow-hidden">
        <header
          class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm z-0"
        >
          <div
            class="flex items-center bg-slate-100 px-4 py-2 rounded-lg w-96 border border-slate-200 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all"
          >
            <svg
              class="w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Buscar pedido o comando..."
              class="bg-transparent border-none focus:outline-none ml-2 w-full text-sm text-slate-700 placeholder-slate-400"
            />
            <span
              class="text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded text-slate-400 font-mono"
              >⌘K</span
            >
          </div>

          <div class="flex items-center gap-4">
            <button class="relative p-2 text-slate-400 hover:text-slate-500 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                ></path>
              </svg>
              <span
                class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"
              ></span>
            </button>
            <div class="flex items-center gap-3 border-l border-slate-200 pl-4">
              <div class="text-right hidden md:block">
                <p class="text-sm font-semibold text-slate-700">Alex Hernandez</p>
                <p class="text-xs text-slate-500">Admin</p>
              </div>
              <div
                class="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shadow-md"
              >
                AH
              </div>
            </div>
          </div>
        </header>

        <main class="flex-1 overflow-y-auto p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div
              class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p class="text-sm font-medium text-slate-500 mb-1">Pedidos Activos</p>
                <h3 class="text-2xl font-bold text-slate-800">{{ pedidos.length }}</h3>
              </div>
              <div
                class="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p class="text-sm font-medium text-slate-500 mb-1">Ingresos Estimados</p>
                <h3 class="text-2xl font-bold text-slate-800">
                  \${{ ingresosTotales | number: '1.2-2' }}
                </h3>
              </div>
              <div
                class="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
            </div>

            <div
              class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex items-center justify-between"
            >
              <div>
                <p class="text-sm font-medium text-slate-500 mb-1">Stock de Productos</p>
                <h3 class="text-2xl font-bold text-slate-800">{{ productos.length }}</h3>
              </div>
              <div
                class="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div *ngIf="pestanaActual === 'pedidos'">
            <h2 class="text-lg font-bold text-slate-800 mb-4">Monitoreo en Tiempo Real</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                *ngFor="let pedido of pedidos"
                [@fadeSlideInOut]
                class="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div
                  class="absolute top-0 left-0 w-1 h-full"
                  [ngClass]="{
                    'bg-yellow-400': pedido.estado === 'pendiente',
                    'bg-blue-500': pedido.estado === 'preparacion',
                    'bg-emerald-500': pedido.estado === 'en_camino',
                  }"
                ></div>

                <div class="flex justify-between items-start mb-3 ml-2">
                  <span
                    class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold"
                    [ngClass]="{
                      'bg-yellow-100 text-yellow-800': pedido.estado === 'pendiente',
                      'bg-blue-100 text-blue-800': pedido.estado === 'preparacion',
                      'bg-emerald-100 text-emerald-800': pedido.estado === 'en_camino',
                    }"
                  >
                    {{ pedido.estado | uppercase }}
                  </span>
                  <span class="text-xs text-slate-400 font-medium">{{
                    pedido.fechaCreacion | date: 'shortTime'
                  }}</span>
                </div>

                <h3 class="text-lg font-bold text-slate-800 ml-2">{{ pedido.productoNombre }}</h3>
                <p class="text-sm text-slate-500 mb-4 ml-2 flex items-center gap-1 mt-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  {{ pedido.clienteTelefono }}
                </p>

                <div
                  class="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 ml-2"
                >
                  <span class="text-xl font-black text-slate-800">\${{ pedido.totalCosto }}</span>
                  <div class="flex gap-2">
                    <button
                      *ngIf="pedido.estado === 'pendiente'"
                      (click)="cambiarEstado(pedido, 'preparacion')"
                      class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-all"
                    >
                      Preparar
                    </button>

                    <button
                      *ngIf="pedido.estado === 'preparacion'"
                      (click)="cambiarEstado(pedido, 'en_camino')"
                      class="bg-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-600 shadow-sm transition-all"
                    >
                      Despachar
                    </button>

                    <button
                      *ngIf="pedido.estado === 'en_camino'"
                      (click)="imprimirTicket(pedido)"
                      class="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-900 shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      PDF
                    </button>
                  </div>
                </div>
              </div>
              <div
                *ngIf="pedidos.length === 0"
                class="col-span-full bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center"
              >
                <svg
                  class="mx-auto h-12 w-12 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
                <h3 class="mt-2 text-sm font-semibold text-slate-900">Sin pedidos</h3>
                <p class="mt-1 text-sm text-slate-500">
                  Esperando mensajes entrantes de WhatsApp...
                </p>
              </div>
            </div>
          </div>

          <div *ngIf="pestanaActual === 'inventario'" [@fadeSlideInOut]>
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
              <h2 class="text-lg font-bold text-slate-800 mb-4">Agregar al Catálogo</h2>
              <div class="flex flex-col md:flex-row gap-4 items-end">
                <div class="flex-1 w-full">
                  <label class="block text-sm font-medium text-slate-700 mb-1"
                    >Nombre del Producto</label
                  >
                  <input
                    type="text"
                    [(ngModel)]="nuevoProducto.nombre"
                    class="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                    placeholder="Ej. Galletas Emperador"
                  />
                </div>
                <div class="w-full md:w-32">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Precio ($)</label>
                  <input
                    type="number"
                    [(ngModel)]="nuevoProducto.precio"
                    class="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div class="w-full md:w-32">
                  <label class="block text-sm font-medium text-slate-700 mb-1">Stock (Unid.)</label>
                  <input
                    type="number"
                    [(ngModel)]="nuevoProducto.stock"
                    class="w-full border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                    placeholder="0"
                  />
                </div>
                <button
                  (click)="guardarProducto()"
                  class="w-full md:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-indigo-700 shadow-sm transition-all h-[42px] flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  Guardar
                </button>
              </div>
            </div>

            <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div class="px-6 py-4 border-b border-slate-200">
                <h2 class="text-lg font-bold text-slate-800">Productos Registrados</h2>
              </div>
              <table class="min-w-full divide-y divide-slate-200">
                <thead class="bg-slate-50">
                  <tr>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      Producto
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      Precio Base
                    </th>
                    <th
                      class="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th
                      class="px-6 py-3 text-right text-xs font-bold text-slate-500 uppercase tracking-wider"
                    >
                      Estado
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-200 bg-white">
                  <tr *ngFor="let prod of productos" class="hover:bg-slate-50 transition-colors">
                    <td
                      class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900 flex items-center gap-3"
                    >
                      <div
                        class="w-8 h-8 rounded bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs"
                      >
                        {{ prod.nombre.charAt(0) | uppercase }}
                      </div>
                      {{ prod.nombre }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                      \${{ prod.precio }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {{ prod.stock }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800"
                        >Activo</span
                      >
                    </td>
                  </tr>
                  <tr *ngIf="productos.length === 0">
                    <td colspan="4" class="px-6 py-8 text-center text-sm text-slate-500">
                      No hay productos en el inventario.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  `,
  animations: [
    trigger('fadeSlideInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate(
          '400ms cubic-bezier(0.16, 1, 0.3, 1)',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  pestanaActual: 'pedidos' | 'inventario' = 'pedidos';
  pedidos: any[] = [];
  productos: any[] = [];

  nuevoProducto = { nombre: '', precio: null, stock: null };

  constructor(
    private pedidosService: PedidosService,
    private productosService: ProductosService,
  ) {}

  ngOnInit() {
    this.cargarPedidos();
    this.cargarProductos();
    setInterval(() => {
      if (this.pestanaActual === 'pedidos') this.cargarPedidos();
    }, 3000);
  }

  get ingresosTotales(): number {
    return this.pedidos.reduce((acc, pedido) => acc + Number(pedido.totalCosto), 0);
  }

  cargarPedidos() {
    this.pedidosService.obtenerPedidos().subscribe((data) => (this.pedidos = data));
  }

  cargarProductos() {
    this.productosService.obtenerProductos().subscribe((data) => (this.productos = data));
  }

  cambiarEstado(pedido: any, nuevoEstado: string) {
    this.pedidosService
      .actualizarEstado(pedido.id, nuevoEstado)
      .subscribe(() => (pedido.estado = nuevoEstado));
  }

  imprimirTicket(pedido: any) {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text('AbarroteXpress', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Ticket de Compra - ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    doc.text(`Teléfono Cliente: ${pedido.clienteTelefono}`, 14, 45);
    doc.text(`Estado: Despachado`, 14, 52);

    autoTable(doc, {
      startY: 60,
      head: [['Producto', 'Cantidad', 'Total']],
      body: [[pedido.productoNombre, '1', `$${pedido.totalCosto}`]],
      theme: 'grid',
      headStyles: { fillColor: [79, 70, 229] },
    });

    doc.save(`ticket_${pedido.clienteTelefono}.pdf`);
  }

  guardarProducto() {
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) return;

    this.productosService.crearProducto(this.nuevoProducto).subscribe((res) => {
      this.productos.unshift(res);
      this.nuevoProducto = { nombre: '', precio: null, stock: null };
    });
  }
}

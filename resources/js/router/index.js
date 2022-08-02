import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import ('./../views/Home.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import ('./../views/Login.vue'),
  },
  {
    path: '/vehiculos',
    name: 'VehicleIndex',
    component: () => import ('./../views/Vehicle/Index.vue'),
  },
  {
    path: '/vehiculos/crear',
    name: 'VehicleCreate',
    component: () => import ('./../views/Vehicle/Create.vue'),
  },
  {
    path: '/vehiculos/:vehicle',
    name: 'VehicleShow',
    component: () => import ('./../views/Vehicle/Show.vue'),
  },
  {
    path: '/vehiculos/:vehicle/actualizar',
    name: 'VehicleUpdate',
    component: () => import ('./../views/Vehicle/Update.vue'),
  },
  {
    path: '/vehiculos/:vehicle/documentos',
    name: 'VehicleDocuments',
    component: () => import ('./../views/Vehicle/Document/Index.vue'),
  },
  {
    path: '/vehiculos/:vehicle/agregar-documentos',
    name: 'VehicleUploadDocuments',
    component: () => import ('./../views/Document/Upload.vue'),
  },
  {
    path: '/catalogos/tipos-de-documentos',
    name: 'DocumentTypes',
    component: () => import ('./../views/DocumentType/Index.vue'),
  },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

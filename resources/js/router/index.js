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
    path: '/busqueda',
    name: 'Search',
    component: () => import ('./../views/Search.vue'),
  },
  {
    path: '/vehiculos/:vehicle',
    name: 'VehicleDetail',
    component: () => import ('./../views/Vehicle/Details.vue'),
  },
  {
    path: '/vehiculos/:vehicle/actualizar',
    name: 'VehicleUpdate',
    component: () => import ('./../views/Vehicle/Update.vue'),
  },
  {
    path: '/vehiculos/:vehicle/documentos',
    name: 'VehicleDocuments',
    component: () => import ('./../views/Vehicle/Documents.vue'),
  },
  {
    path: '/vehiculos/:vehicle/agregar-documentos',
    name: 'UploadDocuments',
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

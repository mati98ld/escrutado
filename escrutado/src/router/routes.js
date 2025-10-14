const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'EscrutinioPage', component: () => import('src/pages/EscrutinioPage.vue') },
      { path: 'ResultadosPage', component: () => import('src/pages/ResultadosPage.vue') },
      { path: 'DescargarPage', component: () => import('src/pages/DescargarPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

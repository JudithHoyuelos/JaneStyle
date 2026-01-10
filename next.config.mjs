/** @type {import('next').NextConfig} */
const REPO_NAME = 'janestyle';
const isProd = process.env.NEXT_PUBLIC_ENV === 'prod';

const nextConfig = {
  // 🔹 Necesario para GitHub Pages
  output: 'export',

  // 🔹 Rutas correctas para DEV / PROD
  basePath: isProd ? `/${REPO_NAME}` : `/${REPO_NAME}/dev`,
  assetPrefix: isProd ? `/${REPO_NAME}/` : `/${REPO_NAME}/dev/`,

  // 🔹 Next Images no funciona en export sin esto
  images: {
    unoptimized: true,
  },

  // 🔹 Variables públicas de entorno
  env: {
    NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV,

    DOMAIN_URL: isProd
      ? `https://<TU_USUARIO>.github.io/${REPO_NAME}`
      : `https://<TU_USUARIO>.github.io/${REPO_NAME}/dev`,

    // ⚠️ Solo si sigues usando backend externo
    // WEBSOCKET_URL: isProd
    //   ? 'wss://TU_BACKEND_PROD'
    //   : 'wss://TU_BACKEND_DEV',
  },

  // 🔹 Evita errores de trailing slash en Pages
  trailingSlash: true,
};

export default nextConfig;

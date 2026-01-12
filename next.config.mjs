/** @type {import('next').NextConfig} */
const REPO_NAME = 'JaneStyle';
const env = process.env.NEXT_PUBLIC_ENV;

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,

  basePath:
    env === 'prod'
      ? `/${REPO_NAME}`
      : env === 'dev'
      ? `/${REPO_NAME}/dev`
      : '',

  assetPrefix:
    env === 'prod'
      ? `/${REPO_NAME}/`
      : env === 'dev'
      ? `/${REPO_NAME}/dev/`
      : '',
};

export default nextConfig;

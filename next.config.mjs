/** @type {import('next').NextConfig} */
const REPO_NAME = 'JaneStyle'
const env = process.env.NEXT_PUBLIC_ENV // 'prod' | 'dev' | undefined

const isProd = env === 'prod'
const isDev = env === 'dev'

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,

  basePath: isProd
    ? `/${REPO_NAME}`
    : isDev
    ? `/${REPO_NAME}/dev`
    : '',

  assetPrefix: isProd
    ? `/${REPO_NAME}/`
    : isDev
    ? `/${REPO_NAME}/dev/`
    : '',
}

export default nextConfig

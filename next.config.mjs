/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV == 'production';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: isProd ? '/chanh1964.github.io/donkiennghi' : '',
};

export default nextConfig;
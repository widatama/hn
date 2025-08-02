module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  output: 'export',
};

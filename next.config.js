// const nextConfig = {
//   reactStrictMode: true,
//   compiler: {
//     styledComponents: true,
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  webpack: (config) => {
    // Add rule for SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });
    config.externals.push({ canvas: 'commonjs canvas' });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
    domains: ['https://schesti-dev.s3.eu-north-1.amazonaws.com', '*'],
  },
  experimental: {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
  },
};

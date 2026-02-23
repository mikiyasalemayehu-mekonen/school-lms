

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.t3.storage.dev', // Wildcard for all subdomains
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;

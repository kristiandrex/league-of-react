module.exports = {
  images: {
    domains: ["ddragon.leagueoflegends.com"]
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

// Next.js standalone pour Docker
const nextConfig = {
  output: 'standalone',
  // Si tu veux éviter que le build Docker échoue pour des erreurs ESLint,
  // décommente la ligne suivante (tu as déjà linté en CI de toute façon).
  // eslint: { ignoreDuringBuilds: true },
};
module.exports = nextConfig;
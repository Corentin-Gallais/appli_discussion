/** 
 * Next.js config pour image Docker "standalone".
 * Si tu as déjà un next.config.js, ajoute simplement: output: 'standalone'
 */
const nextConfig = {
  output: 'standalone',
  // active le strict mode si tu veux:
  // reactStrictMode: true,
  // si tu utilises des redirects/rewrites/images, garde-les ici.
};

module.exports = nextConfig;
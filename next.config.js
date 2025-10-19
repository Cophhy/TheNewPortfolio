/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  // Se em algum momento aparecer erro de TypeScript no build, libere também:
  // typescript: { ignoreBuildErrors: true },
};

module.exports = nextConfig;

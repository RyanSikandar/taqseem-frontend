/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Specify the protocol (https in this case)
        hostname: 'ryan-taqseem.s3.us-east-1.amazonaws.com', // The domain of the remote images
        pathname: '/**', // Match all paths under this hostname
      },
    ],
  },
};

export default nextConfig;

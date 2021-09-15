const { withGlobalCss } = require('next-global-css')

const withConfig = withGlobalCss()

module.exports = withConfig({
  // any other next.js settings here
  images: {
    domains: ['res.cloudinary.com'],
  },
  reactStrictMode: true,
  env: {
    MONGO_URI:
      'mongodb+srv://Edwin:JKQqzftx7O3Sf7ia@cluster0.gvgks.mongodb.net/WILL-LMS?retryWrites=true&w=majority',
    BASE_URL: 'http://localhost:3000',
    NEXTAUTH_URL: 'http://localhost:3000',
    CLOUDINARY_KEY: '895998764734147',
    CLOUDINARY_KEY_SECRET: 'vhtj9EqCg4Z-lZbnfidp6pb3kA0',
    CLOUDINARY_URL: 'cloudinary://895998764734147:vhtj9EqCg4Z-lZbnfidp6pb3kA0@edwin-thesis',
  },
}
)
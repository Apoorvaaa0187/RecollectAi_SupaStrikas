// Minimal background service worker stub for extension
// This will be copied to the build output by Vite's public directory.

self.addEventListener('install', (e) => {
  console.log('Memory Lane background installed')
})

self.addEventListener('activate', (e) => {
  console.log('Memory Lane background activated')
})

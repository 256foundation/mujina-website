import { defineConfig } from 'vitepress'

// The deploy workflow sets DOCS_BASE so one config serves both a fork
// preview (served under /<repo-name>/) and production at mujina.org
// (served at /).
const base = process.env.DOCS_BASE || '/'

export default defineConfig({
  title: 'Mujina',
  description: 'Open source Bitcoin mining firmware',

  base,
  cleanUrls: true,
  lastUpdated: true,

  srcExclude: ['README.md', 'AGENTS.md', 'CONTRIBUTING.md', 'node_modules/**'],

  // Dev-server only: Vite blocks requests addressed to hostnames it
  // does not know. To review the dev server from another machine by
  // name, list the names in DEV_ALLOWED_HOSTS, comma separated:
  // DEV_ALLOWED_HOSTS=myhost just dev
  vite: {
    server: {
      allowedHosts: (process.env.DEV_ALLOWED_HOSTS || '')
        .split(',')
        .filter(Boolean)
    }
  },

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: `${base}favicon.png` }]
  ],

  themeConfig: {
    logo: '/mujina-head.png',

    // The docs are organized by Diataxis (https://diataxis.fr):
    // tutorial, how-to guides, reference, explanation. Keep each page
    // in one mode; link across modes instead of mixing them.
    nav: [
      { text: 'Tutorial', link: '/tutorial/first-run' },
      { text: 'How-to', link: '/howto/connect-to-a-pool' },
      { text: 'Reference', link: '/reference/hardware-compatibility' },
      { text: 'Explanation', link: '/explanation/why-mujina' },
      { text: 'Community', link: '/community' }
    ],

    sidebar: [
      {
        text: 'Tutorial',
        items: [
          { text: 'Your First Run', link: '/tutorial/first-run' }
        ]
      },
      {
        text: 'How-to Guides',
        items: [
          { text: 'Set Up a Bitaxe Gamma', link: '/howto/set-up-a-bitaxe-gamma' },
          { text: 'Connect to a Pool', link: '/howto/connect-to-a-pool' },
          { text: 'Run in a Container', link: '/howto/run-in-a-container' }
        ]
      },
      {
        text: 'Reference',
        items: [
          {
            text: 'Hardware Compatibility',
            link: '/reference/hardware-compatibility'
          },
          {
            text: 'Environment Variables',
            link: '/reference/environment-variables'
          }
        ]
      },
      {
        text: 'Explanation',
        items: [
          { text: 'Why Mujina', link: '/explanation/why-mujina' },
          { text: 'Where Mujina Is Today', link: '/explanation/status' }
        ]
      },
      {
        text: 'Project',
        items: [
          { text: 'Community and Contributing', link: '/community' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/256foundation/mujina' }
    ],

    footer: {
      message:
        'A 256 Foundation project. Licensed GPL-3.0-or-later. ' +
        'This site is <a href="https://github.com/256foundation/mujina-website">open to contributions on GitHub</a>.',
      copyright:
        'Copyright Mujina contributors' +
        `<a class="foundation-mark" href="https://256foundation.org" aria-label="256 Foundation">` +
        `<img class="light-logo" src="${base}256-foundation-light.png" alt="">` +
        `<img class="dark-logo" src="${base}256-foundation-dark.png" alt=""></a>`
    },

    search: {
      provider: 'local'
    },

    outline: { level: [2, 3] },

    editLink: {
      pattern:
        'https://github.com/256foundation/mujina-website/edit/main/:path',
      text: 'Edit this page on GitHub'
    }
  }
})

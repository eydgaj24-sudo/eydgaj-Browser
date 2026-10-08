import type { Session } from 'electron'
import { renderBookmarksPage } from './khram-pages/bookmarks.js'
import { renderDownloadsPage } from './khram-pages/downloads.js'
import { renderHistoryPage } from './khram-pages/history.js'
import { renderNewTabPage } from './khram-pages/newtab.js'
import { renderNotFoundPage } from './khram-pages/not-found.js'
import { khramRouteKey } from './khram-pages/route-key.js'
import { renderSettingsPage } from './khram-pages/settings.js'
import { readKhramLogoPng } from './khram-pages/static-assets.js'
import { readBrowserBackgroundFile } from './khram-pages/browser-backgrounds.js'
import { renderWelcomePage } from './khram-pages/welcome.js'
import { renderAboutPage } from './khram-pages/about.js'


export function registerKhramProtocol(contentSession: Session): void {
  contentSession.protocol.handle('khram', async (request) => {
    try {
      new URL(request.url)
    } catch {
      return new Response('Bad URL', { status: 400 })
    }

    const route = khramRouteKey(request.url)
    const htmlHeaders = { 'content-type': 'text/html; charset=utf-8' }

    if (route === '/khram.png') {
      const png = readKhramLogoPng()
      if (!png) {
        return new Response('Not found', { status: 404 })
      }
      return new Response(png, {
        headers: {
          'content-type': 'image/png',
          'cache-control': 'public, max-age=86400'
        }
      })
    }

    if (route.startsWith('/browser-backgrounds/')) {
      const leaf = route.slice('/browser-backgrounds/'.length)
      if (!leaf || leaf.includes('/') || leaf.includes('..')) {
        return new Response('Not found', { status: 404 })
      }
      try {
        const decoded = decodeURIComponent(leaf)
        const file = readBrowserBackgroundFile(decoded)
        if (!file) {
          return new Response('Not found', { status: 404 })
        }
        return new Response(file.buf, {
          headers: {
            'content-type': file.mime,
            'cache-control': 'public, max-age=86400'
          }
        })
      } catch {
        return new Response('Not found', { status: 404 })
      }
    }

    if (route === '/newtab') {
      return new Response(renderNewTabPage(), { headers: htmlHeaders })
    }

    
    if (route === '/history' || route === '/settings/history') {
      return new Response(renderHistoryPage(), { headers: htmlHeaders })
    }
    if (route === '/bookmarks' || route === '/settings/bookmarks') {
      return new Response(renderBookmarksPage(), { headers: htmlHeaders })
    }
    if (route === '/downloads' || route === '/settings/downloads') {
      return new Response(renderDownloadsPage(), { headers: htmlHeaders })
    }
    if (route === '/welcome') {
      let firstLaunch = false
      try {
        const u = new URL(request.url)
        firstLaunch = u.searchParams.get('intro') === '1' || u.searchParams.get('first') === '1'
      } catch {}
      return new Response(renderWelcomePage({ firstLaunch }), { headers: htmlHeaders })
    }

    if (route === '/about') {
      return new Response(renderAboutPage(), { headers: htmlHeaders })
    }

    if (route.startsWith('/settings')) {
      const settingsHtml = renderSettingsPage(route)
      if (settingsHtml != null) {
        return new Response(settingsHtml, { headers: htmlHeaders })
      }
    }

    return new Response(renderNotFoundPage(route), {
      status: 404,
      headers: htmlHeaders
    })
  })
}

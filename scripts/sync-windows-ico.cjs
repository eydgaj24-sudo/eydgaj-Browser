'use strict'

const fs = require('fs')
const path = require('path')
const toIco = require('to-ico')

const pngPath = path.join(__dirname, '..', 'public', 'Khram.png')
const icoPath = path.join(__dirname, '..', 'public', 'Khram.ico')

toIco(fs.readFileSync(pngPath), { resize: true })
  .then((buf) => {
    fs.writeFileSync(icoPath, buf)
    console.log('[khram] wrote', icoPath, '(' + buf.length + ' bytes)')
  })
  .catch((err) => {
    console.error('[khram] sync-windows-ico failed', err)
    process.exit(1)
  })

import type { Options } from 'tsup'

export const tsup: Options = {
  dts: false,
  outDir: 'dist',
  splitting: false,
  clean: true,
  format: ['iife'],
  ignoreWatch: ['dist'],
  platform: 'browser',
  entryPoints: ['src/core/renderer/ClientSideApp.tsx']
}

import { z } from 'zod'

export const IPC = {
  tabsCreate: 'khram:tabs-create',
  tabsClose: 'khram:tabs-close',
  tabsPin: 'khram:tabs-pin',
  tabsUnpin: 'khram:tabs-unpin',
  tabsSetMuted: 'khram:tabs-set-muted',
  tabsSetActive: 'khram:tabs-set-active',
  tabsGetState: 'khram:tabs-get-state',
  tabsSplitCreate: 'khram:tabs-split-create',
  tabsSplitExit: 'khram:tabs-split-exit',
  tabsSplitSetRatio: 'khram:tabs-split-set-ratio',
  tabsSplitSetFocus: 'khram:tabs-split-set-focus',
  tabsSplitSwap: 'khram:tabs-split-swap',
  splitDividerDragStart: 'khram:split-divider-drag-start',
  splitDividerDragMove: 'khram:split-divider-drag-move',
  splitDividerDragEnd: 'khram:split-divider-drag-end',
  workspacesList: 'khram:workspaces-list',
  workspacesCreate: 'khram:workspaces-create',
  workspacesRename: 'khram:workspaces-rename',
  workspacesDelete: 'khram:workspaces-delete',
  workspacesReorder: 'khram:workspaces-reorder',
  workspacesSwitch: 'khram:workspaces-switch',
  navSubmit: 'khram:nav-submit',
  navBack: 'khram:nav-back',
  navForward: 'khram:nav-forward',
  navReload: 'khram:nav-reload',
  navStop: 'khram:nav-stop',
  bookmarksList: 'khram:bookmarks-list',
  bookmarksAdd: 'khram:bookmarks-add',
  bookmarksFoldersList: 'khram:bookmarks-folders-list',
  bookmarksFolderAdd: 'khram:bookmarks-folder-add',
  bookmarksFolderRemove: 'khram:bookmarks-folder-remove',
  bookmarksRemove: 'khram:bookmarks-remove',
  historyList: 'khram:history-list',
  historyClear: 'khram:history-clear',
  historyRemove: 'khram:history-remove',
  settingsGet: 'khram:settings-get',
  settingsSet: 'khram:settings-set',
  downloadsList: 'khram:downloads-list',
  downloadsRemove: 'khram:downloads-remove',
  downloadsApplyAction: 'khram:downloads-apply-action',
  downloadsOpenFile: 'khram:downloads-open-file',
  devtoolsOpenPage: 'khram:devtools-open-page',
  devtoolsOpenShell: 'khram:devtools-open-shell',
  windowMinimize: 'khram:window-minimize',
  windowMaximizeToggle: 'khram:window-maximize-toggle',
  windowClose: 'khram:window-close',
  shellOpenNewTabShortcutModal: 'khram:shell-open-new-tab-shortcut-modal',
  shellOverflowMenuSetReserve: 'khram:shell-overflow-menu-set-reserve',
  shellDownloadsPopoverSetReserve: 'khram:shell-downloads-popover-set-reserve',
  shellSiteInfoPopoverSetReserve: 'khram:shell-site-info-popover-set-reserve',
  shellBookmarkModalSetReserve: 'khram:shell-bookmark-modal-set-reserve',
  shellEnsureChromeOnTop: 'khram:shell-ensure-chrome-on-top',
  shellOmnibarSuggestSetReserve: 'khram:shell-omnibar-suggest-set-reserve',
  shellPasswordBarSetReserve: 'khram:shell-password-bar-set-reserve',
  shellDefaultBrowserPromptSetReserve: 'khram:shell-default-browser-prompt-set-reserve',
  omnibarFetchSuggestions: 'khram:omnibar-fetch-suggestions',
  passwordTabBridge: 'khram:password-tab-bridge',
  passwordBarSave: 'khram:password-bar-save',
  passwordBarNever: 'khram:password-bar-never',
  passwordBarDismiss: 'khram:password-bar-dismiss',
  internalSettingsGet: 'khram:internal-settings-get',
  internalSettingsSet: 'khram:internal-settings-set',
  internalPickDownloadFolder: 'khram:internal-pick-download-folder',
  internalRelaunchApp: 'khram:internal-relaunch-app',
  internalWelcomeComplete: 'khram:internal-welcome-complete',
  internalDefaultBrowserGet: 'khram:internal-default-browser-get',
  internalDefaultBrowserRegister: 'khram:internal-default-browser-register',
  internalDefaultBrowserOpenSettings: 'khram:internal-default-browser-open-settings',
  internalDefaultBrowserRegisterAndOpenSettings: 'khram:internal-default-browser-register-and-open-settings',
  internalAutoUpdateGetStatus: 'khram:internal-auto-update-get-status',
  internalAutoUpdateCheck: 'khram:internal-auto-update-check',
  internalAutoUpdateQuitAndInstall: 'khram:internal-auto-update-quit-and-install',
  autoUpdateStatus: 'khram:auto-update-status',
  internalHistoryList: 'khram:internal-history-list',
  internalHistoryRemove: 'khram:internal-history-remove',
  internalBookmarksList: 'khram:internal-bookmarks-list',
  internalBookmarksLibrary: 'khram:internal-bookmarks-library',
  internalBookmarksRemove: 'khram:internal-bookmarks-remove',
  internalBookmarkFolderAdd: 'khram:internal-bookmark-folder-add',
  internalBookmarkFolderRemove: 'khram:internal-bookmark-folder-remove',
  internalDownloadsList: 'khram:internal-downloads-list',
  internalDownloadsReveal: 'khram:internal-downloads-reveal',
  internalDownloadsOpen: 'khram:internal-downloads-open',
  internalNewTabShortcutsList: 'khram:internal-new-tab-shortcuts-list',
  internalNewTabShortcutAdd: 'khram:internal-new-tab-shortcut-add',
  internalNewTabShortcutUpdate: 'khram:internal-new-tab-shortcut-update',
  internalNewTabShortcutRemove: 'khram:internal-new-tab-shortcut-remove',
  internalNewTabShortcutsReorder: 'khram:internal-new-tab-shortcuts-reorder',
  internalBrowserDataDetectSources: 'khram:internal-browser-data-detect-sources',
  internalBrowserDataImportChromium: 'khram:internal-browser-data-import-chromium',
  internalNavigateSearch: 'khram:internal-navigate-search',
  internalNavigateUrl: 'khram:internal-navigate-url',
  tabRetryNavigation: 'khram:tab-retry-navigation',
  internalPasswordVaultExists: 'khram:internal-password-vault-exists',
  internalPasswordVaultNeedsMigration: 'khram:internal-password-vault-needs-migration',
  internalPasswordVaultMigrate: 'khram:internal-password-vault-migrate',
  internalPasswordVaultOsKeyAvailable: 'khram:internal-password-vault-os-key-available',
  internalPasswordVaultUnlocked: 'khram:internal-password-vault-unlocked',
  internalPasswordVaultList: 'khram:internal-password-vault-list',
  internalPasswordVaultDelete: 'khram:internal-password-vault-delete',
  internalPasswordVaultImport: 'khram:internal-password-vault-import',
  internalPasswordVaultExport: 'khram:internal-password-vault-export',
  internalClearBrowsingData: 'khram:internal-clear-browsing-data'
} as const

export const NEW_TAB_BACKGROUND_PRESETS = ['default', 'light', 'dark', 'sunset', 'forest', 'ocean'] as const
export type NewTabBackgroundPreset = (typeof NEW_TAB_BACKGROUND_PRESETS)[number]

export const BROWSER_DATA_CHROMIUM_IDS = ['chrome', 'edge', 'brave', 'vivaldi', 'opera'] as const

export interface HistoryEntry {
  id: string
  url: string
  title: string
  visited: number
}

export interface BookmarkEntry {
  id: string
  url: string
  title: string
  favicon?: string
  folderId?: string
}

export interface BookmarkFolder {
  id: string
  name: string
}

export interface BookmarksLibraryPayload {
  bookmarks: BookmarkEntry[]
  folders: BookmarkFolder[]
}

export interface DownloadEntry {
  id: string
  filename: string
  url: string
  startTime: number
  totalBytes: number
  receivedBytes: number
  state: 'in-progress' | 'completed' | 'cancelled' | 'interrupted'
  isPaused: boolean
  canResume: boolean
  savePath: string
}

export interface NewTabShortcut {
  id: string
  label: string
  url: string
  order: number
}

export type KhramTheme = 'default' | 'white' | 'black' | 'grey'
export type SearchEngine = 'google' | 'bing' | 'duckduckgo' | 'brave' | 'ecosia'
export type StartupBehavior = 'new-tab' | 'restore-tabs'

export interface KhramSettings {
  searchEngine: SearchEngine
  browserChromeTheme: KhramTheme
  startupBehavior: StartupBehavior
  newTabShortcutsEnabled: boolean
  newTabBackground: NewTabBackgroundConfig
  adBlockLevel: 'off' | 'low' | 'medium' | 'high'
  adBlockAllowlistHostnames: string[]
  downloadDirectory: string
  passwordOfferToSave: boolean
  passwordAutofillEnabled: boolean
  passwordAutofillOnFocus: boolean
  passwordAutofillHotkey: boolean
  passwordsNeverSaveDomains: string[]
  passwordVaultRememberDevice: boolean
  prefetchNetworkConnections: boolean
  notifyOnTabFreeze: boolean
  dimRestingTabs: boolean
  alwaysActiveHostnames: string[]
  lowPowerBackgroundMode: boolean
  backgroundTabRestMinutes: 5 | 15 | 30 | 60
  autoThrottleBackgroundTabs: boolean
  gameQuietBackground: boolean
  useHardwareAcceleration: boolean
}

export type VeloSettings = KhramSettings

export interface NewTabBackgroundConfig {
  kind: 'preset' | 'image'
  preset?: NewTabBackgroundPreset
  filename?: string
}

export interface PasswordVaultEntryDto {
  id: string
  domain: string
  username: string
  password?: string
}

export interface DefaultBrowserStatusPayload {
  isPackaged: boolean
  isDefault: boolean
  http: boolean
  https: boolean
}

export type DefaultBrowserRegisterResult = { ok: true } | { ok: false; message: string }

export type DefaultBrowserOpenSettingsPage = 'default-apps' | 'installed-apps'

export interface AutoUpdateStatusPayload {
  phase: 'idle' | 'dev' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'error'
  version?: string
  percent?: number
  transferred?: number
  total?: number
  message?: string
}

export interface BrowserDataDetectSourcesPayload {
  [browserId: string]: Array<{
    id: string
    name: string
  }>
}

export interface BrowserDataImportChromiumPayload {
  browserId: string
  profileId: string
  history: boolean
  bookmarks: boolean
  downloads: boolean
}

export interface BrowserDataImportChromiumResult {
  imported: {
    history: number
    bookmarks: number
    downloads: number
  }
}

export interface ClearBrowsingDataPayload {
  history: boolean
  cookies: boolean
  cache: boolean
  passwords: boolean
  downloads: boolean
  timeRange: 'hour' | 'day' | 'week' | 'month' | 'all'
}

export interface ClearBrowsingDataResult {
  ok: boolean
  message?: string
}

export interface PasswordBarState {
  open: boolean
  tabId: number
  domain: string
  username: string
  password: string
}

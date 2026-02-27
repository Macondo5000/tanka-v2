import { motion, AnimatePresence } from 'motion/react';
import { PanelLeftOpen, Link2, Unlink } from 'lucide-react';
import { LinkSidebar } from './components/link-sidebar';
import { LinkDetail } from './components/link-detail';
import { AppCard } from './components/app-card';
import { useLinkStore } from '@/store/link-store';
import { useUIStore } from '@/store/ui-store';
import { APP_CATEGORIES } from '@/mock/apps';
import { SIDEBAR_WIDTH, SPRING } from '@/lib/constants';

export function LinkPage() {
  const { apps, linkFilter, selectedCategory, selectedAppId, setSelectedCategory, setSelectedApp, toggleConnection } = useLinkStore();
  const { sidebarCollapsed, toggleSidebar } = useUIStore();

  const baseFilteredApps = linkFilter === 'linked'
    ? apps.filter((a) => a.isConnected)
    : apps.filter((a) => !a.isConnected);

  const filteredApps = selectedCategory
    ? baseFilteredApps.filter((a) => a.category === selectedCategory)
    : baseFilteredApps;

  // Categories that have apps in current linked/unlinked view
  const availableCategories = APP_CATEGORIES.filter((cat) =>
    baseFilteredApps.some((a) => a.category === cat)
  );

  const selectedApp = apps.find((a) => a.id === selectedAppId) ?? null;

  return (
    <div className="h-full flex gap-3">
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: SIDEBAR_WIDTH, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={SPRING}
            className="h-full shrink-0 overflow-hidden rounded-[10px]"
          >
            <LinkSidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {sidebarCollapsed && (
        <div className="h-full shrink-0 flex flex-col items-center pt-3 px-1.5 gap-2 bg-white rounded-[10px] overflow-hidden">
          <button onClick={toggleSidebar} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors text-black shrink-0">
            <PanelLeftOpen className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-center gap-1.5 py-1">
            <button
              onClick={() => useLinkStore.getState().setLinkFilter('linked')}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                linkFilter === 'linked' ? 'bg-[#ebebeb]' : 'bg-[#e4e4e4] hover:bg-[#d5d5d5]'
              }`}
              title="Linked"
            >
              <Link2 className="w-3.5 h-3.5 text-gray-500" />
            </button>
            <button
              onClick={() => useLinkStore.getState().setLinkFilter('unlinked')}
              className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                linkFilter === 'unlinked' ? 'bg-[#ebebeb]' : 'bg-[#e4e4e4] hover:bg-[#d5d5d5]'
              }`}
              title="Unlinked"
            >
              <Unlink className="w-3.5 h-3.5 text-gray-500" />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 rounded-[10px] overflow-hidden bg-white">
        {selectedApp ? (
          <LinkDetail
            app={selectedApp}
            onBack={() => setSelectedApp(null)}
            onToggleConnection={toggleConnection}
          />
        ) : (
          <div className="h-full overflow-y-auto no-scrollbar">
            <div className="max-w-[800px] mx-auto px-8 py-8">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-[18px] font-bold tracking-tight text-black">
                  {linkFilter === 'linked' ? 'Linked Apps' : 'Unlinked Apps'}
                </h2>
                <p className="text-[13px] text-gray-400 font-medium mt-0.5">
                  {filteredApps.length} {linkFilter === 'linked' ? 'connected' : 'available'}
                </p>
              </div>

              {/* Category tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                    selectedCategory === null
                      ? 'bg-black text-white'
                      : 'bg-[#f0f0f0] text-gray-500 hover:bg-[#e4e4e4]'
                  }`}
                >
                  All
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-colors ${
                      selectedCategory === cat
                        ? 'bg-black text-white'
                        : 'bg-[#f0f0f0] text-gray-500 hover:bg-[#e4e4e4]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* App grid by category */}
              <div className="space-y-8">
                {APP_CATEGORIES
                  .filter((cat) => filteredApps.some((a) => a.category === cat))
                  .map((cat) => {
                    const catApps = filteredApps.filter((a) => a.category === cat);
                    return (
                      <div key={cat}>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">
                          {cat}
                        </span>
                        <div className="grid grid-cols-2 gap-3">
                          {catApps.map((app, index) => (
                            <AppCard
                              key={app.id}
                              app={app}
                              index={index}
                              onClick={() => setSelectedApp(app.id)}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

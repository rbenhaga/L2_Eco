const preloadedKeys = new Set<string>();

function preloadOnce(key: string, loader: () => Promise<unknown>) {
  if (preloadedKeys.has(key)) return;
  preloadedKeys.add(key);
  void loader().catch(() => {
    preloadedKeys.delete(key);
  });
}

function schedulePreload(loader: () => Promise<unknown>, key: string) {
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => preloadOnce(key, loader));
    return;
  }
  preloadOnce(key, loader);
}

export function preloadRouteForPath(rawPath: string) {
  if (!rawPath) return;
  const path = rawPath.toLowerCase();

  if (path.startsWith("/s4/macro")) {
    schedulePreload(() => import("../modules/s4/macro/routes"), "routes-s4-macro");
    return;
  }
  if (path.startsWith("/s4/micro")) {
    schedulePreload(() => import("../modules/s4/micro/routes"), "routes-s4-micro");
    return;
  }
  if (path.startsWith("/s4/stats")) {
    schedulePreload(() => import("../modules/s4/stats/routes"), "routes-s4-stats");
    return;
  }
  if (path.startsWith("/s4/management")) {
    schedulePreload(() => import("../modules/s4/management/routes"), "routes-s4-management");
  }
}
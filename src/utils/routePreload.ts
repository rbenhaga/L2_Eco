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

  if (path.startsWith("/s3/macro") || path.startsWith("/macro")) {
    schedulePreload(() => import("../modules/s3/macro/routes"), "routes-s3-macro");
    return;
  }
  if (path.startsWith("/s3/micro") || path.startsWith("/micro")) {
    schedulePreload(() => import("../modules/s3/micro/routes"), "routes-s3-micro");
    return;
  }
  if (path.startsWith("/s3/stats") || path.startsWith("/stats")) {
    schedulePreload(() => import("../modules/s3/stats/routes"), "routes-s3-stats");
    return;
  }
  if (path.startsWith("/s3/socio") || path.startsWith("/socio")) {
    schedulePreload(() => import("../modules/s3/socio/routes"), "routes-s3-socio");
    return;
  }
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

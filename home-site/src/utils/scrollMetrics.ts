const APP_LAYOUT_FOOTER_SELECTOR = '[data-app-layout-footer]';

export function getScrollableProgressMetrics(container: HTMLElement) {
    const footer = container.querySelector<HTMLElement>(APP_LAYOUT_FOOTER_SELECTOR);
    const footerHeight = footer?.offsetHeight ?? 0;
    const scrollableHeight = Math.max(0, container.scrollHeight - footerHeight - container.clientHeight);
    const scrollTop = Math.max(0, Math.min(container.scrollTop, scrollableHeight));

    return {
        scrollTop,
        scrollableHeight,
    };
}

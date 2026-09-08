"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/**
 * Cross-document-feeling view transitions, hand-rolled.
 *
 * Next 14.2 + React 18 cannot use React's built-in <ViewTransition> (that needs
 * Next 15 / React 19), and next-view-transitions has had no release in months,
 * so this repo's no-new-packages rule applies: ~60 lines beats a dependency.
 *
 * The whole trick is that router.push() is async — startViewTransition's
 * callback has to stay open until the new route has actually committed, or the
 * browser snapshots the old DOM twice and nothing morphs. So the callback
 * returns a promise that ViewTransitionListener resolves on the next pathname
 * change. The listener lives in the root layout because the link that started
 * the navigation is unmounted by the time it lands.
 */

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
};

let pendingNavigation: (() => void) | null = null;

/** Mounted once in app/layout.tsx. Renders nothing. */
export function ViewTransitionListener() {
  const pathname = usePathname();

  useEffect(() => {
    pendingNavigation?.();
    pendingNavigation = null;
  }, [pathname]);

  return null;
}

function canTransition(): boolean {
  return (
    typeof document !== "undefined" &&
    typeof (document as ViewTransitionDocument).startViewTransition ===
      "function" &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * A Link that morphs its `[data-vt]` descendant into the matching element on
 * the destination page. Falls back to an ordinary client-side navigation
 * wherever view transitions are unsupported or motion is reduced — Firefox
 * stable included.
 */
export function TransitionLink({
  href,
  name,
  className,
  children,
}: {
  href: string;
  /**
   * The view-transition-name to pair with. Applied to this link's [data-vt]
   * element only on click: the property must be unique among rendered
   * elements, so naming every card up front would silently kill the morph.
   */
  name: string;
  className?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeout.current), []);

  function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
    // Let the browser handle new-tab/new-window clicks itself.
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    ) {
      return;
    }

    if (!canTransition()) return; // <Link> does its normal thing.

    event.preventDefault();

    const target = event.currentTarget.querySelector<HTMLElement>("[data-vt]");
    if (target) target.style.viewTransitionName = name;

    const transition = (document as ViewTransitionDocument).startViewTransition!(
      () =>
        new Promise<void>((resolve) => {
          pendingNavigation = resolve;
          // Safety valve: a navigation that never commits would otherwise leave
          // the page frozen under the transition snapshot.
          timeout.current = setTimeout(() => {
            pendingNavigation = null;
            resolve();
          }, 1200);
          router.push(href);
        })
    );

    transition.finished.finally(() => {
      clearTimeout(timeout.current);
      if (target) target.style.viewTransitionName = "";
    });
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

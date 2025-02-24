"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEvent, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animationTransitionIn } from "@/lib/animations";

type Props = {
  children: ReactNode;
  href: string;
  scroll?: boolean;
  replace?: boolean;
  prefetch?: boolean | null;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
} & Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "href" | "onClick" | "scroll" | "replace" | "prefetch"
>;

export default function TransitionLink({
  children,
  href,
  scroll,
  replace,
  prefetch,
  onClick,
  ...restProps
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  function linkClicked(e: MouseEvent<HTMLAnchorElement>) {
    if (onClick) {
      onClick(e);
    }
    if (e.defaultPrevented) return;
    e.preventDefault();

    if (pathname === href) return;

    animationTransitionIn(() => {
      router.prefetch(href);
    }).then(() => {
      if (replace) {
        router.replace(href, { scroll });
      } else {
        router.push(href, { scroll });
      }
    });
  }

  return (
    <Link
      href={href}
      onClick={linkClicked}
      scroll={scroll}
      replace={replace}
      prefetch={prefetch}
      {...restProps}
    >
      {children}
    </Link>
  );
}

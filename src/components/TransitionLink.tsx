"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { animationTransitionIn } from "@/lib/animations";

type Props = {
  href: string;
  scroll?: boolean;
  children: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

export default function TransitionLink({
  children,
  href,
  scroll,
  ...rest
}: Props) {
  const router = useRouter();
  const path = usePathname();

  function linkClicked(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();

    if (href === path) return;

    animationTransitionIn().then(() => {
      router.push(href, { scroll });
    });
  }

  return (
    <Link href={href} onClick={linkClicked} scroll={scroll} {...rest}>
      {children}
    </Link>
  );
}

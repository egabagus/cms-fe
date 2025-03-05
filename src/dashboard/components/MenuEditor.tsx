import React, { ReactNode, Ref, PropsWithChildren } from "react";
import { cx, css } from "@emotion/css";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

type OrNull<T> = T | null;

export const MenuEditor = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <div
      {...props}
      data-test-id="menu"
      ref={ref}
      className={cx(
        className,
        css`
          & > * {
            display: inline-block;
          }

          & > * + * {
            margin-left: 15px;
          }
        `
      )}
    />
  )
);

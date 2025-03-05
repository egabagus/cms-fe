import React, { ReactNode, Ref, PropsWithChildren } from "react";
import { cx, css } from "@emotion/css";
import { MenuEditor } from "./MenuEditor";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

type OrNull<T> = T | null;

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <MenuEditor
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  )
);

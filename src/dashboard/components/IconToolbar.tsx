import React, { ReactNode, Ref, PropsWithChildren } from "react";
import { cx, css } from "@emotion/css";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

type OrNull<T> = T | null;

export const IconToolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <span
      {...props}
      ref={ref}
      className={cx(
        "material-icons",
        className,
        css`
          font-size: 18px;
          vertical-align: text-bottom;
        `
      )}
    />
  )
);

import React, { ReactNode, Ref, PropsWithChildren } from "react";
import { cx, css } from "@emotion/css";
import { Button } from "@mui/material";

interface BaseProps {
  className?: string;
  [key: string]: unknown;
}

type OrNull<T> = T | null;

export const ButtonToolbar = React.forwardRef(
  (
    {
      className,
      active = false,
      reversed = false,
      ...props
    }: PropsWithChildren<
      {
        active?: boolean;
        reversed?: boolean;
      } & BaseProps
    >,
    ref: Ref<OrNull<HTMLSpanElement>>
  ) => (
    <Button>
      <span
        {...props}
        ref={ref}
        className={cx(
          className,
          css`
            cursor: pointer;
            color: ${reversed
              ? active
                ? "white"
                : "#aaa"
              : active
              ? "black"
              : "#ccc"};
          `
        )}
      />
    </Button>
  )
);

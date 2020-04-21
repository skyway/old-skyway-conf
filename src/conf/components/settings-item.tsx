import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { css } from "@emotion/core";

interface Props {
  label: string;
  children: ReactNode;
}
export const SettingsItemDevice: FunctionComponent<Props> = ({
  label,
  children,
}: Props) => (
  <div css={[wrapperStyle, deviceStyle]}>
    <div css={labelStyle}>{label}</div>
    {children}
  </div>
);

export const SettingsItemName: FunctionComponent<Props> = ({
  label,
  children,
}: Props) => (
  <div css={[wrapperStyle, nameStyle]}>
    <div css={labelStyle}>{label}</div>
    <div>{children}</div>
  </div>
);

const wrapperStyle = css({
  margin: "8px auto",
});

const deviceStyle = css({
  display: "grid",
  gridTemplateColumns: "80px 72px 1fr",
  gridGap: 8,
  alignItems: "center",
});

const nameStyle = css({
  display: "grid",
  gridTemplateColumns: "80px 1fr",
  gridGap: 8,
  alignItems: "center",
});

const labelStyle = css({
  textAlign: "center",
});

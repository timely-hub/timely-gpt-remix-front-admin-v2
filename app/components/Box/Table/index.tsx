import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import {
  Sprinkles,
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import { Flex } from "..";
import { spanStyles } from "../Buttons/styles.css";
import { tableStyles } from "./styles.css";

export const Table = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <table className={clsx(tableStyles.table, className)} {...props}>
    {children}
  </table>
);

interface THProps
  extends SprinklesOmit<
    Omit<
      DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >,
      "onClick"
    >
  > {
  children?: React.ReactNode;
  className?: string;
  wrapSprinkles?: Sprinkles;
  theme?: "flex";
}

export const TH = ({ children, className, theme, wrapSprinkles }: THProps) => {
  const { style: wrapStyle } = rainbowSprinkles({
    ...wrapSprinkles,
  });
  return (
    <th style={wrapStyle} className={clsx(className, tableStyles.th)}>
      {theme === "flex" ? (
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          {children}
        </Flex>
      ) : (
        <div>{children}</div>
      )}
    </th>
  );
};

interface TDProps
  extends SprinklesOmit<
    Omit<
      DetailedHTMLProps<
        HTMLAttributes<HTMLTableCellElement>,
        HTMLTableCellElement
      >,
      "onClick"
    >
  > {
  children?: React.ReactNode;
  className?: string;
  wrapSprinkles?: Sprinkles;
  theme?: keyof typeof spanStyles;
}

export const TD = ({
  children,
  className,
  theme = "default",
  wrapSprinkles,
}: TDProps) => {
  const themeClass = theme
    ? spanStyles[theme as keyof typeof spanStyles] ?? ""
    : "";
  const { style: wrapStyle } = rainbowSprinkles({
    ...wrapSprinkles,
  });
  return (
    <td className={clsx(tableStyles.td, className)}>
      <div style={wrapStyle}>
        <span className={themeClass}>{children}</span>
      </div>
    </td>
  );
};

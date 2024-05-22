import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { SprinklesOmit } from "~/styles/rainbow-sprinkles.css";
import { tableStyles } from "./styles.css";

export const TH = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <th className={clsx(className, tableStyles.th)} {...props}>
    <div>{children}</div>
  </th>
);

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
}

export const TD = ({ children, className, ...props }: TDProps) => (
  <td className={clsx(tableStyles.td, className)}>
    <div>{children}</div>
  </td>
);

import clsx from "clsx";
import Box, { BoxProps } from "../Box";
import { svgButtonStyle } from "./styles.css";

interface SvgButtonProps extends BoxProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  svgProps?: React.SVGProps<SVGSVGElement>;
}
export default function SvgButton({
  icon,
  className,
  svgProps,
  ...props
}: SvgButtonProps) {
  const Icon = icon;
  return (
    <Box className={clsx(svgButtonStyle.wrap, className)} {...props}>
      <Icon {...svgProps} />
    </Box>
  );
}

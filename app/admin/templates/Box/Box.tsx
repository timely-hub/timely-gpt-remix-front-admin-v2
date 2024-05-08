import clsx from "clsx";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TypoProps, typoStyles } from "~/admin/styles/global.css";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/admin/styles/rainbow-sprinkles.css";

export type BoxProps = TypoProps &
  SprinklesOmit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
  >;
const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { className, typo, ...props },
  ref
) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <div
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  );
});

export const Flex = forwardRef<
  HTMLDivElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Flex({ display = "flex", ...props }, ref) {
  return <Box display={display} {...props} ref={ref} />;
});

export const Form = forwardRef<
  HTMLFormElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <form
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </form>
  );
});

export const Button = forwardRef<
  HTMLButtonElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      >
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <button
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </button>
  );
});

export const Input = forwardRef<
  HTMLInputElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  return (
    <input
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    />
  );
});
export const VariableInput = forwardRef<
  HTMLInputElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const localRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = useState(50);
  useImperativeHandle(ref, () => localRef.current as HTMLInputElement, []);
  useEffect(() => {
    let offsetWidth = measureRef.current?.offsetWidth ?? 0;
    offsetWidth += 16;
    setInputWidth(offsetWidth ?? 0 + 2); // +2는 약간의 여유 공간
  }, [props.value]);
  return (
    <>
      <input
        ref={localRef}
        className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
        style={{ ...style, width: `${inputWidth}px` }}
        onInput={(e) => {
          const currentTarget = e.currentTarget as HTMLInputElement;
          currentTarget.size = currentTarget.value.length || 1;
        }}
        {...otherProps}
      />
      <span
        ref={measureRef}
        className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "pre",
          minWidth: "50px",
        }}
      >
        {props.value || " "}
      </span>
    </>
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  { limit?: number } & TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
      >
    >
>(function Box({ typo, limit, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const localRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => localRef.current as HTMLTextAreaElement, []);
  useEffect(() => {
    if (localRef.current) {
      localRef.current.style.height = localRef.current.scrollHeight + 2 + "px";
    }
  }, []);
  return (
    <textarea
      ref={localRef}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={{ ...style, overflowY: "hidden" }}
      rows={1}
      onInput={(e) => {
        const currentTarget = e.currentTarget;
        currentTarget.style.height = "";
        currentTarget.offsetHeight;
        currentTarget.style.height = currentTarget.scrollHeight + 2 + "px";
        if (limit) {
          if (currentTarget.scrollHeight > limit) {
            currentTarget.style.overflowY = "";
          } else {
            currentTarget.style.overflowY = "hidden";
          }
          currentTarget.style.maxHeight = 200 + "px";
        } else {
          currentTarget.style.overflowY = "hidden";
        }
        currentTarget.offsetHeight;
        if (currentTarget.value === "") {
          currentTarget.style.height = "";
        }
      }}
      {...otherProps}
    />
  );
});

export const Label = forwardRef<
  HTMLLabelElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <label
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </label>
  );
});
export const Span = forwardRef<
  HTMLSpanElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <span
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </span>
  );
});
export const P = forwardRef<
  HTMLParagraphElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<
        HTMLAttributes<HTMLParagraphElement>,
        HTMLParagraphElement
      >
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <p
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </p>
  );
});

export const Div = forwardRef<
  HTMLDivElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <div
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </div>
  );
});

export const Section = forwardRef<
  HTMLElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <section
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </section>
  );
});

export const Article = forwardRef<
  HTMLElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <article
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </article>
  );
});

export const Header = forwardRef<
  HTMLElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <header
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </header>
  );
});

export const Footer = forwardRef<
  HTMLElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <footer
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </footer>
  );
});

export const Main = forwardRef<
  HTMLElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <main
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </main>
  );
});

export const Nav = forwardRef<
  HTMLElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <nav
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </nav>
  );
});

export const Aside = forwardRef<
  HTMLElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <aside
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </aside>
  );
});
export const H1 = forwardRef<
  HTMLHeadingElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <h1
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </h1>
  );
});
export const H2 = forwardRef<
  HTMLHeadingElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <h2
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </h2>
  );
});
export const H3 = forwardRef<
  HTMLHeadingElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <h3
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </h3>
  );
});
export const H4 = forwardRef<
  HTMLHeadingElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <h4
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </h4>
  );
});

export const H5 = forwardRef<
  HTMLHeadingElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <h5
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </h5>
  );
});
export const H6 = forwardRef<
  HTMLHeadingElement,
  TypoProps &
    SprinklesOmit<
      DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>
    >
>(function Box({ typo, className, ...props }, ref) {
  const {
    className: rcn,
    style,
    otherProps,
  } = rainbowSprinkles({
    ...props,
  });
  const { children } = otherProps;
  return (
    <h6
      ref={ref}
      className={clsx(className, typo ? typoStyles[typo] : "", rcn)}
      style={style}
      {...otherProps}
    >
      {children}
    </h6>
  );
});
export default Box;

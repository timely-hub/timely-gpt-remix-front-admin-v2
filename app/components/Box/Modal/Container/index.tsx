import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import Close from "~/assets/icons/Close.svg?react";
import { rainbowSprinkles } from "~/styles/rainbow-sprinkles.css";
import { DivProps } from "~/types/shared.types";
import { modalContainerStyles as css } from "../styles.css";

interface ModalContainerProps extends Omit<DivProps, "title"> {
  title?: string | ReactNode;
  headerClose?: boolean;
  subTitle?: string | ReactNode;
  headerPrefix?: ReactNode;
  buttons?: ReactNode;
  children?: ReactNode;
  onClose: () => void;
  contentProps?: DivProps;
}

export default function ModalContainer({
  title: ModalTitle,
  headerClose,
  headerPrefix: HeaderPrefix,
  subTitle: ModalSubTitle,
  buttons,
  onClose,
  children,
  contentProps,
  ...props
}: ModalContainerProps) {
  const { className, style, otherProps } = rainbowSprinkles({ ...props });
  const {
    className: contentClassName,
    style: contentStyle,
    otherProps: contentOtherProps,
  } = rainbowSprinkles({ ...contentProps });
  const [slideIn, set_slideIn] = useState(false);
  const [fixed, set_fixed] = useState(false);
  useEffect(() => {
    set_slideIn(true);
  }, []);
  return (
    <>
      <div
        className={clsx(css.wrap, { slideIn, fixed })}
        onAnimationEnd={() => {
          if (slideIn) set_fixed(true);
        }}
      >
        <div
          className={clsx(css.container, className)}
          style={style}
          {...otherProps}
        >
          <div className={css.header}>
            {ModalTitle && (
              <h1 className={css.title}>
                {ModalTitle || "알림"}
                {headerClose ? (
                  <button type="button" onClick={onClose}>
                    <Close />
                  </button>
                ) : (
                  <></>
                )}
              </h1>
            )}
            {ModalSubTitle && <h2 className={css.subTitle}>{ModalSubTitle}</h2>}
            {HeaderPrefix}
          </div>
          {children && (
            <div
              className={clsx(css.content, contentClassName)}
              style={contentStyle}
              {...contentOtherProps}
            >
              {children}
            </div>
          )}
          {buttons && <div className={css.buttonContainer}>{buttons}</div>}
        </div>
        <button type="button" className={css.dimClick} onClick={onClose} />
      </div>
      <div className={css.dim} />
    </>
  );
}

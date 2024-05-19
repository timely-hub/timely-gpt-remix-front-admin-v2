import clsx from "clsx";
import { decomposeHangul } from "hangul-typing-animation";
import React from "react";
import {
  SprinklesOmit,
  rainbowSprinkles,
} from "~/styles/rainbow-sprinkles.css";
import Asterisk from "../Asterisk";
import { TextInput } from "../TextInput";
import { TextInputProps } from "../TextInput/TextInput";
import labelTemplatesStyles from "./styles.css";

interface LabelTextInputProps extends SprinklesOmit<TextInputProps> {
  label: string;
  wrapClassName?: string;
  required?: boolean;
}

const LabelTextInput = (
  {
    placeholder,
    label,
    wrapClassName,
    required,
    ...props
  }: LabelTextInputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const { className, style, otherProps } = rainbowSprinkles({ ...props });
  const decomposed = decomposeHangul(label);
  const koreanParticle = label
    ? decomposed[decomposed.length - 1].length === 2
      ? "를"
      : "을"
    : "";
  const styles = labelTemplatesStyles;
  return (
    <div
      style={style}
      className={clsx(styles.labelWrap, "w-auto", wrapClassName, className)}
    >
      <div className={styles.inputLabel}>
        <span>{label ? label : `\u200b`}</span>
        {required ? <Asterisk /> : ""}
      </div>
      <TextInput
        ref={ref}
        placeholder={placeholder ?? `${label}${koreanParticle} 입력해 주세요.`}
        {...otherProps}
      />
    </div>
  );
};

export default React.forwardRef(LabelTextInput) as typeof LabelTextInput;

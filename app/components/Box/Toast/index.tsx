import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import Error from "~/assets/icons/Error.svg?react";
import Success from "~/assets/icons/Success.svg?react";
import toastSlice, { ToastItem, useToastStore } from "~/zustand/toastSlice";
import { toastStyles } from "./styles.css";

interface SlideMessageProps {
  item: ToastItem;
  removeToastMessageBy: (id: string) => void;
}

const SlideMessage = ({ item, removeToastMessageBy }: SlideMessageProps) => {
  const [show, setShow] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const toastRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setShow(true);
    const currentTimeout = timeout.current;
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, []);

  const closeToast = () => {
    const toastTarget = toastRef.current as HTMLButtonElement;
    if (!toastTarget) return;
    toastTarget.classList.remove("animation-pause");
    toastTarget.classList.remove("show");
    toastTarget.offsetWidth as number;
    toastTarget.classList.add("hide");
  };

  return (
    <button
      ref={toastRef}
      key={item.id}
      onClick={(e) => {
        e.stopPropagation();
        closeToast();
      }}
      className={clsx(toastStyles.message, item.type ?? "error", { show })}
      onAnimationEnd={(e) => {
        const currentTarget = e.currentTarget as HTMLButtonElement;
        if (currentTarget.classList.contains("show")) {
          timeout.current = setTimeout(() => {
            currentTarget.classList.remove("show");
            currentTarget.offsetWidth;
            currentTarget.classList.add("hide");
          }, 5000);
        }
        if (currentTarget.classList.contains("hide")) {
          clearTimeout(timeout.current as NodeJS.Timeout);
          removeToastMessageBy(item.id);
        }
      }}
      onMouseEnter={(e) => {
        if (timeout.current) clearTimeout(timeout.current as NodeJS.Timeout);
        const currentTarget = e.currentTarget as HTMLButtonElement;
        currentTarget.classList.add("animation-pause");
        currentTarget.offsetWidth;
      }}
      onMouseLeave={(e) => {
        const currentTarget = e.currentTarget as HTMLButtonElement;
        currentTarget.classList.remove("animation-pause");
        currentTarget.offsetWidth;
        timeout.current = setTimeout(() => {
          currentTarget.classList.add("hide");
        }, 2000);
      }}
    >
      {item.type === "error" && <Error />}
      {item.type === "success" && <Success />}
      <span>{item.message}</span>
    </button>
  );
};

const Toast = () => {
  const messages = useToastStore((state) => state.messages);
  const removeToastMessage = toastSlice.getState().removeToastMessage;
  const [currentMessages, setCurrentMessages] = useState<ToastItem[]>([]);

  useEffect(() => {
    if (messages.length > 0) {
      setCurrentMessages((prev) => [...prev, ...messages]);
      for (const message of messages) {
        removeToastMessage(message.id);
      }
    }
  }, [messages, removeToastMessage]);

  const removeToastMessageBy = (id: string) => {
    setCurrentMessages((prev) => prev.filter((message) => message.id !== id));
  };
  return (
    <div className={toastStyles.wrap}>
      {currentMessages.map((message) => {
        return (
          <div key={message.id} className={toastStyles.messages}>
            <SlideMessage
              item={message}
              removeToastMessageBy={removeToastMessageBy}
            />
          </div>
        );
      })}
    </div>
  );
};
export default Toast;

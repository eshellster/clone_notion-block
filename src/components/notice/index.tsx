import React, { useState } from "react";
import "./Notice";
import CloseIcon from "../../images/close.svg";

interface NoticeProps {
  children?: any;
  status?: string;
  mini?: any;
  dismissible?: any;
  style?: any;
}

const Notice = ({
  children,
  status,
  mini,
  dismissible,
  style,
}: NoticeProps) => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div
      className={[
        "notice",
        isVisible !== true ? "notDisplayed" : null,
        status === "SUCCESS" ? "successNotice" : null,
        status === "ERROR" ? "errorNotice" : null,
        mini ? "miniNotice" : null,
      ].join(" ")}
    >
      {dismissible && (
        <span
          role="button"
          tabIndex={0}
          className="dismiss"
          onClick={() => setIsVisible(false)}
        >
          <img src={CloseIcon} alt="close icon" />
        </span>
      )}
      {children}
    </div>
  );
};

export default Notice;

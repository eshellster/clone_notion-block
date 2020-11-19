import React, { useState } from "react";
import { CloseIcon } from "../images/Icon";

interface NoticeProps {
  children?: any;
  status?: any;
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
      style={{ ...style }}
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
          <CloseIcon size={20} />
        </span>
      )}
      {children}
    </div>
  );
};

export default Notice;

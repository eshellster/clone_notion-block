import React from "react";

export const DraggalbleIcon = ({ size = 48, rgba = "rgba(72,72,72,0.5)" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={(6 / 14) * size}
    height={size}
    viewBox="0 0 6 14"
  >
    <g transform="translate(-586 -814)">
      <rect width="2" height="4" transform="translate(590 814)" fill={rgba} />
      <rect width="2" height="4" transform="translate(590 819)" fill={rgba} />
      <rect width="2" height="4" transform="translate(586 814)" fill={rgba} />
      <rect width="2" height="4" transform="translate(586 819)" fill={rgba} />
      <rect width="2" height="4" transform="translate(590 824)" fill={rgba} />
      <rect width="2" height="4" transform="translate(586 824)" fill={rgba} />
    </g>
  </svg>
);

export const CloseIcon = ({ size = 48, color = "#975a16" }) => (
  <svg
    width={size}
    height={size}
    version="1.1"
    id="Capa_1"
    x="0px"
    y="0px"
    viewBox="0 0 22.88 22.88"
  >
    <path
      fill={color}
      d="M0.324,1.909c-0.429-0.429-0.429-1.143,0-1.587c0.444-0.429,1.143-0.429,1.587,0l9.523,9.539
	l9.539-9.539c0.429-0.429,1.143-0.429,1.571,0c0.444,0.444,0.444,1.159,0,1.587l-9.523,9.524l9.523,9.539
	c0.444,0.429,0.444,1.143,0,1.587c-0.429,0.429-1.143,0.429-1.571,0l-9.539-9.539l-9.523,9.539c-0.444,0.429-1.143,0.429-1.587,0
	c-0.429-0.444-0.429-1.159,0-1.587l9.523-9.539L0.324,1.909z"
    />
  </svg>
);

export const TrashIcon = ({ size = 48 }) => (
  <svg
    id="Layer_1"
    width={size}
    height={size}
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="m424 64h-88v-16c0-26.467-21.533-48-48-48h-64c-26.467 0-48 21.533-48 48v16h-88c-22.056 0-40 17.944-40 40v56c0 8.836 7.164 16 16 16h8.744l13.823 290.283c1.221 25.636 22.281 45.717 47.945 45.717h242.976c25.665 0 46.725-20.081 47.945-45.717l13.823-290.283h8.744c8.836 0 16-7.164 16-16v-56c0-22.056-17.944-40-40-40zm-216-16c0-8.822 7.178-16 16-16h64c8.822 0 16 7.178 16 16v16h-96zm-128 56c0-4.411 3.589-8 8-8h336c4.411 0 8 3.589 8 8v40c-4.931 0-331.567 0-352 0zm313.469 360.761c-.407 8.545-7.427 15.239-15.981 15.239h-242.976c-8.555 0-15.575-6.694-15.981-15.239l-13.751-288.761h302.44z" />
      <path d="m256 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
      <path d="m336 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
      <path d="m176 448c8.836 0 16-7.164 16-16v-208c0-8.836-7.164-16-16-16s-16 7.164-16 16v208c0 8.836 7.163 16 16 16z" />
    </g>
  </svg>
);

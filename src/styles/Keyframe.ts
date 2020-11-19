import { keyframes } from "styled-components";

export const SlideUp = keyframes`
0% {
		opacity: 0;
		transform: translateY(4rem);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
`;

export const SlideDown = keyframes`
0% {
		opacity: 0;
		transform: translateY(-4rem);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
    `;

export const UpDown = keyframes`
0% {
		transform: translateY(0);
	}
    
    50% {
		transform: translateY(-4rem);
	}
	100% {
		transform: translateY(0);
	}
`;

export const DownUp = keyframes`
0% {
		transform: translateY(4rem);
	}
	100% {
		transform: translateY(0);
	}
`;

export const scaleUp = keyframes`
0% {
		transform: scaleY(0);
	}
	100% {
		transform: scaleY(1);
	}
`;

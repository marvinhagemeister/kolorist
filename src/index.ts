const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;

export let options = {
	enabled: !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0'
};

function colorist(start: number, end: number) {
	const open = `\x1b[${start}m`;
	const close = `\x1b[${end}m`;
	const regex = new RegExp(`\\x1b\\[${end}m`, 'g');

	return (str: string) => {
		return options.enabled ? open + str.replace(regex, open) + close : str;
	};
}

// modifiers
export const reset = colorist(0, 0);
export const bold = colorist(1, 22);
export const dim = colorist(2, 22);
export const italic = colorist(3, 23);
export const underline = colorist(4, 24);
export const inverse = colorist(7, 27);
export const hidden = colorist(8, 28);
export const strikethrough = colorist(9, 29);

// colors
export const black = colorist(30, 39);
export const red = colorist(31, 39);
export const green = colorist(32, 39);
export const yellow = colorist(33, 39);
export const blue = colorist(34, 39);
export const magenta = colorist(35, 39);
export const cyan = colorist(36, 39);
export const white = colorist(97, 39);
export const gray = colorist(90, 39);

export const lightGray = colorist(37, 39);
export const lightRed = colorist(91, 39);
export const lightGreen = colorist(92, 39);
export const lightYellow = colorist(93, 39);
export const lightBlue = colorist(94, 39);
export const lightMagenta = colorist(95, 39);
export const lightCyan = colorist(96, 39);

// background colors
export const bgBlack = colorist(40, 49);
export const bgRed = colorist(41, 49);
export const bgGreen = colorist(42, 49);
export const bgYellow = colorist(43, 49);
export const bgBlue = colorist(44, 49);
export const bgMagenta = colorist(45, 49);
export const bgCyan = colorist(46, 49);
export const bgWhite = colorist(107, 49);
export const bgGray = colorist(100, 49);

export const bgLightRed = colorist(101, 49);
export const bgLightGreen = colorist(102, 49);
export const bgLightYellow = colorist(103, 49);
export const bgLightBlue = colorist(104, 49);
export const bgLightMagenta = colorist(105, 49);
export const bgLightCyan = colorist(106, 49);
export const bgLightGray = colorist(47, 49);

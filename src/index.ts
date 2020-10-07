const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;

export let options = {
	enabled: !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0',
};

function kolorist(start: number, end: number) {
	const open = `\x1b[${start}m`;
	const close = `\x1b[${end}m`;
	const regex = new RegExp(`\\x1b\\[${end}m`, 'g');

	return (str: string) => {
		return options.enabled ? open + str.replace(regex, open) + close : str;
	};
}

export function stripColors(str: string | number) {
	return ('' + str)
		.replace(/\x1b\[\d+m/g, '')
		.replace(/\x1b\]8;;.*?\x07(.*?)\x1b\]8;;\x07/g, (_, group) => group);
}

// modifiers
export const reset = kolorist(0, 0);
export const bold = kolorist(1, 22);
export const dim = kolorist(2, 22);
export const italic = kolorist(3, 23);
export const underline = kolorist(4, 24);
export const inverse = kolorist(7, 27);
export const hidden = kolorist(8, 28);
export const strikethrough = kolorist(9, 29);

// colors
export const black = kolorist(30, 39);
export const red = kolorist(31, 39);
export const green = kolorist(32, 39);
export const yellow = kolorist(33, 39);
export const blue = kolorist(34, 39);
export const magenta = kolorist(35, 39);
export const cyan = kolorist(36, 39);
export const white = kolorist(97, 39);
export const gray = kolorist(90, 39);

export const lightGray = kolorist(37, 39);
export const lightRed = kolorist(91, 39);
export const lightGreen = kolorist(92, 39);
export const lightYellow = kolorist(93, 39);
export const lightBlue = kolorist(94, 39);
export const lightMagenta = kolorist(95, 39);
export const lightCyan = kolorist(96, 39);

// background colors
export const bgBlack = kolorist(40, 49);
export const bgRed = kolorist(41, 49);
export const bgGreen = kolorist(42, 49);
export const bgYellow = kolorist(43, 49);
export const bgBlue = kolorist(44, 49);
export const bgMagenta = kolorist(45, 49);
export const bgCyan = kolorist(46, 49);
export const bgWhite = kolorist(107, 49);
export const bgGray = kolorist(100, 49);

export const bgLightRed = kolorist(101, 49);
export const bgLightGreen = kolorist(102, 49);
export const bgLightYellow = kolorist(103, 49);
export const bgLightBlue = kolorist(104, 49);
export const bgLightMagenta = kolorist(105, 49);
export const bgLightCyan = kolorist(106, 49);
export const bgLightGray = kolorist(47, 49);

// Links
const OSC = '\u001B]';
const BEL = '\u0007';
const SEP = ';';

export function link(text: string, url: string) {
	return options.enabled
		? OSC + '8' + SEP + SEP + url + BEL + text + OSC + '8' + SEP + SEP + BEL
		: `${text} (\u200B${url}\u200B)`;
}

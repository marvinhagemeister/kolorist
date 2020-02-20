import * as k from './index';
import * as t from 'assert';

describe('colors', () => {
	it('should print colors', () => {
		t.equal(k.cyan('foo'), '\u001b[36mfoo\u001b[39m');
	});

	it('should nest colors', () => {
		t.equal(
			k.green(`foo ${k.lightCyan('bar')} bob`),
			'\u001b[32mfoo \u001b[96mbar\u001b[32m bob\u001b[39m'
		);
	});

	it('should nest background colors', () => {
		t.equal(
			k.bgYellow(`foo ${k.bgGray('bar')} bob`),
			'\u001b[43mfoo \u001b[100mbar\u001b[43m bob\u001b[49m'
		);
	});

	it('should print demo', () => {
		const strs = Object.keys(k)
			.filter(
				key => typeof (k as any)[key] === 'function' || key === 'stripColors'
			)
			.map(x => (k as any)[x]('foobar'));

		const columns: string[][] = [];
		const count = 4;
		for (let i = 0; i < strs.length; i++) {
			(columns[i % count] || (columns[i % count] = [])).push(strs[i]);
		}

		columns.forEach(col => console.log.apply(console, col as any));
	});

	it('should toggle enabled or disabled', () => {
		k.options.enabled = true;
		t.equal(k.cyan('foo'), '\u001b[36mfoo\u001b[39m');

		k.options.enabled = false;
		t.equal(k.cyan('foo'), 'foo');

		k.options.enabled = true;
		t.equal(k.cyan('foo'), '\u001b[36mfoo\u001b[39m');
	});
});

describe('strip colors', () => {
	it('should remove colors from string', () => {
		t.equal(k.stripColors(k.red('foo')), 'foo');
	});
});

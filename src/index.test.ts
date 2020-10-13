import * as k from './index';
import * as t from 'assert';
import * as pty from 'node-pty';
import * as path from 'path';
import * as child_process from 'child_process';


describe('colors', () => {
	k.options.enabled = true; // Always enable colors, even in CLI environments

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

describe('color switch', () => {
	it('should be enabled in terminals by default', done => {
		let output = '';
		const term = pty.spawn(path.join(__dirname, '..', 'node_modules/.bin/ts-node'), [
			'-e', 'console.log(require("./index.ts").blue("foo"))'
		], {
			name: 'test with pseudo tty',
			cols: 80,
			rows: 30,
			cwd: __dirname,
		});
		term.onData(data => output += data);
		term.onExit(() => {
			t.equal(JSON.stringify(output.trim()), JSON.stringify('\x1B[34mfoo\x1B[39m'));
			done();
		});
	}).timeout(20000); // typescript is slow

	it('should be disabled in non-interactive terminals', done => {
		let output = '';
		const subprocess = child_process.spawn(path.join(__dirname, '..', 'node_modules/.bin/ts-node'), [
			'-e', 'console.log(require("./index.ts").blue("foo"))'
		], {
			cwd: __dirname,
			stdio: 'pipe',
		});
		subprocess.stdout.on('data', data => output += data);
		subprocess.on('exit', () => {
			t.equal(JSON.stringify(output.trim()), JSON.stringify('foo'));
			done();
		});
	}).timeout(20000); // typescript is slow
});

describe('strip colors', () => {
	it('should remove colors from string', () => {
		t.equal(k.stripColors(k.red('foo')), 'foo');
	});

	it('should strip link', () => {
		t.equal(k.stripColors(k.link('foo', 'foo')), 'foo')
	})
});

describe('links', () => {
	it('should render links', () => {
		t.equal(
			k.link('my link', 'https://example.com'),
			'\u001b]8;;https://example.com\u0007my link\u001b]8;;\u0007'
		);

		k.options.enabled = false;
		t.equal(
			k.link('my link', 'https://example.com'),
			'my link (\u200Bhttps://example.com\u200B)'
		);
		k.options.enabled = true;
	});
});

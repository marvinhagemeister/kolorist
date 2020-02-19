# colorist

Tiny library to put colors into stdin/stdout :tada:

![Screenshot of terminal colors](screenshot.png)

## Usage

```bash
npm install --save-dev colorist
```

```js
const { red, cyan } = require('colorist');

console.log(red(`Error: something failed in ${cyan('my-file.js')}.`));
```

You can also disable colors globally via the following environment variables:

- `NODE_DISABLE_COLORS`
- `TERM=dumb`
- `FORCE_COLOR=0`

On top of that you can disable colors right from node:

```js
import { options, red } from 'colorist';

options.enabled = false;
console.log(red('foo'));
// Logs a string without colors
```

### License

`MIT`, see [the license file](./LICENSE).

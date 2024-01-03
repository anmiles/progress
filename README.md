# @anmiles/progress

Showing progress of repeating actions

----

## Installation

`npm install @anmiles/progress`

## Usage

### Default limit = 10
```js
import { Progress } from '@anmiles/progress';

const items = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
const progress = new Progress('Processing items', items);

for (const item of items) {
	progress.tick();
}

/**
 * Processing items...
 * Processing items (1/6)...
 * Processing items (2/6)...
 * Processing items (3/6)...
 * Processing items (4/6)...
 * Processing items (5/6)...
 * Processing items (6/6)...
 */
```

### Specified limit
```js
import { Progress } from '@anmiles/progress';

const items = [ 'a', 'b', 'c', 'd', 'e', 'f' ];
const progress = new Progress('Processing items', items, { limit: 4 });

for (const item of items) {
	progress.tick();
}

/**
 * Processing items...
 * Processing items (1/6)...
 * Processing items (3/6)...
 * Processing items (5/6)...
 * Processing items (6/6)...
 */
```

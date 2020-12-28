# dom-typer.js

## what's dom-typer.js?

`dom-typer` is a plugin witten in JavaScript, which can be used to output a string in typer style. 

![](./static/base.gif)

## usage

### Installation

```

npm install dom-js --save

```

### Import

```javascript

import Typer from 'dom-typer'

```

### Use

```javascript

const typer = new Typer('I will be output char by char.')
typer.type()

// reuse
typer.reset('Other string that you want to output.').type()

```
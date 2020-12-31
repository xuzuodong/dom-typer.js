# dom-typer.js

## what is dom-typer.js?

**dom-typer** is a plugin witten in JavaScript, which can be used to output a string in typer style.

![](./static/base.gif)

## usage

### Installation

```

npm install dom-typer --save

```

### Import

```javascript
import Typer from "dom-typer";
```

### Basic Use

```javascript
const typer = new Typer("I will be output letter by letter.");
typer.type((o) => {
  console.log(o);
});

// you can reuse later by doing this
typer.targetString = "Other string that you want to output.";
typer.type((o) => {
  console.log(o);
});

// alternatively, you can use callback to do something when entire process finished
typer.type(
  // first parameter will be called every time when each letter finished typing
  (currentOutput) => {},

  // second parameter will be called when the whole string finished typing
  (entireOutput) => {
    console.log("Typing work finished! ");
  }
);
```

### Render DOM

I created this plugin to better show typer style in web-app, so you can also do this to render your styled text. Here is an example to use it in a Vue project:

```html
<template>
  <div>{{ msg }}</div>
</template>
```

```javascript
import Typer from "dom-typer";

export default {
  data() {
    return {
      msg: "",
    };
  },

  mounted() {
    new Typer("String that you want to render letter by letter.").type((o) => {
      this.msg = o;
    })
  },
};
```

### Bold Style

Bold text is also supported. What you need is to wrap the specific text part with `**`, just like MarkDown syntax, and then the text rendered in your web-app will become bold style.

```javascript
new Typer("String that you want to partly **accent**. ").type((o) => {
  // receive the output string with bold part wrapped with <strong></strong> markup tag 
});
```

![](./static/accent.gif)

# Headroom.js: freeze/unfreeze methods
Extends Headroom.js plugin (https://github.com/WickyNilliams/headroom.js) by adding methods to freeze/unfreeze the current headroom's state.

- `freeze` method:
When called, this method will freeze the current headroom's state (pinned or unpinned). Headroom will not react to the user's scroll. If you wish to re-enable the headroom's default behaviour, you can call `unfreeze` method. 

- `unfreeze` method:
When called, this method will resume headroom's default behaviour. Headroom will pin or unpin when the user scrolls the page. By default, Headroom is not freezed and calling this method before `freeze` will do nothing. 

## Setup
Include `headroom-freeze-unfreeze-methods.js` after `headroom.js` file:
```html
<script src="headroom.js"></script>
<script src="headroom-freeze-unfreeze-methods.js"></script>
```

## Usage
#### With plain JS
Call the methods on an instance of Headroom:

```javascript
// grab an element
var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
// initialise
headroom.init();

// freeze 
headroom.freeze();

// unfreeze
headroom.unfreeze();
```

#### With jQuery
```javascript
$("#header").headroom();

// freeze method
$("#header").headroom('freeze');

// unfreeze method
$("#header").headroom('unfreeze');
```

## Options
There is a new property for the `classes` option:
```javascript
{
  // ... other options
  classes: {
    // ... other classes
    frozen : 'headroom--frozen'
  }
}
```

## Styling (CSS)
Add some CSS to the new class `headroom--frozen`: 
```css
.headroom--frozen {
  opacity: 0.8;
}
```

## Example
- plain JS: [Codepen](https://codepen.io/andreivictor/pen/oymbLO)

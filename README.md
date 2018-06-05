# ng-clipBoard
An clipBoard directive for Angular.

## Usage

In order to use the ng-menu-aim you have to include/import it into your application:

### Installation


```js
import {ClipboardDirective} from '../ng-clipboard/clipboard.directive'
```
Include it in your components declarations list in your @NgModule(...):

```js
@NgModule({
  imports: [],
  declarations: [
    ClipboardDirective
  ]
})
```

Use it in your template:

```html
<div [appClipboard]="clipboard"></div>
```


### The example for `style` 

```css
.tooltipped {
    position: relative
}

.tooltipped:after {
    position: absolute;
    z-index: 1000000;
    display: none;
    padding: 5px 8px;
    font: normal normal 11px/1.5 Helvetica, arial, nimbussansl, liberationsans, freesans, clean, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol";
    color: #fff;
    text-align: center;
    text-decoration: none;
    text-shadow: none;
    text-transform: none;
    letter-spacing: normal;
    word-wrap: break-word;
    white-space: pre;
    pointer-events: none;
    content: attr(aria-label);
    background: rgba(0, 0, 0, .8);
    border-radius: 3px;
    -webkit-font-smoothing: subpixel-antialiased
}

.tooltipped:before {
    position: absolute;
    z-index: 1000001;
    display: none;
    width: 0;
    height: 0;
    color: rgba(0, 0, 0, .8);
    pointer-events: none;
    content: "";
    border: 5px solid transparent
}

.tooltipped:hover:before,
.tooltipped:hover:after,
.tooltipped:active:before,
.tooltipped:active:after,
.tooltipped:focus:before,
.tooltipped:focus:after {
    display: inline-block;
    text-decoration: none
}

.tooltipped-n:after {
    right: 50%;
    bottom: 100%;
    margin-bottom: 5px;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%)
}

.tooltipped-n:before {
    top: -5px;
    right: 50%;
    bottom: auto;
    margin-right: -5px;
    border-top-color: rgba(0, 0, 0, .8)
}

.tooltipped-n:after {
    bottom: calc(100% - 20px);
}

.tooltipped-n:before {
    top: 15px;
}
```

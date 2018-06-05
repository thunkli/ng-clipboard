import select from './select';

/**
 * Inner class which performs selection from either `text` or `target`
 * properties and then executes copy or cut operations.
 */
class ClipboardAction {
  container: HTMLDivElement;
  text: string;
  trigger: any;
  success: any;
  error: any;
  selectedText: string;
  fakeHandlerCallback: any;
  fakeHandler: any;
  fakeElem: any;
  _target: any;
  _action: any;

  constructor(options) {
    this.action = options.action;
    this.container = options.container;
    this.target = options.target;
    this.text = options.text;
    this.trigger = options.trigger;
    this.success = options.success;
    this.error = options.error;

    this.selectedText = '';
    this.initSelection();
  }

  /**
   * Decides which selection strategy is going to be applied based
   * on the existence of `text` and `target` properties.
   */
  initSelection() {
    if (this.text) {
      this.selectFake();
    } else if (this.target) {
      this.selectTarget();
    }
  }

  /**
   * Creates a fake textarea element, sets its value from `text` property,
   * and makes a selection on it.
   */
  selectFake() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';

    this.removeFake();

    this.fakeHandlerCallback = () => this.removeFake();
    this.fakeHandler = this.container.addEventListener('click', this.fakeHandlerCallback) || true;

    this.fakeElem = document.createElement('textarea');
    // Prevent zooming on iOS
    this.fakeElem.style.fontSize = '12pt';
    // Reset box model
    this.fakeElem.style.border = '0';
    this.fakeElem.style.padding = '0';
    this.fakeElem.style.margin = '0';
    // Move element out of screen horizontally
    this.fakeElem.style.position = 'absolute';
    this.fakeElem.style[isRTL ? 'right' : 'left'] = '-9999px';
    // Move element to the same position vertically
    const yPosition = window.pageYOffset || document.documentElement.scrollTop;
    this.fakeElem.style.top = `${yPosition}px`;

    this.fakeElem.setAttribute('readonly', '');
    this.fakeElem.value = this.text;

    this.container.appendChild(this.fakeElem);

    this.selectedText = select(this.fakeElem);
    this.copyText();
  }

  /**
   * Only removes the fake element after another click event, that way
   * a user can hit `Ctrl+C` to copy because selection still exists.
   */
  removeFake() {
    if (this.fakeHandler) {
      this.container.removeEventListener('click', this.fakeHandlerCallback);
      this.fakeHandler = null;
      this.fakeHandlerCallback = null;
    }

    if (this.fakeElem) {
      this.container.removeChild(this.fakeElem);
      this.fakeElem = null;
    }
  }

  /**
   * Selects the content from element passed on `target` property.
   */
  selectTarget() {
    this.selectedText = select(this.target);
    this.copyText();
  }

  /**
   * Executes the copy operation based on the current selection.
   */
  copyText() {
    let succeeded;

    try {
      succeeded = document.execCommand(this.action);
    } catch (err) {
      succeeded = false;
    }

    this.handleResult(succeeded);
  }

  /**
   * Fires an event based on the copy operation result.
   * @param {Boolean} succeeded
   */
  handleResult(succeeded) {
    if (succeeded) {
      this.success()
    } else {
      this.error()
    }
  }

  /**
   * Moves focus away from `target` and back to the trigger, removes current selection.
   */
  clearSelection() {
    if (this.trigger) {
      this.trigger.focus();
    }

    window.getSelection().removeAllRanges();
  }

  /**
   * Sets the `action` to be performed which can be either 'copy' or 'cut'.
   * @param {String} action
   */
  set action(action) {
    this._action = action ? action : 'copy';

    if (this._action !== 'copy' && this._action !== 'cut') {
      throw new Error('Invalid "action" value, use either "copy" or "cut"');
    }
  }

  /**
   * Gets the `action` property.
   * @return {String}
   */
  get action() {
    return this._action;
  }

  /**
   * Sets the `target` property using an element
   * that will be have its content copied.
   * @param {Element} target
   */
  set target(target) {
    if (target !== undefined) {
      if (target && typeof target === 'object' && target.nodeType === 1) {
        if (this.action === 'copy' && target.hasAttribute('disabled')) {
          throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
        }

        if (this.action === 'cut' && (target.hasAttribute('readonly') || target.hasAttribute('disabled'))) {
          throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
        }

        this._target = target;
      } else {
        throw new Error('Invalid "target" value, use a valid Element');
      }
    }
  }

  /**
   * Gets the `target` property.
   * @return {String|HTMLElement}
   */
  get target() {
    return this._target;
  }

  /**
   * Destroy lifecycle.
   */
  destroy() {
    this.removeFake();
  }
}


export default ClipboardAction;

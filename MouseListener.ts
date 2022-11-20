/**
 * Helper class for managing the mouse
 *
 * @author Frans Blauw
 */

export interface MouseCoordinates {
  x: number;
  y: number;
}

export class MouseListener {
  public static readonly BUTTON_LEFT = 0;

  public static readonly BUTTON_MIDDLE = 1;

  public static readonly BUTTON_RIGHT = 2;

  private mouseCoordinates: MouseCoordinates = { x: 0, y: 0 };

  private buttonDown: Record<number, boolean> = {};

  private buttonQueried: Record<number, boolean> = {};

  public constructor(canvas: HTMLCanvasElement, disableContextMenu: boolean = false) {
    canvas.addEventListener('mousemove', (ev: MouseEvent) => {
      this.mouseCoordinates = {
        x: ev.offsetX,
        y: ev.offsetY,
      };
    });
    canvas.addEventListener('mousedown', (ev: MouseEvent) => {
      this.buttonDown[ev.button] = true;
    });
    canvas.addEventListener('mouseup', (ev: MouseEvent) => {
      this.buttonDown[ev.button] = false;
      this.buttonQueried[ev.button] = false;
    });
    if (disableContextMenu) {
      canvas.addEventListener('contextmenu', (ev: MouseEvent) => {
        ev.preventDefault();
      });
    }
  }

  public isButtonDown(buttonCode: number = 0): boolean {
    return this.buttonDown[buttonCode];
  }

  public buttonPressed(buttonCode: number = 0): boolean {
    if (this.buttonQueried[buttonCode] === true) return false;
    if (this.buttonDown[buttonCode] === true) {
      this.buttonQueried[buttonCode] = true;
      return true;
    }
    return false;
  }

  public getMousePosition(): MouseCoordinates {
    return this.mouseCoordinates;
  }
}

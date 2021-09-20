export interface CursorMode {
  onEnter?()
  onLeave?()
  onMouseDown?(e?: MouseEvent)
  onMouseMove?(e?: MouseEvent)
  onMouseUp?(e?: MouseEvent)
}

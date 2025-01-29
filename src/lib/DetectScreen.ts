import MobileDetect from "mobile-detect";

export default class DetectScreen {
  static isMobile(window: Window) {
    const md = new MobileDetect(window.navigator.userAgent);
    return !!md.mobile();
  }
}

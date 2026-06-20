export class App {
  init (app: string) {
    if (app) {
      return
    } else {
      throw new Error('app not found');
    }
  }
}

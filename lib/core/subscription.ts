export type Callback<Class> = (instance?: Class) => void;

export class Subscription<Class> {
  private subscribable: Subscribable<Class>;
  private _callback: Callback<Class>;
  constructor(subscribable: Subscribable<Class>, callback: Callback<Class>) {
    this.subscribable = subscribable;
    this._callback = callback;
  }
  callback(instance?: Class) {
    this._callback(instance);
  }
  unsubscribe(): void {
    this.subscribable.unsubscribe(this);
  }
}
export class Subscribable<Class> {
  private subscriptions: Subscription<Class>[] = [];

  subscribe(callback: Callback<Class>): Subscription<Class> {
    let subscription = new Subscription(this, callback);
    this.subscriptions.push(subscription);
    return subscription;
  }
  unsubscribe(subscription: Subscription<Class>) {
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
  }
  notify(instance?: Class) {
    this.subscriptions.forEach((subscription) =>
      subscription.callback(instance)
    );
  }
}

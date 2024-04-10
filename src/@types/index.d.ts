declare interface String {
  truncate: (num: number) => string;
}

declare interface String {
  prettyMoney: () => string;
  prettyDate: () => string;
}

declare interface Array<T> {
  has: (item: T) => boolean;
}

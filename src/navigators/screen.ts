export enum Screens {
  //auth
  LOGIN = 'Login',

  //main
  MAIN = 'MAIN',

  WELCOME = 'Welcome',

  //product
  PRODUCT_DETAIL = 'ProductDetail',
}

export interface RootStackParamList {
  LOGIN: string;
  WELCOME: string;
  MAIN: string;

  PRODUCT_DETAIL: string;
}

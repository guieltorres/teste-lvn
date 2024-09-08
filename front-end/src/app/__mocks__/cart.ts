import { CartItem } from "@/app/types/cartItem";
import { Chance } from "chance";

const chance = new Chance();

const generateCartItem = (): CartItem => ({
  product: {
    id: chance.integer({ min: 1, max: 1000 }),
    image: chance.url(),
    title: chance.word(),
    price: chance.integer({ min: 1, max: 1000 }),
    category: chance.word(),
    description: chance.sentence(),
    rating: {
      rate: chance.floating({ min: 1, max: 5 }),
      count: chance.integer({ min: 1, max: 1000 }),
    },
  },
  quantity: chance.integer({ min: 1, max: 10 }),
});

export class CartMockBuilder {
  private cart: CartItem[];

  constructor() {
    this.cart = [];
  }

  withItems(count: number) {
    this.cart = Array.from({ length: count }, generateCartItem);
    return this;
  }

  addItem() {
    this.cart.push(generateCartItem());
    return this;
  }

  reset() {
    this.cart = [];
    return this;
  }

  build() {
    return this.cart;
  }
}

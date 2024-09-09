import { Chance } from "chance";

const chance = new Chance();

type Rating = {
  rate: number;
  count: number;
};

type Product = {
  id: number;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  rating: Rating;
};

const generateProduct = (): Product => ({
  id: chance.integer({ min: 1, max: 1000 }),
  title: chance.word(),
  category: chance.word(),
  price: chance.integer({ min: 1, max: 1000 }),
  image: chance.url(),
  description: chance.sentence(),
  rating: {
    rate: chance.floating({ min: 1, max: 5 }),
    count: chance.integer({ min: 1, max: 1000 }),
  },
});

export class ProductMockBuilder {
  private product: Product;

  constructor() {
    this.product = generateProduct();
  }

  withId(id: number) {
    this.product.id = id;
    return this;
  }

  withTitle(title: string) {
    this.product.title = title;
    return this;
  }

  withCategory(category: string) {
    this.product.category = category;
    return this;
  }

  withPrice(price: number) {
    this.product.price = price;
    return this;
  }

  withImage(image: string) {
    this.product.image = image;
    return this;
  }

  withDescription(description: string) {
    this.product.description = description;
    return this;
  }

  withRating(rate: number, count: number) {
    this.product.rating = { rate, count };
    return this;
  }

  build() {
    return this.product;
  }
}

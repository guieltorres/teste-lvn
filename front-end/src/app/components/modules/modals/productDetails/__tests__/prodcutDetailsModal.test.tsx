import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCart } from "@/app/contexts/cart";
import ProductDetailsModal from "../productDetailsModal";
import { ProductMockBuilder } from "@/app/__mocks__/product";

jest.mock("@/app/contexts/cart", () => ({
  useCart: jest.fn(),
}));

const mockProduct = new ProductMockBuilder().build();

describe("ProductDetailsModal", () => {
  const addItem: jest.Mock = jest.fn();
  const toggleModal: jest.Mock = jest.fn();
  const product = mockProduct;

  (useCart as jest.Mock).mockReturnValue({
    addItem,
  });

  test("renders product details", () => {
    render(<ProductDetailsModal product={product} toggleModal={toggleModal} />);

    expect(screen.getByText(product.title)).toBeInTheDocument();
    expect(screen.getByText(product.category)).toBeInTheDocument();
    expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
  });

  test("calls addItem when 'Add to cart' button is clicked", () => {
    render(<ProductDetailsModal product={product} toggleModal={toggleModal} />);

    const addButton = screen.getByText("Add to cart");
    fireEvent.click(addButton);

    expect(addItem).toHaveBeenCalledWith(product);
  });

  test("displays animation message when item is added to cart", async () => {
    jest.useFakeTimers();

    render(<ProductDetailsModal product={product} toggleModal={toggleModal} />);

    const addButton = screen.getByText("Add to cart");
    await act(async () => {
      fireEvent.click(addButton);
    });

    const animationMessage = screen.getByText("Item added to cart!");
    expect(animationMessage).toBeInTheDocument();

    act(() => {
      jest.runAllTimers();
    });

    expect(animationMessage).not.toBeInTheDocument();
  });

  test("calls toggleModal when close button is clicked", async () => {
    render(<ProductDetailsModal product={product} toggleModal={toggleModal} />);

    const closeButton = screen.getByTestId("close-modal");
    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(toggleModal).toHaveBeenCalled();
  });
});

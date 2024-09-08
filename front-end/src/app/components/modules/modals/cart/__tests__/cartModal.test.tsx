import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CartModal from "@/app/components/modules/modals/cart/cartModal";
import { useCart } from "@/app/contexts/cart";
import { CartMockBuilder } from "@/app/__mocks__/cart";

jest.mock("@/app/contexts/cart", () => ({
  useCart: jest.fn(),
}));

const cartMockBuilder = new CartMockBuilder().withItems(2);
const mockCart = cartMockBuilder.build();

describe("CartModal", () => {
  const addItem: jest.Mock = jest.fn();
  const removeItem: jest.Mock = jest.fn();
  const deleteItem: jest.Mock = jest.fn();

  (useCart as jest.Mock).mockReturnValue({
    items: mockCart,
    addItem,
    removeItem,
    deleteItem,
  });

  test("renders cart items", () => {
    render(<CartModal toggleModal={jest.fn()} />);

    const product1Title = screen.getByText(mockCart[0].product.title);
    const product2Title = screen.getByText(mockCart[1].product.title);

    expect(product1Title).toBeInTheDocument();
    expect(product2Title).toBeInTheDocument();
  });

  test("calls removeItem when remove button is clicked", () => {
    render(<CartModal toggleModal={jest.fn()} />);

    const removeButton = screen.getByTestId(
      `decrement-button-${mockCart[0].product.id}`
    );
    fireEvent.click(removeButton);

    expect(useCart().removeItem).toHaveBeenCalledWith(mockCart[0].product);
  });

  test("calls addItem when add button is clicked", () => {
    render(<CartModal toggleModal={jest.fn()} />);

    const addButton = screen.getByTestId(
      `increment-button-${mockCart[1].product.id}`
    );
    fireEvent.click(addButton);

    expect(useCart().addItem).toHaveBeenCalledWith(mockCart[1].product);
  });

  test("calls deleteItem when remove button is clicked", () => {
    render(<CartModal toggleModal={jest.fn()} />);

    const deleteButton = screen.getAllByText("Remove")[0];
    fireEvent.click(deleteButton);

    const deleteButton1 = screen.getAllByText("Remove")[1];
    fireEvent.click(deleteButton1);

    expect(useCart().deleteItem).toHaveBeenCalledWith(mockCart[0].product);
    expect(useCart().deleteItem).toHaveBeenCalledWith(mockCart[1].product);
  });

  test("empty cart message is displayed when cart is empty", () => {
    (useCart as jest.Mock).mockReturnValue({
      items: [],
      addItem,
      removeItem,
      deleteItem,
    });

    render(<CartModal toggleModal={jest.fn()} />);

    const emptyCartMessage = screen.getByText("Your cart is empty.");

    expect(emptyCartMessage).toBeInTheDocument();
  });
});

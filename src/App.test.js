import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Axios from "axios";
import App from "./App";

jest.mock("axios");

const photos = [
  { src: { medium: "medium-1.jpg", tiny: "tiny-1.jpg" } },
  { src: { medium: "medium-2.jpg", tiny: "tiny-2.jpg" } },
];

beforeEach(() => {
  Axios.get.mockResolvedValue({ data: { photos } });
});

test("renders buy page and empty cart", async () => {
  render(<App />);
  expect(screen.getByText("Buy Page")).toBeInTheDocument();
  expect(screen.getByText("Cart empty!!")).toBeInTheDocument();
  await waitFor(() =>
    expect(screen.getAllByRole("button", { name: "Buy Now" })).toHaveLength(2)
  );
});

test("adds a product to the cart", async () => {
  render(<App />);
  const buyButtons = await screen.findAllByRole("button", { name: "Buy Now" });
  userEvent.click(buyButtons[0]);
  expect(screen.queryByText("Cart empty!!")).not.toBeInTheDocument();
  expect(screen.getByText("Grand Total")).toBeInTheDocument();
});

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { random, commerce } from "faker";
import { Container, Col, Row } from "reactstrap";
import CartItem from "./CartItem";

const apiKey = "563492ad6f91700001000001ea74fb5f8fe04a6899c2699cf0aee631";

const url = "https://api.pexels.com/v1/search?query=laptop&per_page=6&page=2";

const BuyPage = ({ addInCart }) => {
  const [product, setProduct] = useState([]);

  const fetchPhotos = async () => {
    const { data } = await Axios.get(url, {
      headers: {
        Authorization: apiKey,
      },
    });
    const { photos } = data;

    const allProduct = photos.map((photo) => ({
      smallImage: photo.src.medium,
      tinyImage: photo.src.tiny,
      productName: random.word(),
      productPrice: commerce.price(),
      id: random.uuid(),
    }));

    // Set product to state.
    setProduct(allProduct);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <Container>
      <h1 className="text-light text-center">Buy Page</h1>
      <Row>
        {product.map((product) => (
          <Col md={4} key={product.id}>
            <CartItem product={product} addInCart={addInCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BuyPage;

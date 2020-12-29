import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button,
  CardImg,
} from "reactstrap";

const CartItem = ({ product, addInCart }) => {
  return (
    <Card className="mt-2 mb-1">
      <CardImg top height="200" width="100%" src={product.smallImage} />
      <CardBody className="text-center">
        <CardTitle>{product.productName}</CardTitle>
        <CardText>Price: ₹{product.productPrice}</CardText>
        <Button
          className="px-4"
          color="info"
          onClick={() => addInCart(product)}
        >
          Buy Now
        </Button>
      </CardBody>
    </Card>
  );
};

export default CartItem;

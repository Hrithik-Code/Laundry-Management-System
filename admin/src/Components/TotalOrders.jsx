import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import axios from "axios";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function TotalOrders() {
  const [OrderCount, setOrderCount] = React.useState(0);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getOrder")
      .then((response) => {
        setOrderCount(response.data.order.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {OrderCount}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <ShoppingCartIcon sx={{ fontSize: "50px" }} color="primary" />
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            Orders
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

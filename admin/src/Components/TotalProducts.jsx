import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import BentoIcon from "@mui/icons-material/Bento";
import axios from "axios";
export default function TotalProducts() {
  const [productCount, setProductCount] = React.useState(0);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllProducts")
      .then((response) => {
        console.log(response.data.length);
        setProductCount(response.data.length);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {productCount}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <BentoIcon sx={{ fontSize: "50px" }} color="primary" />
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            Products
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

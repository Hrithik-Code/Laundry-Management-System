import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import axios from "axios";

export default function TotalCategories() {
  const [categoryCount, setCategoryCount] = React.useState(0);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllCategories")
      .then((response) => {
        console.log(response.data.length);
        setCategoryCount(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Card>
      <CardActionArea>
        <CardContent>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography gutterBottom variant="h5" component="div">
              {categoryCount}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <CategoryIcon sx={{ fontSize: "50px" }} color="primary" />
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            categories
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

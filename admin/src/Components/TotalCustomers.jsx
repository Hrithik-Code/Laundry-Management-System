import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import axios from "axios";
export default function TotalCustomers() {
  const [customerCount, setcustomerCount] = React.useState(0);
  React.useEffect(() => {
    axios
      .get("http://localhost:4000/admin/getAllCustomers")
      .then((response) => {
        setcustomerCount(response.data.length);
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
              {customerCount}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              <PersonPinIcon sx={{ fontSize: "50px" }} color="primary" />
            </Typography>
          </div>
          <Typography variant="body2" color="text.secondary">
            Customers
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

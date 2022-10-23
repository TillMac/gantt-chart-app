import { Box, Button } from "@mui/material";
import { Link, useRouteError } from "react-router-dom";

const errorImg = require('../../assets/404_Error_bgImg.png');

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <Box sx={{width: '100%', textAlign: 'center', height: '100', }}>
      <div style={{margin: 'auto', display: 'block',}} >
        <img src={errorImg} alt='404 Error' style={{marginLeft: 'auto', marginRight: 'auto', }} />
        <p style={{fontSize: '24px', }}>Oops...Page <i>{error.statusText || error.message}!</i></p>
        <Link to={'/'} style={{textDecoration: 'none', color: 'inherit'}}>
          <Button size='large'>點擊我回到主頁</Button>
        </Link>
      </div>
    </Box>
  )
}

export default ErrorPage;

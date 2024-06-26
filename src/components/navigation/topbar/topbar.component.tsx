import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import classes from "./styles.module.scss";
import Avatar from '@mui/material/Avatar';

import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import RedeemIcon from "@mui/icons-material/Redeem";
import PublicIcon from "@mui/icons-material/Public";
import HelpIcon from "@mui/icons-material/Help";// Import your icons here
import { Badge, BadgeProps } from "@mui/material";
import { styled } from '@mui/material/styles';



const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      left: 15,
      top: 10,
      padding: '0 4px',
    },
  }));

interface TopBarProps {
  userName: string;
}


const topbarWidth = 256;

const TopBar: React.FC<TopBarProps> = ({ userName }) => {
    const count=10;
    return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar className={classes["topbar"]} position="fixed"
        sx={{
        width: { sm: `calc(100% - ${topbarWidth}px)` },
        ml: { sm: `${topbarWidth}px` },
        backgroundColor: 'var(--primary-800)',
        boxShadow: 'none',
        alignItems: 'end',
        paddingRight:'8rem',
        }
        
        }>
      <Toolbar className={classes["topbar__toolbar"] } sx={{
        gap: 3,
      }}>
        <IconButton className={classes["topbar__toolbar__icon"]} edge="start" color="inherit" aria-label="icon1">
          <StyledBadge badgeContent={count} max={9} color="success" >
          <MailIcon className={classes["topbar__toolbar__icon__mail"]} sx={
            {
                fontSize: '2rem',
                color: 'var(--success-main)',
            }
          }/>
          </StyledBadge>
          
        </IconButton>
            <IconButton className={classes["topbar__toolbar__icon"]} color="inherit" aria-label="icon2">
            <StyledBadge badgeContent={count} max={9} color="secondary" >
            <PublicIcon className={classes["topbar__toolbar__icon__public"]}
           sx={
            {
                fontSize: '2rem',
                color: 'var(--secondary-main)',
            }
          }
          />
          </StyledBadge>
          
        </IconButton>
        
        <IconButton className={classes["topbar__toolbar__icon"]}>
        <StyledBadge badgeContent={count} max={9} color="primary" >
        <NotificationsIcon className={classes["topbar__toolbar__icon__notification"]} 
          sx={
            {
                fontSize: '2rem',
                color: 'var(--primary-main)',
            }
          }
          />
          </StyledBadge>
        </IconButton>
          
    
        <IconButton className={classes["topbar__toolbar__icon"]}color="inherit" aria-label="icon4">
        <StyledBadge badgeContent={count} max={9} color="error" >
        <RedeemIcon className={classes["topbar__toolbar__icon__redeem"]} 
          sx={
            {
                fontSize: '2rem',
                color: 'var(--danger-main)',
            }
          }
          />
          </StyledBadge>
          
        </IconButton>  
        <div className={classes["topbar__toolbar__user"]}>
        <Avatar className={classes["topbar__toolbar__user__avatar"]} src="/path/to/user/image.jpg"  sx={{
            width: '3.2rem',
            height: '3.2rem',
            
        }}/> {/* Step 2 & 3: Add Avatar with styling */}
        <Typography style={{ flexGrow: 1, textAlign: 'right' }} 
        sx={{
            fontFamily: 'Roboto',
            fontWeight: 400,
            fontSize: '1.6rem',

        }}>
          {userName}
        </Typography>
        </div>
        <IconButton className={classes["topbar__toolbar__icon"]} color="inherit" aria-label="icon4">
          <HelpIcon className={classes["topbar__toolbar__icon__help"]} 
          sx={
            {
                fontSize: '2.4rem',
                color: 'var(--primary-100)',
            }
          }
          />
        </IconButton>
        
      </Toolbar>
    </AppBar>
    </Box>
  );
};

export default TopBar;
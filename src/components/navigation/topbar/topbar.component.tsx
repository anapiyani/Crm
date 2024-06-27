import * as React from "react";
import AppBar from "@mui/material/AppBar";
import classes from "./styles.module.scss";
import {Help, Notifications, Public, Redeem,Mail} from "@mui/icons-material"; //Icons import 
import { Badge, BadgeProps,Avatar,Typography,Toolbar,IconButton,styled,Box } from "@mui/material"; //Material UI imports



const StyledBadge = styled(Badge)<BadgeProps>(() => ({
    '& .MuiBadge-badge': {
      left: 15,
      top: 10,
      padding: '0 4px',
    },
  }));

interface ITopBarProps {
  userName: string;
}


const topbarWidth = 256;

const TopBar: React.FC<ITopBarProps> = ({ userName }) => {
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
          <Mail className={classes["topbar__toolbar__icon__mail"]} sx={
            {
                fontSize: '2rem',
                color: 'var(--success-main)',
            }
          }/>
          </StyledBadge>
          
        </IconButton>
            <IconButton className={classes["topbar__toolbar__icon"]} color="inherit" aria-label="icon2">
            <StyledBadge badgeContent={count} max={9} color="secondary" >
            <Public className={classes["topbar__toolbar__icon__public"]}
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
        <Notifications className={classes["topbar__toolbar__icon__notification"]} 
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
        <Redeem className={classes["topbar__toolbar__icon__redeem"]} 
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
            
        }}/> {}
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
          <Help className={classes["topbar__toolbar__icon__help"]} 
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
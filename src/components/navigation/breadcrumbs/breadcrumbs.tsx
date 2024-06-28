import React from "react";
import { Breadcrumbs as MUIbreadcrumbs, Link, ListItemBaseProps, ListItemProps, Typography } from "@mui/material";
import { ChevronRightRounded, NavigateNext } from "@mui/icons-material";
import {
    Link as RouterLink,
    Route,
    Routes,
    MemoryRouter,
    useLocation,
} from 'react-router-dom';

export default function BreadcrumbsCustom(): JSX.Element {
    const location = useLocation();
    let currentLink = '';
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (

        <MUIbreadcrumbs aria-label="breadcrumb" separator={<ChevronRightRounded/>} >
            {pathnames.map((value, index) => {
                currentLink += `/${value}`;
                const last = index === pathnames.length - 1;
                const to = currentLink;
                return last ? (
                    <Typography color="var(--primary-500)" fontWeight={'400'} fontSize={"1.6rem"} key={to}>
                        {value}
                    </Typography>
                ) : (
                    <Link component={RouterLink} to={to} color="secondary" fontWeight={'400'} fontSize={"1.6rem"} key={to}>
                        {value}
                    </Link>
                );
            })}
        </MUIbreadcrumbs>
    );
}
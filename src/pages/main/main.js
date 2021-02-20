import React, { Suspense, lazy, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import {
  Link, Route, Switch, useLocation,
} from 'react-router-dom';
import {
  Divider,
  Drawer as MaterialDrawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core';

import * as routes from 'routes';

const Orders = lazy(() => import('pages/orders'));
const PizzasSizes = lazy(() => import('pages/pizzas-sizes'));
const PizzasFlavours = lazy(() => import('pages/pizzas-flavours'));

const Main = () => {
  const { pathname } = useLocation();

  useScrollToTop();

  const getSelectedMenuItem = useCallback((item) => {
    return pathname === item.link ||
    (pathname.includes(item.link) && item.link !== routes.HOME);
  }, [pathname]);

  return (
    <h1>
      <Drawer variant="permanent">
        <DrawerContent>
          <Typography variant="h4">
            React-zzaria
          </Typography>

          <Typography>
            (Sistema de cadastro)
          </Typography>
        </DrawerContent>

        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.label} button component={Link} to={item.link} selected={getSelectedMenuItem(item)}>
              <ListItemText>
                {item.label}
              </ListItemText>
            </ListItem>
          ))}
        </List>

      </Drawer>
      <Content>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            {menuItems.map((item) => (
              <Route key={item.link} path={item.link} exact={item.exact}>
                <item.component />
              </Route>
            ))}
          </Switch>
        </Suspense>
      </Content>

    </h1>
  );
};

function useScrollToTop () {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
};

const menuItems = [
  {
    label: 'Pedidos',
    link: routes.HOME,
    component: Orders,
    exact: true,
  },
  {
    label: 'Tamanhos de pizzas',
    link: routes.PIZZAS_SIZES,
    component: PizzasSizes,
  },
  {
    label: 'Sabores de pizzas',
    link: routes.PIZZAS_FLAVOURS,
    component: PizzasFlavours,
  },
];

const Drawer = styled(MaterialDrawer)`
  && {
    .MuiPaper-root {
      width: ${({ theme }) => theme.extend.drawerWidth}px;
    }
  }
`;

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(1)}px;
  text-align: center;
`;

const Content = styled.main`
  margin-left: ${({ theme }) => theme.extend.drawerWidth}px;
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

export default Main;

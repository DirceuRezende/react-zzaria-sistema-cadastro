import React, { useMemo } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer as MaterialTableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import styled from 'styled-components';

import singularOrPlural from 'utils/singular-or-plural';

import { useOrders } from 'hooks';

const Order = () => {
  const { orders, status } = useOrders();

  const allOrdersStatus = useMemo(() => ([
    {
      title: 'Pedidos pendentes',
      type: status.pending
    },
    {
      title: 'Pedidos em produção',
      type: status.inProgress
    },
    {
      title: 'Saiu para entrega',
      type: status.outForDelivery
    },
    {
      title: 'Pedidos finalizados',
      type: status.delivered
    },
  ]), [status]);

  function getHours(date) {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
    };
    return Intl.DateTimeFormat('pt-BR', options).format(date);
  }

  return allOrdersStatus.map((orderStatus) => (
    <TableContainer component={Paper} key={orderStatus.title}>
      <TableTitle>
        {orderStatus.title}
      </TableTitle>
      <Table>
        <THead>
          <TableRow>
            <Th>
              <Typography>
                Informações do pedido
              </Typography>
            </Th>
          </TableRow>
        </THead>
        <TableBody>
          {orders?.[orderStatus.type].length === 0 && (
            <TableRow>
              <TableCell>
                <Typography>
                  Nenhum pedido com esse status.
                </Typography>
              </TableCell>
            </TableRow>
          )}
          {orders?.[orderStatus.type].map((order) => {
            const {
              address,
              number,
              complement,
              district,
              code: cep,
              city,
              state,
            } = order.address;

            return (
              <TableRow key={order.id}>
                <TableCell>
                  <div>
                    <Subtitle>
                      Horário do pedido:
                      {' '}
                      {getHours(order.createdAt.toDate())}
                    </Subtitle>
                  </div>

                  <div>
                    <Subtitle>
                      Pedido
                    </Subtitle>

                    <ul>
                      {order.pizzas.map((pizza, index) => (
                        <li key={index}>
                        <Typography>
                            {pizza.quantity} {' '}
                            {singularOrPlural(
                              pizza.quantity,
                              'pizza',
                              'pizzas'
                            )}{' '}
                            {pizza.size.name.toUpperCase()} de {' '}
                            {pizza.flavours
                              .map(flavour => flavour.name)
                              .reduce((acc, flavour, index, array) => {
                                if (index === 0) {
                                  return flavour
                                }

                                if (index === array.length - 1) {
                                  return `${acc} e ${flavour}`
                                }

                                return `${acc}, ${flavour}`
                              }, '')}
                          </Typography>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <Typography>
                      {address}
                      ,
                      {' '}
                      {number && `nº ${number}`}
                      {' '}
                      {' '}
                      {complement && `, ${complement}`}
                      <br />
                      Bairro:
                      {' '}
                      {district}
                      {' '}
                      - CEP:
                      {' '}
                      {cep}
                      <br />
                      {city}
                      {' '}
                      /
                      {' '}
                      {state}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ));
};

const TableContainer = styled(MaterialTableContainer).attrs({
  component: Paper,
})`
  && {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`;

const TableTitle = styled(Typography).attrs({
  variant: 'h6',
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`;

const Subtitle = styled(Typography).attrs({
  variant: 'button',
})`
  && {
    font-weight: bold;
  }
`;

const THead = styled(TableHead)`
  && {
    background: ${({ theme }) => theme.palette.common.black};
  }
`;

const Th = styled(TableCell)`
  && {
    color: ${({ theme }) => theme.palette.common.white};
  }
`;

export default Order;

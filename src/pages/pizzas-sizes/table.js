import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons'
import { TableButton, TableContainer, TableTitle, TableTitleContainer, THead, Th } from 'ui';
import { useCollection } from 'hooks';
import { singularOrPlural } from 'utils';
import { PIZZAS_SIZES, NEW, EDIT } from 'routes'

const TablePizzasSizes = () => {
  const { data: pizzasSizes, remove } = useCollection('pizzasSizes');
  const newSizePath = useRouteMatch(`${PIZZAS_SIZES}${NEW}`);

  return (
    <TableContainer>
      <TableTitleContainer>
        <Grid item>
          <TableTitle>
            Tamanhos de Pizzas
          </TableTitle>
        </Grid>

        <Grid item>
          <TableButton color='primary' startIcon={<Add />} component={Link} to={`${PIZZAS_SIZES}${NEW}`} disabled={!!newSizePath}>
            Adicionar novo tamanho
          </TableButton>
        </Grid>
      </TableTitleContainer>

      <Table>
        <THead>
          <TableRow>
            <Th>Nome</Th>
            <Th>Diâmetro</Th>
            <Th>Fatias</Th>
            <Th>Sabores</Th>
            <Th></Th>
          </TableRow>
        </THead>

        <TableBody>
        {pizzasSizes?.map(pizza => (
          <TableRow key={pizza.id}>
            <TableCell>{pizza.name}</TableCell>
            <TableCell>{pizza.size}</TableCell>
            <TableCell>{pizza.slices}</TableCell>
            <TableCell>
              {pizza.flavours} {' '}
              {singularOrPlural(pizza.flavours, 'sabor', 'sabores')}
            </TableCell>
            <TableCell align='right'>
              <TableButton startIcon={<Edit />} component={Link} to={`${PIZZAS_SIZES}${EDIT(pizza.id)}`}>
                Editar
              </TableButton>
              <TableButton color='secondary' startIcon={<Delete />} onClick={() => remove(pizza.id)}>
                Remover
              </TableButton>
            </TableCell>
          </TableRow>
        ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
};

export default TablePizzasSizes;

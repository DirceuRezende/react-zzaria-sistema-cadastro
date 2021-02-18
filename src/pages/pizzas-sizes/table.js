import React from 'react';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { PIZZAS_SIZES, NEW, EDIT } from 'routes'

import {
  Button as MaterialButton,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { Add, Delete, Edit } from '@material-ui/icons'
import { TableContainer, TableTitle, THead, Th } from 'ui';
import { useCollection } from 'hooks';
import { singularOrPlural } from 'utils';

const TablePizzasSizes = () => {
  const { data: pizzasSizes, remove } = useCollection('pizzasSizes');
  const newSizePath = useRouteMatch(`${PIZZAS_SIZES}${NEW}`);

  return (
    <TableContainer>
      <TitleContainer>
        <Grid item>
          <TableTitle>
            Tamanhos de Pizzas
          </TableTitle>
        </Grid>

        <Grid item>
          <Button color='primary' startIcon={<Add />} component={Link} to={`${PIZZAS_SIZES}${NEW}`} disabled={!!newSizePath}>
            Adicionar novo tamanho
          </Button>
        </Grid>
      </TitleContainer>




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
              <Button startIcon={<Edit />} component={Link} to={`${PIZZAS_SIZES}${EDIT(pizza.id)}`}>
                Editar
              </Button>
              <Button color='secondary' startIcon={<Delete />} onClick={() => remove(pizza.id)}>
                Remover
              </Button>
            </TableCell>
          </TableRow>
        ))}

        </TableBody>
      </Table>
    </TableContainer>
  )
};

const TitleContainer = styled(Grid).attrs({
  container: true,
  justify: 'space-between',
  alignItems: 'center'
})`
  && {
    padding: ${( {theme} ) => theme.spacing(3)}px;

    ${TableTitle} {
      padding: 0;
    }
  }
`

const Button = styled(MaterialButton).attrs({
  variant: 'contained'
})`
  && {
    margin-left: ${( {theme} ) => theme.spacing(2)}px;
  }
`

export default TablePizzasSizes;

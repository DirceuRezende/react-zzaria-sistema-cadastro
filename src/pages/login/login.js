/* eslint-disable react/jsx-handler-names */
import React from 'react'
import styled from 'styled-components'
import { Button, Grid } from '@material-ui/core'
import { ReactComponent as MainLogo } from 'images/logo-react-zzaria.svg'
import { useAuth } from 'hooks'

const Login = () => {
  const { login } = useAuth()

  return (
    <Container>
      <Grid container justify='center' spacing={5}>
        <Grid item>
          <Logo />
        </Grid>
        <Grid item xs={12} container justify='center'>
          <GitHubButton onClick={login}>Entrar com Github
          </GitHubButton>
        </Grid>
      </Grid>
    </Container>
  )
}

const Logo = styled(MainLogo)`
  width: 100%;
`

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing(3)}px;
`

const GitHubButton = styled(Button).attrs({
  variant: 'contained',
  fullWidth: true
})`
  && {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    max-width: 480px;
    padding: ${({ theme }) => theme.spacing(2)}px;
    text-transform: none;
  }
`

export default Login

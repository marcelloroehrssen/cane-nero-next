import React from 'react'
import { Container, Grid, Link, Paper } from '@material-ui/core'
import FooterBox from './FooterBox'
import { theme } from '../../Theme'

export default function Footer () {
  return (
    <Paper elevation={3} component={'footer'} style={{ marginTop: theme.spacing(8) }} square>
      <Container>
        <Grid container direction="row" justify="center">
          <Grid item md={4} sm={12} style={{ marginTop: theme.spacing(8) }}>
            <FooterBox area={'Informazioni'} title={'Cane Nero'}>
                            Associazione culturale
              <br/>
                            Finalizzata alla promozione
              <br/>
                            ed attuazione del gioco di ruolo dal vivo
              <br/>
                            su tutto il territorio nazionale
            </FooterBox>
          </Grid>
          <Grid item md={4} sm={12} style={{ marginTop: theme.spacing(8) }}>
            <FooterBox area={'Contatti'} title={'Scrivi una mail a'}>
              <Link color={'secondary'}
                href={'mailto:presidente@cane-nero.it'}>presidente@cane-nero.it</Link><br/>
              <Link color={'secondary'}
                href={'mailto:presidente@cane-nero.it'}>direttivo@cane-nero.it</Link><br/>
              <br/>
              <Link color={'secondary'}
                href={'mailto:presidente@cane-nero.it'}>staff@cane-nero.it</Link><br/>
              <Link color={'secondary'}
                href={'mailto:presidente@cane-nero.it'}>tech@cane-nero.it</Link><br/>
            </FooterBox>
          </Grid>
          <Grid item md={4} sm={12} style={{ margin: theme.spacing(8, 0, 8, 0) }}>
            <FooterBox area={'Informazioni'} title={'Cane Nero'}>
                            Associazione culturale
              <br/>
                            Finalizzata alla promozione
              <br/>
                            ed attuazione del gioco di ruolo dal vivo
              <br/>
                            su tutto il territorio nazionale
            </FooterBox>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  )
}

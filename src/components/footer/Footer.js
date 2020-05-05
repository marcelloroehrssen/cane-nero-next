import React from 'react'
import {Container, Grid, Link, Paper} from '@material-ui/core'
import FooterBox from './FooterBox'
import {theme} from '../../Theme'

export default function Footer() {
    return (
        <>
            <Paper elevation={3} component={'footer'} style={{marginTop:theme.spacing(8)}} square>
                <Container>
                    <Grid container direction="row" justify="flex-start" alignItems="center" spacing={10}
                          style={{paddingTop: theme.spacing(4),paddingBottom: theme.spacing(4)}}>
                        <Grid item style={{borderRight: "1px solid black"}}>
                            <img width="100" src={'/images/logo.jpg'}
                                 style={{backgroundColor: 'transparent', boxShadow: 'none'}}
                                 alt="Cane Nero - GDR lazio"/>
                        </Grid>
                        <Grid item>
                            <FooterBox area={'Contatti'} title={'Per info'}>
                                <Link color={'secondary'}
                                      href={'mailto:presidente@cane-nero.it'}>presidente@cane-nero.it</Link><br/>
                                <Link color={'secondary'}
                                      href={'mailto:presidente@cane-nero.it'}>direttivo@cane-nero.it</Link><br/>
                            </FooterBox>
                        </Grid>
                        <Grid item>
                            <FooterBox area={'Contatti'} title={'Per supporto'}>
                                <Link color={'secondary'}
                                      href={'mailto:presidente@cane-nero.it'}>staff@cane-nero.it</Link><br/>
                                <Link color={'secondary'}
                                      href={'mailto:presidente@cane-nero.it'}>tech@cane-nero.it</Link><br/>
                            </FooterBox>
                        </Grid>
                    </Grid>
                </Container>
            </Paper>
        </>
    )
}

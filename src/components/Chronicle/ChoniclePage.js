import React, { useContext, useState } from 'react'
import ConfigContext from '../../provider/ConfigContext'
import useHttp from '../../hooks/UseHttp'
import { CircularProgress } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import ChronicleCard from '../card/ChronicleCard'
import FlashBarContext from '../../provider/FlashBarContext'

export default function Chronicles () {
  const config = useContext(ConfigContext)
  const flashContext = useContext(FlashBarContext)
  const [chronicles, setChronicles] = useState([])

  useHttp(
    config.ws_url + '/chronicle',
    {},
    (eventResponse) => setChronicles(eventResponse.chronicles),
    () => flashContext.show('C\'è stato un errore nel caricamento delle cronache', 'error')
  )

  if (chronicles === null) {
    return <CircularProgress/>
  }

  return (
    <>
      {
        chronicles.map((chronicle) => {
          return (
            <Grid item xs={12} md={4} key={chronicle.id}>
              <ChronicleCard chronicle={chronicle}/>
            </Grid>
          )
        })
      }
    </>
  )
}

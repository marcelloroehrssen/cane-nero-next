import React, { useContext, useState } from 'react'
import Chip from '@material-ui/core/Chip'
import Link from '../Link'
import useHttp from '../../hooks/UseHttp'
import ConfigContext from '../../provider/ConfigContext'
import FlashBarContext from '../../provider/FlashBarContext'

export default function NewsRelatedTag () {
  const config = useContext(ConfigContext)
  const flashContext = useContext(FlashBarContext)
  const [tags, setTags] = useState([])

  useHttp(
    config.ws_url + '/tag',
    {},
    (response) => setTags(response.tags),
    () => flashContext.show('C\'è stato un errore nel caricamento dei tag', 'error')
  )

  return (
    <div>
      {
        tags.map(tag => <Chip key={tag.id}
          label={tag.label}
          component={Link}
          href={'/news?tag=' + tag.label}
          as={'/news/tag/' + tag.label}
          color={'primary'}
          clickable/>)
      }
    </div>
  )
}

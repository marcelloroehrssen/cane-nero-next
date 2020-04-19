import React, { createContext } from 'react'
import PropTypes from 'prop-types'

export const config = {
  ws_url: 'http://api.canenero.loc',
  max_news_per_homepage: 4,
  max_news_per_page: 6
};

ConfigContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const ConfigContext = createContext({})

export function ConfigContextProvider (props) {

  return (
    <ConfigContext.Provider value={config}>
      {props.children}
    </ConfigContext.Provider>
  )
}

export default ConfigContext

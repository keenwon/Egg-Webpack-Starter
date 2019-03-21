import React from 'react'
import './Home.scss'

const Home = () => (
  <div styleName='home'>
    <p>
      <span styleName='egg'>Egg</span>
      <span styleName='plus'>+</span>
      <span styleName='webpack'>Webpack</span>
    </p>
    <p>
      <a styleName='link' target='_blank' href='https://github.com/keenwon/Egg-Webpack-Starter'>
        https://github.com/keenwon/Egg-Webpack-Starter
      </a>
    </p>
  </div>
)

export default Home

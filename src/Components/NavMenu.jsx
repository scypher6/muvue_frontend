import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const colors = [
  'violet'
]

class NavMenu extends Component {
  static propTypes = {
    color: PropTypes.string,
  }

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { color } = this.props
    const { activeItem } = this.state

    return (
      <Menu color={color} inverted widths={3}>
        <Menu.Item
          as={ Link }
          to='/stats'
          name='Trends'
          active={activeItem === 'trends'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={ Link }
          to='/action'
          name='Movies'
          active={activeItem === 'movies'}
          onClick={this.handleItemClick}
        />
        <Menu.Item
          as={ Link }
          to='/about'
          name='About'
          active={activeItem === 'about'}
          onClick={this.handleItemClick}
        />
      </Menu>
    )
  }
}

const ColorInvertedMenu = () => {
  const menus = colors.map((color) => <NavMenu color={color} key={color} />)

  return <div>{menus}</div>
}

export default ColorInvertedMenu
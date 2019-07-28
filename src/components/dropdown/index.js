import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'

import styles from './styles.scss'

const DEFAULT_PLACEHOLDER_STRING = 'Select...'

class Dropdown extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: this.parseValue(props.value, props.options) || {
        label: typeof props.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : props.placeholder,
        value: ''
      },
      isOpen: false
    }
    this.mounted = true
    this.handleDocumentClick = this.handleDocumentClick.bind(this)
    this.fireChangeEvent = this.fireChangeEvent.bind(this)
  }

  componentWillReceiveProps (newProps) {
    if (newProps.value) {
      var selected = this.parseValue(newProps.value, newProps.options)
      if (selected !== this.state.selected) {
        this.setState({selected: selected})
      }
    } else {
      this.setState({selected: {
        label: typeof newProps.placeholder === 'undefined' ? DEFAULT_PLACEHOLDER_STRING : newProps.placeholder,
        value: ''
      }})
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false)
    document.addEventListener('touchend', this.handleDocumentClick, false)
  }

  componentWillUnmount () {
    this.mounted = false
    document.removeEventListener('click', this.handleDocumentClick, false)
    document.removeEventListener('touchend', this.handleDocumentClick, false)
  }

  handleMouseDown (event) {
    if (this.props.onFocus && typeof this.props.onFocus === 'function') {
      this.props.onFocus(this.state.isOpen)
    }
    if (event.type === 'mousedown' && event.button !== 0) return

    if (!this.props.disabled) {
      this.setState({
        isOpen: !this.state.isOpen
      })
    }
  }

  parseValue (value, options) {
    let option

    if (typeof value === 'string') {
      for (var i = 0, num = options.length; i < num; i++) {
        if (options[i].type === 'group') {
          const match = options[i].items.filter(item => item.value === value)
          if (match.length) {
            option = match[0]
          }
        } else if (typeof options[i].value !== 'undefined' && options[i].value === value) {
          option = options[i]
        }
      }
    }

    return option || value
  }

  setValue (value, label) {
    let newState = {
      selected: {
        value,
        label},
      isOpen: false
    }
    this.fireChangeEvent(newState)
    this.setState(newState)
  }

  fireChangeEvent (option) {
    this.props.onChange(option)
  }

  renderOption (option) {
    const { renderOption, onOptionClicked } = this.props; 
    let value = option.value
    if (typeof value === 'undefined') {
      value = option.label || option
    }
    let label = option.label || option.value || option
    let isSelected = value === this.state.selected.value || value === this.state.selected

    const classes = {
      [styles[`${this.props.baseClassName}-option`]]: true,
      [styles[option.className]]: !!option.className,
      [styles['is-selected']]: isSelected
    }

    const optionClass = classNames(classes)

    return (
      <div
        key={value}
        className={optionClass}
        onMouseDown={this.fireChangeEvent.bind(this, option)}
        onClick={this.fireChangeEvent.bind(this, option)}
        role='option'
        aria-selected={isSelected ? 'true' : 'false'}>
        {renderOption ? renderOption(option) : label}
      </div>
    )
  }

  buildMenu () {
    let { options, baseClassName } = this.props
    let ops = options.map((option) => {
      if (option.type === 'group') {
        let groupTitle = (<div className={styles[`${baseClassName}-title`]}>
          {option.name}
        </div>)
        let _options = option.items.map((item) => this.renderOption(item))

        return (
          <div className={styles[`${baseClassName}-group`]} key={option.name} role='listbox' tabIndex='-1'>
            {groupTitle}
            {_options}
          </div>
        )
      } else {
        return this.renderOption(option)
      }
    })

    return ops.length ? ops : <div className={styles[`${baseClassName}-noresults`]}>
                                No options found
    </div>
  }

  handleDocumentClick (event) {
    if (this.mounted) {
      if (!ReactDOM.findDOMNode(this).contains(event.target)) {
        if (this.state.isOpen) {
          this.setState({ isOpen: false })
        }
      }
    }
  }

  isValueSelected () {
    return typeof this.state.selected === 'string' || this.state.selected.value !== ''
  }

  render () {
    const {
      baseClassName,
      controlClassName,
      placeholderClassName,
      menuClassName,
      arrowClassName,
      arrowClosed,
      arrowOpen,
      className,
      inputProps,
      showArrow
    } = this.props

    const disabledClass = this.props.disabled ? styles['Dropdown-disabled'] : ''
    const placeHolderValue = typeof this.state.selected === 'string' ? this.state.selected : this.state.selected.label

    const dropdownClass = classNames({
      [styles[`${baseClassName}-root`]]: true,
      [styles[className]]: !!className,
      [styles['is-open']]: this.state.isOpen
    })
    const controlClass = classNames({
      [styles[`${baseClassName}-control`]]: true,
      [styles[controlClassName]]: !!controlClassName,
      [styles[disabledClass]]: !!disabledClass
    })
    const placeholderClass = classNames({
      [styles[`${baseClassName}-placeholder`]]: true,
      [styles[placeholderClassName]]: !!placeholderClassName,
      [styles['is-selected']]: this.isValueSelected()
    })
    const menuClass = classNames({
      [styles[`${baseClassName}-menu`]]: true,
      [styles[menuClassName]]: !!menuClassName
    })
    const arrowClass = classNames({
      [styles[`${baseClassName}-arrow`]]: true,
      [styles[arrowClassName]]: !!arrowClassName
    })

    const menu = this.state.isOpen ? <div className={menuClass} aria-expanded='true'>
      {this.buildMenu()}
    </div> : null

    return (
      <div className={dropdownClass}>
        <div className={controlClass} onMouseDown={this.handleMouseDown.bind(this)} onTouchEnd={this.handleMouseDown.bind(this)} aria-haspopup='listbox'>
          <input
            className={styles['input']}
            {...inputProps}
          />
          {showArrow && <div className={styles[`${baseClassName}-arrow-wrapper`]}>
            {arrowOpen && arrowClosed
              ? this.state.isOpen ? arrowOpen : arrowClosed
              : <span className={arrowClass} />}
          </div>}
        </div>
        {menu}
      </div>
    )
  }
}

Dropdown.defaultProps = { baseClassName: 'Dropdown', showArrow: false }
export default Dropdown
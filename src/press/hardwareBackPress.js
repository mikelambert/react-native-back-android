// core
import React, { PropTypes, Component } from 'react'
// utils
import isAndroid from '../utils/isAndroid.js'

export default function hardwareBackPress (MyComponent, statelessHandler) {
  if (isAndroid()) {
    return class EnhancedComponent extends Component {
      static contextTypes = {
        backAndroid: PropTypes.object
      };
      handleStatelessHandler = () => {
        return statelessHandler(this.props)
      };
      componentDidMount () {
        const { backAndroid } = this.context
        if (statelessHandler) {
          backAndroid.onHardwareBackPress(this.handleStatelessHandler)
        } else if (this.refs.component.handleHardwareBackPress) {
          backAndroid.onHardwareBackPress(this.refs.component.handleHardwareBackPress)
        }
      }
      componentWillUnmount () {
        const { backAndroid } = this.context
        if (statelessHandler) {
          backAndroid.offHardwareBackPress(this.handleStatelessHandler)
        } else if (this.refs.component.handleHardwareBackPress) {
          backAndroid.offHardwareBackPress(this.refs.component.handleHardwareBackPress)
        }
      }
      render () {
        if (statelessHandler) {
          return (
            <MyComponent
              {...this.props}
            />
          )
        }
        return (
          <MyComponent
            ref='component'
            {...this.props}
          />
        )
      }
    }
  }
  return MyComponent
}

import React from 'react'
import { AntdField, FormItemWrapper } from '..'
import { shallow, render, mount } from 'enzyme'
import expect from 'expect'

describe('<AntdField />', () => {
  it('should inject component prop to formik <Field/> component', () => {
    const wrapper = shallow(<AntdField sampleProps="sampleValue" />)
    expect(
      wrapper.prop('component')
    )
    .toBeTruthy()
  })
})

describe('<FormItemWrapper />', () => {
  const injectedFormikProps = {
    field: {
      name: 'id',
      value: '',
      onChange: () => {},
      onBlur: () => {},
    },
    form: {
      touched: {},
      errors: {},
    },
  }

  it('should render hidden <Input /> when prop "hidden" is present', () => {
    const wrapper = shallow(<FormItemWrapper {...injectedFormikProps} hidden />)
    expect(
      wrapper.find('Input').prop('type')
    ).toEqual('hidden');
  })

  it('should inject onChange, if it is provided', () => {
    let randomFunction = () => { console.log('HelloKitty') }
    const wrapper = shallow(<FormItemWrapper {...injectedFormikProps} onChange={randomFunction} />)
    expect(
      wrapper.find('Input').prop('onChange')
    ).toEqual(randomFunction)
  })

  it('should inject onBlur, if it is provided', () => {
    let randomFunction = () => { console.log('Kitty, hi!') }
    const wrapper = shallow(<FormItemWrapper {...injectedFormikProps} onBlur={randomFunction} />)
    expect(
      wrapper.find('Input').prop('onBlur')
    ).toEqual(randomFunction)
  })
})
import React from 'react'
import { Field } from 'formik'

import { Input, Form } from 'antd'

const FormItem = Form.Item

export const FormItemWrapper = ({
  field,
  form: { touched, errors },
  element = <Input />,
  required,
  hidden,
  label,
  layout,
  onChange: _onChange,
  onBlur: _onBlur,
}) => {
  if (hidden) {
    // Hidden input
    return <Input {...field} type="hidden" />
  }
  // Inject formik props + override handlers if provided.
  const withCustomHandlers = {
    ...field,
    onChange: _onChange ? _onChange : field.onChange,
    onBlur: _onBlur ? _onBlur : field.onBlur,
  }
  const WithProps = React.cloneElement(element, { ...withCustomHandlers })
  const errorMsg = touched[field.name] && errors[field.name]
  return (
    <FormItem help={errorMsg} validateStatus={errorMsg ? 'error' : ''} label={label} {...layout} required={required}>
      {WithProps}
    </FormItem>
  )
}

export const AntdField = props => <Field {...props} component={FormItemWrapper} />

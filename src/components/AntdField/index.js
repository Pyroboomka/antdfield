import React from 'react'
import { Field, getIn } from 'formik'
import { Input, Form } from 'antd'

export const FormItemWrapper = ({
  field,
  form: { touched, errors },
  element = <Input />,
  hidden,
  layout,
  onChange: _onChange,
  onBlur: _onBlur,
  ...rest
}) => {
  if (hidden) return <Input {...field} type="hidden" />
  /* Override Formik handlers, if custom ones were provided */
  const withCustomHandlers = {
    ...field,
    onChange: _onChange ? _onChange : field.onChange,
    onBlur: _onBlur ? _onBlur : field.onBlur,
  }
  /* Inject these into passed element */
  const withFormikProps = React.cloneElement(element, { ...withCustomHandlers })
  /* Compose props for Form.Item */
  const help = getIn(touched, field.name) && getIn(errors, field.name)
  const formItemProps = {
    help,
    validateStatus: help ? 'error': '',
    ...layout,
    ...rest,
  }
  return (
    <Form.Item {...formItemProps}>
      {withFormikProps}
    </Form.Item>
  )
}

export const AntdField = props => <Field {...props} component={FormItemWrapper} />

import React from 'react'
import { Field } from 'formik'
import { Input, Form, Checkbox, Select, TreeSelect } from 'antd'

const FormItem = Form.Item
const CheckboxGroup = Checkbox.Group

/**
 * To support default antd behavior with key/value, leave this ternary here.
 */
const getSelectOption = ({ key, value, title }) => (
  <Select.Option key={key ? String(key) : String(value)} title={title || value}>
    {title}
  </Select.Option>
)

export const FormItemWrapper = ({
  field,
  form: { touched, errors, setFieldValue, setFieldTouched },
  element = <Input />,
  required,
  hidden,
  label,
  layout,
  options,
  title,
  onChange: _onChange,
  onBlur: _onBlur,
}) => {
  let jsx = element
  if (hidden) {
    // Hidden input
    return <Input {...field} type="hidden" />
  }
  // Support default elements of antd
  if (element === 'select') {
    jsx = (
      <Select>
        {options.map(getSelectOption)}
      </Select>
    )
    _onChange = (value, option) => setFieldValue(field.name, value)
  }
  if (element === 'checkbox') {
    jsx = (
      <Checkbox checked={field.value}>
        {title}
      </Checkbox>
    )
  }
  if (element === 'checkboxGroup') {
    jsx = (<CheckboxGroup options={options}/>)
    _onChange = (values) => setFieldValue(field.name, values)
  }
  // Inject formik props + override handlers if provided.
  const withCustomHandlers = {
    ...field,
    onChange: _onChange ? _onChange : field.onChange,
    onBlur: _onBlur ? _onBlur : field.onBlur,
  }
  const WithProps = React.cloneElement(jsx, { ...withCustomHandlers })
  const errorMsg = touched[field.name] && errors[field.name]
  return (
    <FormItem required={required} help={errorMsg} validateStatus={errorMsg ? 'error' : ''} label={label} {...layout} >
      {WithProps}
    </FormItem>
  )
}

export const AntdField = props => <Field {...props} component={FormItemWrapper} />

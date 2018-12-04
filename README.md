This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Why?
Because formik is nice, and I got tired of rc-form.
### How?
See storybook or example code
### API
| Prop | Description | Type | Default | Required |
|----------|-------------------------------------------------------------------------------|---------------------------------------------------|------------|----------|
| name | Field in your form | string |  | true |
| element | Element, which will be used to get user input | ReactNode | \<Input /> |  |
| onChange | custom onChange handler | function |  |  |
| onBlur | custom onBlur handler | function |  |  |
| hidden | render hidden input. useful for things like ids | Boolean | false |  |
| label | Label text | string\|ReactNode |  |  |
| layout | customize layout of Form.Item. Will be spread as wrapperCol and labelCol prop | [Object](https://ant.design/components/grid/#Col) |  |  |
| required |add a required asterisk. purely visual! | | | |

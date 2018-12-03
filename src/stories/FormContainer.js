import React from 'react';
import { Button } from 'antd'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import 'antd/dist/antd.css';

class Form extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', width: '400px', margin: '0 auto', flexDirection: 'column' }}>
        <h3>Sample Form</h3>
        {this.props.children}
        <Button onClick={this.props.handleSubmit} htmlType="submit">Submit</Button>
      </div>
    )
  }
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
})

const enhance = withFormik({
  validationSchema,
  mapPropsToValues: (props) => ({
    ...props.movie,
  }),
  handleSubmit: (values, form) => {
    form.props.formSubmitAction(values)
    // alert(`Values: ${JSON.stringify(values)}`);
  }
})

export default enhance(Form)

import React from 'react';
import { Button } from 'antd'
import { withFormik } from 'formik'
import { AntdField } from '../AntdField'
import * as Yup from 'yup'

class Form extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', width: '400px', margin: '0 auto', flexDirection: 'column' }}>
        <h3>Form title</h3>
          <AntdField
            required
            name="title"
            label="Movie title"
          />
          <Button onClick={this.props.handleSubmit} htmlType="submit">Submit</Button>
      </div>
    )
  }
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Please enter movie title')
})

const enhance = withFormik({
  validationSchema,
  mapPropsToValues: (props) => ({
    ...props.movie,
  }),
  handleSubmit: (values) => {
    alert(`Values: ${JSON.stringify(values)}`);
  }
})

export default enhance(Form)

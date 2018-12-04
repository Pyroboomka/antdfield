import React from 'react';
import { Button } from 'antd'
import { withFormik } from 'formik'
import 'antd/dist/antd.css';

class Form extends React.Component {
  render() {
    // Binding onChange and render for demonstration purposes.
    const { children } = this.props
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { 
        onChange: child.props.onChange && child.props.onChange.bind(this), 
        render: child.props.render && child.props.render.bind(this) })
    );
    return (
      <div style={{ display: 'flex', width: '400px', margin: '0 auto', flexDirection: 'column' }}>
        <h3>Marvelous form</h3>
        {childrenWithProps}
        <Button style={{ marginTop: '16px'}} onClick={this.props.handleSubmit} htmlType="submit">Submit</Button>
      </div>
    )
  }
}
const enhance = withFormik({
  mapPropsToValues: (props) => ({
    ...props.movie,
  }),
  handleSubmit: (values, form) => {
    alert(`Values: ${JSON.stringify(values)}`);
  }
})

export default enhance(Form)

import React from 'react'
import { Button, Input, DatePicker, InputNumber } from 'antd'
import { withFormik, FieldArray } from 'formik'
import { AntdField } from '../components/AntdField'
import * as Yup from 'yup'
import styled from 'styled-components'
import 'antd/dist/antd.css'

const FormWrapper = styled.div`
  display: flex;
  width: 400px;
  margin: 0 auto;
  flex-direction: column;
`

const LineWrapper = styled.div`
  display: flex;
  flex: 1;
`

const ElementWrapper = styled.div`
  display: flex;
  flex: 1;
`

const Model = styled.div`
  display: flex;
  flex: 6;
`
const MaxSpeed = styled.div`
  display: flex;
  flex: 3;
`

const DeleteRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
`

const DATE_FORMAT = 'DD-MM-YYYY'

const ERROR_COLOR = '#f5222d'

const errorStyle = {
  color: ERROR_COLOR,
}

const CarsListErrors = ({ errors }) => {
  return typeof errors.cars === 'string' ? <LineWrapper style={errorStyle}>{errors.cars}</LineWrapper> : null
}

const CarForm = ({ car, index, setter }) => (
  <React.Fragment>
    <Model>
      <AntdField 
        name={`cars.${index}.model`}
        label="Model"
        required={index === 0} 
      />
    </Model>
    <MaxSpeed>
      <AntdField
        name={`cars.${index}.maxSpeed`}
        label="Maximum speed, km/h"
        element={<InputNumber />}
        required={index === 0}
        onChange={value => setter(`cars.${index}.maxSpeed`, value)}
      />
    </MaxSpeed>
  </React.Fragment>
)

class Form extends React.Component {
  render() {
    return (
      <FormWrapper>
        <h3>Avengers supporter application form</h3>
        <form onSubmit={this.props.handleSubmit}>
          <LineWrapper>
            <ElementWrapper>
              <AntdField name="firstName" label="First Name" required element={<Input style={{ width: '100%' }} />} />
            </ElementWrapper>

            <ElementWrapper>
              <AntdField name="lastName" label="Last Name" required element={<Input style={{ width: '100%' }} />} />
            </ElementWrapper>
          </LineWrapper>

          <LineWrapper>
            <ElementWrapper>
              <AntdField
                name="dateOfBirth"
                label="Date of Birth"
                required
                element={<DatePicker format={DATE_FORMAT} style={{ width: '100%' }} />}
                onChange={value => this.props.setFieldValue('dateOfBirth', value)}
                onBlur={() => this.props.setFieldTouched('dateOfBirth')}
              />
            </ElementWrapper>
          </LineWrapper>

          <LineWrapper>
            <ElementWrapper>
              <AntdField name="phoneNumber" label="Phone number" required element={<Input addonBefore="+7" />} />
            </ElementWrapper>
          </LineWrapper>

          <LineWrapper>
            <ElementWrapper>
              <AntdField name="email" label="Email" required element={<Input type="email" />} />
            </ElementWrapper>
          </LineWrapper>
          <FieldArray
            name="cars"
            render={arrayHelpers => {
              const { cars } = this.props.values
              return cars.length && cars.length > 0 ? (
                <Column>
                  <h3>Cars:</h3>
                  <CarsListErrors errors={this.props.errors} />
                  {cars.map((car, index) => (
                    <LineWrapper key={index}>
                      <CarForm car={car} index={index} setter={this.props.setFieldValue} />
                      <DeleteRow>
                        <Button shape="circle" icon="minus" onClick={() => arrayHelpers.remove(index)} />
                      </DeleteRow>
                    </LineWrapper>
                  ))}
                  <LineWrapper>
                    <Button
                      style={{ width: '100%' }}
                      type="primary"
                      onClick={() => {
                        arrayHelpers.push({ model: '', maxSpeed: 0 })
                      }}
                    >
                      Add another car.
                    </Button>
                  </LineWrapper>
                </Column>
              ) : (
                <LineWrapper>
                  <Button
                    style={{ width: '100%' }}
                    type="primary"
                    onClick={() => {
                      arrayHelpers.push({ model: '', maxSpeed: 0 })
                    }}
                  >
                    Add your car.
                  </Button>
                </LineWrapper>
              )
            }}
          />
          <Button style={{ marginTop: '16px' }} htmlType="submit" onClick={this.props.handleSubmit}>
            Submit
          </Button>
        </form>
      </FormWrapper>
    )
  }
}

const enhance = withFormik({
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
    phoneNumber: Yup.string()
      .required('Please enter your phone number')
      .test('phone', 'This is not a valid phone number', value => value && value.length >= 10),
    email: Yup.string()
      .required('Please enter your contact email')
      .email('This is not a valid email address'),
    cars: Yup.array()
      .of(
        Yup.object().shape({
          model: Yup.string().required('Please enter model name'),
          maxSpeed: Yup.number()
            .required('Please enter the maximum speed')
            .min(120, 'Too slow'),
        })
      )
      .min(2, 'At least two cars should be listed'),
  }),
  mapPropsToValues: props => ({
    // Adding an applicant model here...
    firstName: '',
    lastName: '',
    phoneNumber: '',
    dateOfBirth: null,
    email: '',
    cars: [{ model: '', maxSpeed: 0 }],
  }),
  handleSubmit: (values, form) => {
    alert(`Values: ${JSON.stringify(values)}`)
  },
})

export default enhance(Form)

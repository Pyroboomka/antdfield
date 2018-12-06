import React from 'react'
import { storiesOf } from '@storybook/react'
import { AntdField } from '../components/AntdField'
import { FieldArray } from 'formik'
import { Select, Input, Button } from 'antd'
/**
 * Form Wrapper to show that stuff actually works.
 */
import FormContainer from './FormContainer'
import SampleForm from './SampleForm';

// { skip: 1 } to disable form JSX.
storiesOf('AntdField', module)
  .addWithJSX(
    'Default input',
    () => (
      <FormContainer movie={{ title: 'The Avengers' }}>
        <AntdField label="Input" name="title" required />
      </FormContainer>
    ),
    { skip: 1 }
  )
  .addWithJSX(
    'Hidden value',
    () => (
      <FormContainer movie={{ title: "Can not see me, but I'm present" }}>
        <AntdField name="title" hidden />
      </FormContainer>
    ),
    { skip: 1 }
  )
  .addWithJSX(
    'Custom element',
    () => (
      <FormContainer movie={{ movie: 'aac' }}>
        <AntdField
          name="movie"
          label="Select your favourite Marvel movie"
          element={
            <Select style={{ width: '100%' }}>
              <Select.Option key="aaa" title="The Avengers">
                {'The Avengers'}
              </Select.Option>
              <Select.Option key="aab" title="The Iron Man">
                {'The Iron Man'}
              </Select.Option>
              <Select.Option key="aac" title="Spider Man">
                {'Spider Man'}
              </Select.Option>
            </Select>
          }
          // This won't work, since I'm rebinding onChange for storybook purposes in FormContainer.
          // onChange={(value) => { this.props.setFieldValue('movie', value) }}
          onChange={function(value) {
            this.props.setFieldValue('movie', value)
          }}
        />
      </FormContainer>
    ),
    { skip: 1 }
  )
  .addWithJSX(
    'Array Fields',
    () => (
      <FormContainer movie={{ movies: [{ title: 'Iron Man' }, { title: 'Thor' }, { title: 'Doctor Strange' }] }}>
        <FieldArray
          name="movies"
          label="Fill your favourite Marvel movies"
          // Same, you can use arrow function in actual code.
          render={function(arrayHelpers) {
            const { movies } = this.props.values
            return movies.length && movies.length > 0 ? (
              <div>
                {movies.map((movie, index) => (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AntdField label="Movie title" name={`movies[${index}].title`} element={<Input />} />
                    <Button shape="circle" icon="minus" onClick={() => arrayHelpers.remove(index)} />
                  </div>
                ))}
                <Button type="primary" onClick={() => { arrayHelpers.push({ title: '' }) }}>
                  Add a movie.
                </Button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button type="submit" onClick={() => {arrayHelpers.push({ title: '' }) }}>
                  Add a movie.
                </Button>
              </div>
            )
          }}
        />
      </FormContainer>
    ),
    { skip: 1 }
  )

storiesOf('Example Form', module)
  .addWithJSX('Avengers supported application', () => <SampleForm />)

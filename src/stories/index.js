import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { AntdField } from '../components/AntdField'
/**
 * Form Wrapper to show that stuff actually works.
 */
import FormContainer from './FormContainer'

const formSubmitAction = action('onClick')
// { skip: 1 } to disable form JSX.
storiesOf('AntdField', module)
  .addWithJSX(
    'Default input',
    () => (
      <FormContainer movie={{ title: 'The Avengers' }} formSubmitAction={formSubmitAction}>
        <AntdField label="Input" name="title" required />
      </FormContainer>
    ),
    { skip: 1 }
  )
  .addWithJSX(
    'Hidden value',
    () => (
      <FormContainer movie={{ title: 'The Avengers' }} formSubmitAction={formSubmitAction}>
        <AntdField name="title" hidden />
      </FormContainer>
    ),
    { skip: 1 }
  )
  .addWithJSX(
    'Select',
    () => (
      <FormContainer movie={{ movie: 'aac' }} formSubmitAction={formSubmitAction}>
        <AntdField
          name="movie"
          label="Select a movie"
          element="select"
          options={[
            { value: 'aab', title: 'The Avengers' },
            { value: 'aac', title: 'The Iron Man' },
            { value: 'aad', title: 'Spider Man' },
          ]}
        />
      </FormContainer>
    ),
    { skip: 1 }
  )
  .addWithJSX(
    'Checkbox',
    () => (
      <FormContainer movie={{ hasSurvived: true }} formSubmitAction={formSubmitAction}>
        <AntdField name="hasSurvived" element="checkbox" title={'Have your survived Thanos purge?'} />
      </FormContainer>
    ),
    { skip: 1 }
  )
  .addWithJSX(
    'Checkbox Group',
    () => (
      <FormContainer movie={{ listOfOptions: ['Or me'] }} formSubmitAction={formSubmitAction}>
        <AntdField name="listOfOptions" element="checkboxGroup" options={['Tick me', 'Or me', 'Just tick me already!']} />
      </FormContainer>
    ),
    { skip: 1 }
  )

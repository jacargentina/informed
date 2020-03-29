import React, {useState, useEffect} from 'react';
import withDocs from '../../utils/withDocs';
import readme from './README.md';
import FormState from '../../utils/FormState';

import { Form, Text } from '../../../src';

const Basic = () => {
  const [initial, setInitial] = useState({name: 'hello1'});

  useEffect(()=> {
    setTimeout(() => {
      setInitial({name: 'hello2'});
    }, 2000);
  },[]);

  return <div>
    <p><i>First name</i> should be <strong>{initial.name}</strong></p>
    <Form id="basic-form" initialValues={initial}>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, marginRight: '2rem' }}>
          <label>
            First name:
            <Text field="name" />
          </label>
          <button type="submit">Submit</button>
        </div>
        <div style={{ flex: 2, minWidth: '300px' }}>
          <FormState />
        </div>
      </div>
    </Form>
  </div>
};

export default withDocs(readme, Basic);

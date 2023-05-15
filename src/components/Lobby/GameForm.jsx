import React from 'react';
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import '../../css/lobby/form.css';
import { useNavigate } from 'react-router-dom';
import { modeMap } from '../../api/utilities/utilities';

function GameForm() {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // prevent default form submission behavior
    const formData = new FormData(event.target); // create a new FormData object from the event target
    const size = formData.get('size');
    const mode = formData.get('mode');
    console.log('Form values:', size, mode);
    // do something with the form values, e.g. make an API request
    
    //set these items in local storage for the duration of the page
    sessionStorage.setItem('n', size);
    sessionStorage.setItem('mode', modeMap.get(mode));

    navigate(`/game`)
  };

  return (
    <Form onSubmit={handleSubmit} className={'my-btsrp-form'}>
      <FormGroup>
        <FormLabel>Please enter the size nxn preference for your board: <strong> [8 is standard] </strong> </FormLabel>
        <FormControl type="number" name="size" placeholder="Enter size" defaultValue={8}/>
      </FormGroup>
      <FormGroup>
        <FormLabel>Select game mode:</FormLabel>
        <FormControl as="select" name="mode">
          <option value="player-vs-player"> player vs player</option>
          <option value="player-vs-simple-ai"> player vs simple ai</option>
        </FormControl>
      </FormGroup>
      <div className='btn-container'>
        <Button type="submit" className='next-btn'>Next</Button>
      </div>
    </Form>
  );
}

export default GameForm;
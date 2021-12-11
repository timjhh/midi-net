import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
// onmidimessage
function Keyboard(props) {



  var devs = [];
  const [inputs, setInputs] = useState(null);
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState(null);
  const [note, setNote] = useState(null);


  useEffect(() => {

    navigator.requestMIDIAccess().then(midiSuccess);


    function midiSuccess(access) {

      access.inputs.forEach(d => {
        devs.push(d);
        d.onmidimessage = handleMessage;
        setDevice(d);
      });

    }

    function handleMessage(data) {
      setStatus(data.data);
      if(parseInt(data.data) != 248 && parseInt(data.data) != 254) {
        console.log(data.data);
        console.log(parseMsg(parseInt(data.data)))
      }
      //let decoded = new TextDecoder().decode(data.data);
      //console.log(decoded)
      let msg = parseMsg(parseInt(status));
      if(msg != "none" && msg != "timer") console.log(msg);
      if(msg === 'noteon') {
        console.log(msg);
        setNote(status[1]);
        console.log(status[1]);
      }
    }
  }, [])

  function parseMsg(data) {

    let msg = data;

    switch(msg) {


      case 0x80:
        return "noteoff"; // [key #, velocity]
      case 0x90:
        return "noteon"; // [key #, velocity]
      case 0xA0:
        return "keypressure"; // [key #, pressure]
      case 0xB0:
        return "controlchange"; // [controller #, controller value]
      case 0xC0:
        return "programnumber"; // [program #]
      case 0xD0:
        return "channelpressure"; // [pressure value]        
      case 0xE0:
        return "pitchbend"; // [MSB, LSB]
      case 0xF8:
        return "timer";
    }
    return "none";


  }


  return (
    <div className="">
      {device && 
        <p>{device.name}</p>
      }
      {status &&
        <p>{parseMsg(status) === 'noteon' ? status[1] : 'no msg'}</p>
      }
      {note &&
        <p>{note}</p>
      }
    </div>
  );
}

export default Keyboard;

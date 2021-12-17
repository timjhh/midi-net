import React, { useEffect, useState } from 'react';
import Keyboard from "./Keyboard.jsx";



function Controller(props) {

  var devs = [];
  const [inputs, setInputs] = useState(null);
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState(null);
  const [action, setAction] = useState(null);


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
        let msg = parseMsg(parseInt(data.data));
        //console.log(parseMsg(parseInt(data.data)));
        console.log(msg);
        setAction(parseMsg(parseInt(data.data)));
      }

      //let decoded = new TextDecoder().decode(data.data);

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

      <Keyboard device={device} />

    </div>
  );
}

export default Controller;
import React, { useEffect, useState } from 'react';
import './App.css';
import Key from "./Key.jsx";
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
import 'react-piano/dist/styles.css';

import * as d3 from 'd3';

const NOTES = ["C", "D", "E", "F", "G", "A", "B"];
const width = window.innerWidth;
const height = window.innerHeight/6;
const margin = {top: 20, right: 20, bottom: 20, left: 20};

// onmidimessage
function Keyboard(props) {

  // 16 - e0
  // 28 - lowest key on keyboard
  const firstNote = MidiNumbers.fromNote('e0');
  const lastNote = MidiNumbers.fromNote('c8');


  var devs = [];
  const [inputs, setInputs] = useState(null);
  const [device, setDevice] = useState(null);
  const [status, setStatus] = useState(null);
  const [action, setAction] = useState(null);


  useEffect(() => {

    const svg = d3.select("#kbd")
    .append("svg")
    .attr("width",width)
    .attr("height",height)
    .append("g")
    .attr("transform",
      "translate(" + 0 + "," + height + ")");


    svg.append("rect")
    .attr("width", width)
    .attr("height", 200)
    .attr("class", "bar")
    .attr("stroke", "black")
    .attr("color", "white")
    .attr("fill", "white");

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
    <>
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber) => {
        // Play a given note - see notes below
      }}
      stopNote={(midiNumber) => {
        return 28;
      }}
      width={1000}

    />

    <div id="kbd">

      {props.device && 
        <p>{props.device.name}</p>
      }
      {status &&
        <p>{parseMsg(status) === 'noteon' ? status[1] : 'no msg'}</p>
      }
      {action &&
        <p>{action}</p>
      }

      <Key num={("key"+0).toString()} />

    </div>
    </>
  );
}

export default Keyboard;

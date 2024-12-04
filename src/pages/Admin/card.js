import React from 'react';
import './card.css';

const CASES = [
  {
    title: 'Lab and PC Management',
    blurb: 'Add, edit, and monitor data for all labs and their associated PCs.',
  },
  {
    title: 'Faculty Management',
    blurb: 'Maintain an organized database of faculty members and their details.',
  },
  {
    title: 'Daily Reports',
    blurb: 'Generate and review comprehensive daily reports to keep track of activities and resources.',
  },
  {
    title: 'Session Management',
    blurb: 'Create sessions for attendance tracking during specific timeframes as needed.',
  },
];

function CaseGrid() {
  return (
    <div className='division'>
    <div className="grid-container">
      {CASES.map((item, index) => (
        <div key={index} className="card_c">
          <div className="card-content">
            <h3 className="card-title">{item.title}</h3>
            <p className="card-blurb">{item.blurb}</p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default CaseGrid;

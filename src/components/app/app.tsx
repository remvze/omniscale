import { Container } from '../container';

import { Timeline } from '../timeline';

interface TimelineEvent {
  label: string;
  year: number;
}

const humanTimeline: Array<TimelineEvent> = [
  {
    label: 'Today',
    year: 2024,
  },
  {
    label: 'COVID-19 Pandemic',
    year: 2020,
  },
  {
    label: 'Human Genome Project Completed',
    year: 2003,
  },
  {
    label: 'Fall of the Berlin Wall',
    year: 1989,
  },
  {
    label: 'Invention of the Internet',
    year: 1969,
  },
  {
    label: 'First Human on the Moon (Apollo 11)',
    year: 1969,
  },
  {
    label: 'Discovery of DNA Structure',
    year: 1953,
  },
  {
    label: 'Founding of the United Nations',
    year: 1945,
  },
  {
    label: 'World War II Ends',
    year: 1945,
  },
  {
    label: 'World War I Ends',
    year: 1918,
  },
  {
    label: 'Russian Revolution',
    year: 1917,
  },
  {
    label: 'Discovery of Penicillin',
    year: 1928,
  },
  {
    label: 'Invention of the Radio',
    year: 1895,
  },
  {
    label: 'First Flight by Wright Brothers',
    year: 1903,
  },
  {
    label: 'Invention of the Telephone',
    year: 1876,
  },
  {
    label: 'Electric Light Bulb Invented by Edison',
    year: 1879,
  },
  {
    label: 'American Civil War Ends',
    year: 1865,
  },
  {
    label: 'French Revolution',
    year: 1789,
  },
  {
    label: 'Signing of the Declaration of Independence',
    year: 1776,
  },
  {
    label: 'Industrial Revolution Begins',
    year: 1760,
  },
  {
    label: 'Discovery of Electricity by Benjamin Franklin',
    year: 1752,
  },
  {
    label: 'Scientific Revolution (Copernicus, Newton, Galileo)',
    year: 1543,
  },
  {
    label: 'Protestant Reformation',
    year: 1517,
  },
  {
    label: 'Renaissance Begins',
    year: 1300,
  },
  {
    label: 'Fall of Constantinople (End of Byzantine Empire)',
    year: 1453,
  },
  {
    label: 'Printing Press Invented by Gutenberg',
    year: 1440,
  },
  {
    label: 'Columbus Discovers Americas',
    year: 1492,
  },
  {
    label: 'Signing of the Magna Carta',
    year: 1215,
  },
  {
    label: 'Middle Ages Begin (Fall of Roman Empire)',
    year: 476,
  },
  {
    label: 'Islamic Golden Age',
    year: 800,
  },
  {
    label: 'Birth of Ancient Greek Civilization',
    year: -800,
  },
  {
    label: 'First Writing Systems (Sumerians)',
    year: -3400,
  },
  {
    label: 'First Human Civilization (Mesopotamia)',
    year: -4000,
  },
  {
    label: 'Stonehenge Construction',
    year: -3000,
  },
  {
    label: 'Agriculture Begins (Neolithic Revolution)',
    year: -10000,
  },
  {
    label: 'End of the Ice Age',
    year: -9600,
  },
  {
    label: 'Neanderthals Go Extinct',
    year: -40000,
  },
  {
    label: 'First Homo sapiens',
    year: -300000,
  },
];

export function App() {
  return (
    <Container>
      <Timeline
        events={humanTimeline}
        scale={0.1}
        scaleText="1 Year = 10 Pixels"
        title="Human Timeline"
      />
    </Container>
  );
}

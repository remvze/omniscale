import { Container } from '../container';

import { Timeline } from '../timeline';

interface TimelineEvent {
  label: string;
  year: number;
}

const timelineOne: Array<TimelineEvent> = [
  {
    label: 'Today',
    year: 0,
  },
  {
    label: 'Invention of the Internet',
    year: -50,
  },
  {
    label: 'First Human on the Moon (Apollo 11)',
    year: -55,
  },
  {
    label: 'World War II Ends',
    year: -79,
  },
  {
    label: 'World War I Ends',
    year: -106,
  },
  {
    label: 'First Flight by Wright Brothers',
    year: -120,
  },
  {
    label: 'Electric Light Bulb Invented by Edison',
    year: -145,
  },
  {
    label: 'American Civil War Ends',
    year: -159,
  },
  {
    label: 'Industrial Revolution Begins',
    year: -264,
  },
  {
    label: 'Discovery of Electricity by Benjamin Franklin',
    year: -272,
  },
  {
    label: 'Scientific Revolution (Copernicus, Newton, Galileo)',
    year: -424,
  },
  {
    label: 'Renaissance Begins',
    year: -724,
  },
  {
    label: 'Printing Press Invented by Gutenberg',
    year: -584,
  },
  {
    label: 'Columbus Discovers Americas',
    year: -532,
  },
  {
    label: 'Fall of Constantinople (End of Byzantine Empire)',
    year: -571,
  },
  {
    label: 'Middle Ages Begin (Fall of Roman Empire)',
    year: -1548,
  },
  {
    label: 'Islamic Golden Age',
    year: -1224,
  },
  {
    label: 'Birth of Ancient Greek Civilization',
    year: -2800,
  },
  {
    label: 'First Writing Systems (Sumerians)',
    year: -5424,
  },
  {
    label: 'First Human Civilization (Mesopotamia)',
    year: -6024,
  },
  {
    label: 'Stonehenge Construction',
    year: -5024,
  },
  {
    label: 'Agriculture Begins (Neolithic Revolution)',
    year: -12024,
  },
  {
    label: 'End of the Ice Age',
    year: -11700,
  },
];

const timelineTwo: Array<TimelineEvent> = [
  {
    label: 'Neanderthals Go Extinct',
    year: -40000,
  },
  {
    label: 'First Homo sapiens',
    year: -300000,
  },
  {
    label: 'Homo Erectus Emerges',
    year: -2000000,
  },
  {
    label: 'Dinosaurs Go Extinct (End of Cretaceous Period)',
    year: -66000000,
  },
  {
    label: 'First Flowering Plants',
    year: -140000000,
  },
  {
    label: 'First Birds Appear',
    year: -150000000,
  },
  {
    label: 'First Mammals Evolve',
    year: -200000000,
  },
  {
    label: 'Dinosaurs Dominate (Mesozoic Era)',
    year: -252000000,
  },
  {
    label: 'First Land Animals',
    year: -375000000,
  },
  {
    label: 'First Vertebrates Appear',
    year: -525000000,
  },
  {
    label: 'Cambrian Explosion (Rapid Diversity of Life)',
    year: -541000000,
  },
  {
    label: 'First Multicellular Life',
    year: -1000000000,
  },
  {
    label: 'First Single-Celled Life (Bacteria)',
    year: -3800000000,
  },
  {
    label: 'Earth Forms',
    year: -4500000000,
  },
  {
    label: 'Sun Forms',
    year: -4600000000,
  },
  {
    label: 'Big Bang (Universe Begins)',
    year: -13780000000,
  },
];

export function App() {
  return (
    <Container>
      <Timeline
        events={timelineOne}
        scale={0.25}
        scaleText="1 Year = 4 Pixels"
        title="First Timeline"
      />

      <Timeline
        events={timelineTwo}
        scale={10_000}
        scaleText="10,000 Years = 1 Pixel"
        title="Second Timeline"
      />
    </Container>
  );
}

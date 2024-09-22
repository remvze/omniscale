import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { cn } from '@/helpers/styles';
import { waitUntil } from '@/helpers/wait';
import { Container } from '../container';

import styles from './app.module.css';

interface Data {
  name: string;
  size: number;
  unit: string;
}

export function App() {
  const [visibleItems, setVisibleItems] = useState(1);

  const data: Array<Data> = [
    {
      name: 'Observable Universe',
      size: 93e9 * 9.461e15, // 93 billion light-years in meters
      unit: 'meters',
    },
    {
      name: 'Milky Way Galaxy',
      size: 100000 * 9.461e15, // 100,000 light-years in meters
      unit: 'meters',
    },
    {
      name: 'Solar System',
      size: 1.5e13, // ~1.5 x 10^13 meters
      unit: 'meters',
    },
    {
      name: 'Sun',
      size: 1.39e9, // ~1.39 million kilometers in meters
      unit: 'meters',
    },
    {
      name: 'Earth',
      size: 12742e3 / 2, // Radius in meters
      unit: 'meters',
    },
    {
      name: 'Mount Everest',
      size: 8.8e3, // 8.8 kilometers in meters
      unit: 'meters',
    },
    {
      name: 'Hill',
      size: 500, // 500 meters
      unit: 'meters',
    },
    {
      name: 'House',
      size: 10, // 10 meters
      unit: 'meters',
    },
    {
      name: 'Person',
      size: 2, // 2 meters
      unit: 'meters',
    },
    {
      name: 'Cell',
      size: 10e-6, // 10 micrometers in meters
      unit: 'meters',
    },
    {
      name: 'Molecule',
      size: 1e-9, // 1 nanometer in meters
      unit: 'meters',
    },
    {
      name: 'Atom',
      size: 1e-10, // 0.1 nanometers in meters
      unit: 'meters',
    },
    {
      name: 'Proton/Neutron',
      size: 1e-15, // 1 femtometer in meters
      unit: 'meters',
    },
    {
      name: 'Electron',
      size: 1e-18, // Effectively point-like
      unit: 'meters',
    },
  ];

  useEffect(() => {
    if (visibleItems < data.length) {
      const func = async () => {
        let newIndex = 0;
        setVisibleItems(prev => {
          newIndex = prev;

          return prev + 1;
        });

        await waitUntil(
          () => !!document.getElementById(`item-${newIndex}`),
          50,
        );

        document.getElementById(`item-${newIndex}`)?.scrollIntoView();
      };

      const timeout = setTimeout(func, 1500);

      return () => clearTimeout(timeout);
    }
  }, [visibleItems, data.length]);

  return (
    <Container>
      <div className={styles.proportions}>
        <AnimatePresence>
          {data.slice(0, visibleItems - 1).map((item, index) => (
            <Proportion
              bigger={item}
              index={index}
              key={index}
              smaller={data[index + 1]}
            />
          ))}
        </AnimatePresence>
      </div>
    </Container>
  );
}

function formatSize(sizeInMeters: number): string {
  if (sizeInMeters >= 9.461e15) {
    const lightYears = sizeInMeters / 9.461e15;
    return `${lightYears.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} light-years`;
  } else if (sizeInMeters >= 1e3) {
    const kilometers = sizeInMeters / 1e3;
    return `${kilometers.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} km`;
  } else if (sizeInMeters >= 1) {
    return `${sizeInMeters.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} meters`;
  } else if (sizeInMeters >= 1e-3) {
    const millimeters = sizeInMeters * 1e3;
    return `${millimeters.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} mm`;
  } else if (sizeInMeters >= 1e-6) {
    const micrometers = sizeInMeters * 1e6;
    return `${micrometers.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} µm`;
  } else if (sizeInMeters >= 1e-9) {
    const nanometers = sizeInMeters * 1e9;
    return `${nanometers.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} nm`;
  } else if (sizeInMeters >= 1e-12) {
    const picometers = sizeInMeters * 1e12;
    return `${picometers.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} pm`;
  } else if (sizeInMeters >= 1e-15) {
    const femtometers = sizeInMeters * 1e15;
    return `${femtometers.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} fm`;
  } else {
    return `${sizeInMeters.toLocaleString(undefined, {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    })} meters`;
  }
}

interface ProportionProps {
  bigger: Data;
  index: number;
  smaller: Data;
}

function Proportion({ bigger, index, smaller }: ProportionProps) {
  const percentage = (smaller.size / bigger.size) * 100;

  return (
    <motion.div
      animate={{ filter: 'blur(0)', opacity: 1, scale: 1 }}
      className={styles.proportion}
      id={`item-${index}`}
      initial={{ filter: 'blur(10px)', opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <p className={cn(styles.name, styles.biggerName)}>
        {bigger.name} <span>{formatSize(bigger.size)}</span>
      </p>
      <div className={styles.line}>
        <motion.div
          animate={{ width: `${percentage}%` }}
          className={styles.filled}
          initial={{ width: '100%' }}
          transition={{
            delay: 0.3,
            duration: 1,
            ease: 'easeInOut',
          }}
        />
      </div>
      <p className={cn(styles.name, styles.smallerName)}>
        <motion.span
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          % {parseFloat(percentage.toPrecision(1))}
        </motion.span>{' '}
        {smaller.name}
      </p>
    </motion.div>
  );
}

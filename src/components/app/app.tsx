import { Container } from '../container';

import styles from './app.module.css'; // We'll define styles here

type Data = {
  name: string;
  size: number;
  unit: string;
};

const data: Array<Data> = [
  {
    name: 'Observable Universe',
    size: 93e9 * 9.461e15, // 93 billion light-years in meters
    unit: 'meters',
  },
  {
    name: 'Laniakea Supercluster',
    size: 500e6 * 9.461e15, // 500 million light-years in meters
    unit: 'meters',
  },
  {
    name: 'Virgo Supercluster',
    size: 110e6 * 9.461e15, // 110 million light-years in meters
    unit: 'meters',
  },
  {
    name: 'Local Group',
    size: 10e6 * 9.461e15, // 10 million light-years in meters
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
    name: 'Jupiter',
    size: 139820e3 / 2, // Radius in meters
    unit: 'meters',
  },
  {
    name: 'Earth',
    size: 12742e3 / 2, // Radius in meters
    unit: 'meters',
  },
  {
    name: 'Moon',
    size: 3474.8e3 / 2, // Radius in meters
    unit: 'meters',
  },
  {
    name: 'Mount Everest',
    size: 8.8e3, // 8.8 kilometers in meters
    unit: 'meters',
  },
  {
    name: 'Blue Whale',
    size: 30, // 30 meters
    unit: 'meters',
  },
  {
    name: 'Human',
    size: 1.7, // Average human height in meters
    unit: 'meters',
  },
  {
    name: 'Ant',
    size: 5e-3, // 5 millimeters in meters
    unit: 'meters',
  },
  {
    name: 'Cell',
    size: 10e-6, // 10 micrometers in meters
    unit: 'meters',
  },
  {
    name: 'DNA',
    size: 2e-9, // 2 nanometers in meters
    unit: 'meters',
  },
  {
    name: 'Glucose Molecule',
    size: 0.9e-9, // 0.9 nanometers in meters
    unit: 'meters',
  },
  {
    name: 'Atom',
    size: 1e-10, // 0.1 nanometers in meters
    unit: 'meters',
  },
  {
    name: 'Proton',
    size: 1.6e-15, // 1.6 femtometers in meters
    unit: 'meters',
  },
  {
    name: 'Quark',
    size: 1e-19, // Approximate size
    unit: 'meters',
  },
];

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
    return `${sizeInMeters.toExponential(2)} meters`;
  }
}

export const App: React.FC = () => {
  // Calculate logarithms of sizes
  const logData = data.map(item => ({
    ...item,
    logSize: Math.log10(item.size),
  }));

  // Find min and max log sizes
  const logSizes = logData.map(item => item.logSize);
  const minLogSize = Math.min(...logSizes);
  const maxLogSize = Math.max(...logSizes);

  // Define the scale height in pixels
  const scaleHeight = 2400;

  // Generate major ticks at integer powers of ten within the range
  const minPower = Math.floor(minLogSize);
  const maxPower = Math.ceil(maxLogSize);

  const ticks = [];

  for (let i = maxPower; i >= minPower; i--) {
    ticks.push(i);
  }

  return (
    <Container>
      <div className={styles.scaleWrapper}>
        <div className={styles.scale} style={{ height: scaleHeight }}>
          {ticks.map(tick => {
            const position =
              ((maxLogSize - tick) / (maxLogSize - minLogSize)) * scaleHeight;

            return (
              <div className={styles.tick} key={tick} style={{ top: position }}>
                <div className={styles.tickLabel}>
                  10<sup>{tick}</sup> m
                </div>
                <div className={styles.tickLine} />
              </div>
            );
          })}

          {logData.map(item => {
            const position =
              ((maxLogSize - item.logSize) / (maxLogSize - minLogSize)) *
              scaleHeight;
            return (
              <div
                className={styles.dataPoint}
                key={item.name}
                style={{ top: position }}
                title={`${item.name}: ${item.size.toExponential(2)} ${item.unit}`}
              >
                <div className={styles.marker} />
                <div className={styles.label}>
                  {item.name} <span>({formatSize(item.size)})</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

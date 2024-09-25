import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

import { Container } from '../container';

import { cn } from '@/helpers/styles';

import styles from './app.module.css';

type Data = {
  name: string;
  size: number;
  unit: string;
};

function formatPercentage(num: number, significantDigits = 2) {
  if (num === 0) return '0%';

  const absNum = Math.abs(num);
  const exponent = Math.floor(Math.log10(absNum));
  const factor = Math.pow(10, exponent - significantDigits + 1);
  const truncatedNum = Math.floor(absNum / factor) * factor;
  const finalNum = num < 0 ? -truncatedNum : truncatedNum;

  let fixedStr = finalNum.toFixed(
    Math.max(0, -exponent + significantDigits - 1),
  );

  fixedStr = fixedStr.replace(/\.?0+$/, '');

  return `${fixedStr}%`;
}

function truncateMiddle(input: string, maxLength: number): string {
  if (input.length <= maxLength) {
    return input;
  }

  const ellipsis = '...';
  const ellipsisLength = ellipsis.length;

  if (maxLength <= ellipsisLength) {
    return ellipsis.substring(0, maxLength);
  }

  const charsToShow = maxLength - ellipsisLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const endChars = Math.floor(charsToShow / 2);

  const front = input.substring(0, frontChars);
  const end = input.substring(input.length - endChars);

  return front + ellipsis + end;
}

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
    size: 1.5e13, // Approximate diameter of the Solar System in meters
    unit: 'meters',
  },
  {
    name: 'Sun',
    size: 1.39e9, // Diameter of the Sun in meters
    unit: 'meters',
  },
  {
    name: 'Jupiter',
    size: 139820e3, // Diameter of Jupiter in meters
    unit: 'meters',
  },
  {
    name: 'Earth',
    size: 12742e3, // Diameter of Earth in meters
    unit: 'meters',
  },
  {
    name: 'Moon',
    size: 3474.8e3, // Diameter of the Moon in meters
    unit: 'meters',
  },
  {
    name: 'City',
    size: 50e3, // Approximate size of a large city in meters
    unit: 'meters',
  },
  {
    name: 'Mount Everest',
    size: 8.848e3, // Height of Mount Everest in meters
    unit: 'meters',
  },
  {
    name: 'Blue Whale',
    size: 30, // Approximate length of a blue whale in meters
    unit: 'meters',
  },
  {
    name: 'Human',
    size: 1.7, // Average human height in meters
    unit: 'meters',
  },
  {
    name: 'Grain of Rice',
    size: 7e-3, // 7 millimeters in meters
    unit: 'meters',
  },
  {
    name: 'Ant',
    size: 5e-3, // 5 millimeters in meters
    unit: 'meters',
  },
  {
    name: 'Human Hair',
    size: 75e-6, // 75 micrometers in meters
    unit: 'meters',
  },
  {
    name: 'Red Blood Cell',
    size: 8e-6, // 8 micrometers in meters
    unit: 'meters',
  },
  {
    name: 'Cell',
    size: 10e-6, // 10 micrometers in meters
    unit: 'meters',
  },
  {
    name: 'Virus',
    size: 100e-9, // 100 nanometers in meters
    unit: 'meters',
  },
  {
    name: 'DNA',
    size: 2e-9, // 2 nanometers in meters
    unit: 'meters',
  },
  {
    name: 'Water Molecule',
    size: 0.275e-9, // 0.275 nanometers in meters
    unit: 'meters',
  },
  {
    name: 'Glucose Molecule',
    size: 0.9e-9, // 0.9 nanometers in meters
    unit: 'meters',
  },
  {
    name: 'Carbon Atom',
    size: 70e-12, // 70 picometers in meters
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
    name: 'Neutrino',
    size: 1e-24, // Estimated upper limit of neutrino size in meters
    unit: 'meters',
  },
  {
    name: 'Quark',
    size: 1e-19, // Approximate size of a quark in meters
    unit: 'meters',
  },
  {
    name: 'Planck Length',
    size: 1.616e-35, // Planck length in meters
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
  const minLogSize = Math.floor(Math.min(...logSizes));
  const maxLogSize = Math.ceil(Math.max(...logSizes));

  // State to track expanded ranges
  const [expandedRanges, setExpandedRanges] = useState<
    Array<{ end: number; start: number }>
  >([]);

  // Generate major ticks at integer powers of ten within the range
  const ticks = [];
  for (let i = maxLogSize; i >= minLogSize; i--) {
    ticks.push(i);
  }

  // Define heights for intervals
  const defaultIntervalHeight = 75; // Height in pixels for non-expanded intervals
  const expandedIntervalHeight = 750; // Height in pixels for expanded intervals

  // Build intervals array
  const intervals: Array<{
    endTick: number;
    height: number;
    isExpanded: boolean;
    startTick: number;
  }> = [];

  for (let i = 0; i < ticks.length - 1; i++) {
    const startTick = ticks[i];
    const endTick = ticks[i + 1];

    const isExpanded = expandedRanges.some(
      range => range.start === startTick && range.end === endTick,
    );

    intervals.push({
      endTick,
      height: isExpanded ? expandedIntervalHeight : defaultIntervalHeight,
      isExpanded,
      startTick,
    });
  }

  // Calculate cumulative heights and total scale height
  const cumulativeHeights = [0]; // Start with zero at the top

  intervals.forEach((interval, index) => {
    cumulativeHeights.push(cumulativeHeights[index] + interval.height);
  });

  const scaleHeight = cumulativeHeights[cumulativeHeights.length - 1];

  // Map ticks to their positions
  const tickPositions: { [key: number]: number } = {};

  ticks.forEach((tick, index) => {
    tickPositions[tick] = cumulativeHeights[index];
  });

  // Helper function to generate minor ticks
  function minorTicksBetween(startTick: number, endTick: number) {
    const minorTicks = [];
    const step = 0.1;
    let t = startTick - step;
    while (t > endTick + 1e-6) {
      // adjust for floating point precision
      minorTicks.push(Number(t.toFixed(1)));
      t -= step;
    }
    return minorTicks;
  }

  const [firstSelectedItem, setFirstSelectedItem] = useState<Data | null>(null);
  const [secondSelectedItem, setSecondSelectedItem] = useState<Data | null>(
    null,
  );

  // Function to handle selection
  const handleItemClick = (item: Data) => {
    if (!firstSelectedItem) {
      setFirstSelectedItem(item);
    } else if (!secondSelectedItem && item.name === firstSelectedItem.name) {
      setFirstSelectedItem(null);
    } else if (!secondSelectedItem) {
      setSecondSelectedItem(item);
    } else {
      setFirstSelectedItem(item);
      setSecondSelectedItem(null);
    }
  };

  const calculateProportion = () => {
    if (firstSelectedItem && secondSelectedItem) {
      const size1 = firstSelectedItem.size;
      const size2 = secondSelectedItem.size;
      const min = Math.min(size1, size2);
      const max = Math.max(size1, size2);

      const percent = (min / max) * 100;

      return {
        largerItem: size1 >= size2 ? firstSelectedItem : secondSelectedItem,
        percent,
        smallerItem: size1 < size2 ? firstSelectedItem : secondSelectedItem,
      };
    }
    return null;
  };

  return (
    <Container>
      {firstSelectedItem && secondSelectedItem && (
        <div className={styles.proportionDisplay}>
          <button
            onClick={() => {
              setFirstSelectedItem(null);
              setSecondSelectedItem(null);
            }}
          >
            <IoIosClose />
          </button>

          <p className={cn(styles.text, styles.top)}>
            <span className={styles.label}>
              {calculateProportion()?.largerItem.name}
            </span>

            <span className={styles.num}>
              {formatSize(calculateProportion()?.largerItem.size as number)}
            </span>
          </p>

          <div className={styles.line}>
            <div
              className={styles.filled}
              style={{
                width: formatPercentage(
                  calculateProportion()?.percent as number,
                ),
              }}
            />
          </div>

          <p className={cn(styles.text, styles.bottom)}>
            <span
              className={styles.num}
              title={formatPercentage(calculateProportion()?.percent as number)}
            >
              {truncateMiddle(
                formatPercentage(calculateProportion()?.percent as number),
                28,
              )}
            </span>

            <span className={styles.label}>
              {calculateProportion()?.smallerItem.name}
            </span>
          </p>
        </div>
      )}

      <div className={styles.scaleWrapper}>
        <div className={styles.scale} style={{ height: scaleHeight }}>
          {/* Render major ticks */}
          {ticks.map(tick => {
            const position = tickPositions[tick];

            return (
              <div className={styles.tick} key={tick} style={{ top: position }}>
                <div className={styles.tickLabel}>
                  10<sup>{tick}</sup> m
                </div>
                <div className={styles.tickLine} />
              </div>
            );
          })}

          {/* Render intervals with expand buttons or minor ticks */}
          {intervals.map(interval => {
            const startPosition = tickPositions[interval.startTick];
            // const endPosition = tickPositions[interval.endTick];

            const intervalTop = startPosition;
            const intervalHeight = interval.height;

            const intervalMiddle = intervalTop + intervalHeight / 2;

            if (interval.isExpanded) {
              // Render minor ticks within the expanded interval
              const minorTicks = minorTicksBetween(
                interval.startTick,
                interval.endTick,
              );
              return minorTicks.map(minorTick => {
                const relativePosition =
                  ((interval.startTick - minorTick) /
                    (interval.startTick - interval.endTick)) *
                  intervalHeight;
                const position = intervalTop + relativePosition;

                return (
                  <div
                    className={styles.tick}
                    key={`minor-${minorTick}`}
                    style={{ top: position }}
                  >
                    <div className={styles.tickLabel}>
                      10<sup>{minorTick.toFixed(1)}</sup> m
                    </div>
                    <div className={styles.tickLine} />
                  </div>
                );
              });
            } else {
              // Render expand button
              return (
                <div
                  className={styles.expandButton}
                  key={`expand-${interval.startTick}-${interval.endTick}`}
                  style={{ top: intervalMiddle }}
                  onClick={() => {
                    setExpandedRanges([
                      ...expandedRanges,
                      { end: interval.endTick, start: interval.startTick },
                    ]);
                  }}
                >
                  +
                </div>
              );
            }
          })}

          {/* Render data points */}
          {logData.map(item => {
            // Find the interval where the data point falls
            let position = 0;
            for (let i = 0; i < intervals.length; i++) {
              const interval = intervals[i];
              if (
                item.logSize <= interval.startTick &&
                item.logSize >= interval.endTick
              ) {
                const relativePosition =
                  ((interval.startTick - item.logSize) /
                    (interval.startTick - interval.endTick)) *
                  interval.height;
                position = tickPositions[interval.startTick] + relativePosition;
                break;
              }
            }

            const isSelected =
              item.name === firstSelectedItem?.name ||
              item.name === secondSelectedItem?.name;

            return (
              <div
                key={item.name}
                style={{ top: position }}
                title={`${item.name}: ${item.size.toExponential(2)} ${item.unit}`}
                className={cn(
                  styles.dataPoint,
                  isSelected && styles.isSelected,
                )}
                onClick={() => handleItemClick(item)}
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

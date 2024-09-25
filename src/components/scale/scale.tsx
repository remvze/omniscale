import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

import { Container } from '../container';

import { cn } from '@/helpers/styles';
import { formatPercentage } from '@/helpers/number';
import { truncateMiddle } from '@/helpers/string';
import { formatSize } from '@/data/size';

import { data, type Data } from '@/data/objects';

import styles from './scale.module.css';

export function Scale() {
  const logData = data.map(item => ({
    ...item,
    logSize: Math.log10(item.size),
  }));

  const logSizes = logData.map(item => item.logSize);
  const minLogSize = Math.floor(Math.min(...logSizes));
  const maxLogSize = Math.ceil(Math.max(...logSizes));

  const [expandedRanges, setExpandedRanges] = useState<
    Array<{ end: number; start: number }>
  >([]);

  const ticks = [];

  for (let i = maxLogSize; i >= minLogSize; i--) {
    ticks.push(i);
  }

  const defaultIntervalHeight = 75;
  const expandedIntervalHeight = 750;

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

  const cumulativeHeights = [0];

  intervals.forEach((interval, index) => {
    cumulativeHeights.push(cumulativeHeights[index] + interval.height);
  });

  const scaleHeight = cumulativeHeights[cumulativeHeights.length - 1];

  const tickPositions: { [key: number]: number } = {};

  ticks.forEach((tick, index) => {
    tickPositions[tick] = cumulativeHeights[index];
  });

  function minorTicksBetween(startTick: number, endTick: number) {
    const minorTicks = [];
    const step = 0.1;
    let t = startTick - step;
    while (t > endTick + 1e-6) {
      minorTicks.push(Number(t.toFixed(1)));

      t -= step;
    }
    return minorTicks;
  }

  const [firstSelectedItem, setFirstSelectedItem] = useState<Data | null>(null);
  const [secondSelectedItem, setSecondSelectedItem] = useState<Data | null>(
    null,
  );

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

          {intervals.map(interval => {
            const startPosition = tickPositions[interval.startTick];

            const intervalTop = startPosition;
            const intervalHeight = interval.height;

            const intervalMiddle = intervalTop + intervalHeight / 2;

            if (interval.isExpanded) {
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

          {logData.map(item => {
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
}

import React from 'react';
import { generateSlug } from '@/helpers/slug';
import styles from './timeline.module.css';

interface TimelineEvent {
  label: string;
  year: number;
}

interface TimelineProps {
  events: TimelineEvent[];
  scale: number;
  scaleText: string;
  title: string;
}

const sortTimeline = (timeline: TimelineEvent[]): TimelineEvent[] => {
  return [...timeline].sort((a, b) => b.year - a.year);
};

export const Timeline: React.FC<TimelineProps> = ({
  events,
  scale,
  scaleText,
  title,
}) => {
  const sortedEvents = sortTimeline(events);

  const height =
    (-sortedEvents.slice(-1)[0].year - -sortedEvents[0].year) / scale;

  const calculateTop = (year: number) => {
    return (-year - -sortedEvents[0].year) / scale;
  };

  const handleNext = (label: string) => {
    const slug = generateSlug(label);
    const el = document.getElementById(slug);

    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.timelineWrapper}>
      <h2>{title}</h2>
      <p className={styles.scale}>Scale: {scaleText}</p>

      <div className={styles.timeline} style={{ height: `${height}px` }}>
        <div className={styles.line} />
        <div className={styles.labels}>
          {sortedEvents.map((event, index) => (
            <div
              className={styles.event}
              id={generateSlug(event.label)}
              key={event.label}
              style={{ top: `${calculateTop(event.year)}px` }}
            >
              <span className={styles.dash}>—</span> {event.label}{' '}
              <span className={styles.years}>
                ({event.year > 0 ? event.year : `${event.year} BCE`})
              </span>
              {index < sortedEvents.length - 1 && (
                <button
                  className={styles.nextButton}
                  onClick={() => handleNext(sortedEvents[index + 1].label)}
                >
                  [Next]
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

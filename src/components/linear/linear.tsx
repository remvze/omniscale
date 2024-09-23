import { Container } from '../container';

import styles from './linear.module.css';

type Data = {
  color: string;
  name: string;
  size: number;
  unit: string;
};

const data: Array<Data> = [
  {
    color: '#f97316',
    name: 'Milky Way Galaxy',
    size: 100000 * 9.461e15, // 100,000 light-years in meters
    unit: 'meters',
  },
  {
    color: '#3b82f6',
    name: 'Local Group',
    size: 10e6 * 9.461e15, // 10 million light-years in meters
    unit: 'meters',
  },
  {
    color: '#facc15',
    name: 'Virgo Supercluster',
    size: 110e6 * 9.461e15,
    // 110 million light-years in meters
    unit: 'meters',
  },
  {
    color: '#6b7280',
    name: 'Laniakea Supercluster',
    size: 500e6 * 9.461e15, // 500 million light-years in meters
    unit: 'meters',
  },
];

export function Linear() {
  const universeSize = 93e9 * 9.461e15;
  const earthSize = 12742e3;
  const sunSize = 1.39e9;
  const solarSystemSize = 1.5e13;
  const factor = 4_000_000_000_000;

  const height = universeSize / earthSize / factor;

  return (
    <Container>
      <div className={styles.wrapper}>
        <div
          className={styles.scale}
          style={{
            height: height,
          }}
        >
          <div className={styles.object} style={{ height: 1, zIndex: 20 }} />

          <div
            className={styles.object}
            style={{
              background: '#16a34a',
              height: (sunSize / earthSize / factor) * 200_000_000_000,
              zIndex: 19,
            }}
          />

          <div
            className={styles.object}
            style={{
              background: '#4f46e5',
              height: (solarSystemSize / earthSize / factor) * 40_000_000,
              zIndex: 18,
            }}
          />

          {data.map((object, index) => (
            <div
              className={styles.object}
              key={index}
              style={{
                background: object.color,
                height: object.size / earthSize / factor,
                zIndex: data.length - index,
              }}
            />
          ))}
        </div>

        <div className={styles.labels}>
          <div className={styles.label}>
            <div className={styles.color} />

            <span className={styles.name}>
              Earth <span>x{factor.toLocaleString()}</span>
            </span>
          </div>

          <div className={styles.label}>
            <div className={styles.color} style={{ background: '#16a34a' }} />

            <span className={styles.name}>
              Sun <span>x200,000,000,000</span>
            </span>
          </div>

          <div className={styles.label}>
            <div className={styles.color} style={{ background: '#4f46e5' }} />

            <span className={styles.name}>
              Solar System <span>x40,000,000</span>
            </span>
          </div>

          {data.map(object => (
            <div className={styles.label} key={object.name}>
              <div
                className={styles.color}
                style={{ background: object.color }}
              />

              <span className={styles.name}>{object.name}</span>
            </div>
          ))}

          <div className={styles.label}>
            <div
              className={styles.color}
              style={{ background: 'var(--color-neutral-200)' }}
            />

            <span className={styles.name}>Observable Universe</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

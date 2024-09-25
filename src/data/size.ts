export function formatSize(sizeInMeters: number): string {
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

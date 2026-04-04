import { useEffect, useState } from 'react';

export const useCounterAnimation = (
  targetValue: number,
  duration: number = 1500
) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const steps = 30;
    const stepDuration = duration / steps;
    const increment = targetValue / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(targetValue);
        clearInterval(interval);
      } else {
        setDisplayValue(Math.round(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [targetValue, duration]);

  return displayValue;
};

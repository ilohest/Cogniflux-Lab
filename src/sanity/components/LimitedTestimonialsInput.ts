import React from 'react';
import { ArrayOfObjectsInput, type ArrayInputFunctionsProps, type ArrayOfObjectsInputProps } from 'sanity';

const MAX_TESTIMONIALS = 10;

const messageStyle: React.CSSProperties = {
  border: '1px solid var(--card-border-color)',
  borderRadius: 6,
  color: 'var(--card-muted-fg-color)',
  fontSize: 13,
  lineHeight: 1.4,
  padding: '12px 14px',
};

const disabledControlsStyle: React.CSSProperties = {
  opacity: 0.45,
  pointerEvents: 'none',
};

const MaxTestimonialsMessage = (props: ArrayInputFunctionsProps<{ _key: string }, any>) => {
  if ((props.value?.length || 0) < MAX_TESTIMONIALS) {
    return React.createElement(React.Fragment, null, props.children);
  }

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('div', { 'aria-disabled': true, style: disabledControlsStyle }, props.children),
    React.createElement('div', { style: messageStyle }, `Maximum ${MAX_TESTIMONIALS} testimonials reached.`),
  );
};

export const LimitedTestimonialsInput = (props: ArrayOfObjectsInputProps) => {
  const isAtMax = (props.value?.length || 0) >= MAX_TESTIMONIALS;

  return React.createElement(ArrayOfObjectsInput, {
    ...props,
    arrayFunctions: isAtMax ? MaxTestimonialsMessage : props.arrayFunctions,
  });
};

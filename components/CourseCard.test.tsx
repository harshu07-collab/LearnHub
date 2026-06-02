import { render, screen } from '@testing-library/react';
import CourseCard from './CourseCard';
import React from 'react';

describe('CourseCard', () => {
  it('renders title and progress', () => {
    render(<CourseCard id="test-1" title="Test Course" progress={75} />);
    expect(screen.getByText('Test Course')).toBeInTheDocument();
    expect(screen.getByText('75%')).toBeInTheDocument();
  });
});

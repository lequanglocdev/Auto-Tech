import React from 'react';
import { render, screen } from '@testing-library/react';
import HeaderTop from './HeaderTop';

test('renders HeaderTop with span elements', () => {
    render(<HeaderTop />);

    // Kiểm tra xem có đúng 2 thẻ <span> trong component
    const spans = screen.getAllByText(/.+/); 
    expect(spans).toHaveLength(2); 
});

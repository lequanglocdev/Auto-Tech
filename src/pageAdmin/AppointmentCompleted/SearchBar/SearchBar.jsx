import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text size='lg'><FaSearch /></InputGroup.Text>
            <Form.Control
                placeholder="Search by customer name"
                value={searchTerm}
                onChange={handleInputChange}
                size='lg'
            />
        </InputGroup>
    );
};

export default SearchBar;

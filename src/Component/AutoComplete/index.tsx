/* eslint-disable no-unused-vars */
import React from 'react';

import { Form, ListGroup } from 'react-bootstrap';

interface Props {
    value: string,
    options: string[],
    placeholder : string,
    onInputChange : (value : string) => void,
    onChange : (value : string) => void
}
export default function Autocomplete({ value,options,placeholder, onInputChange,onChange }: Props) {
    const [filteredOptions, setFilteredOptions] = React.useState<string[]>([]);
    const handleInputChange = (value : string) => {
        // const value = e.target.value;
        onInputChange(value);
    
        // Filter options based on input value
        const filtered = options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        );
    
        setFilteredOptions(filtered);
      };

    const handleOptionClick = (option: string) => {
        onChange(option);
        setFilteredOptions([]); // Hide dropdown after selection
    };

    return (
        <Form.Group controlId="formAutocomplete">
            <Form.Control
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => handleInputChange(e.target.value)}
                onFocus={(e) => handleInputChange(e.target.value)}
                onBlur={() => {
                    setTimeout(() => {
                        setFilteredOptions([]);
                    }, 100);
                }}
            />
            {filteredOptions.length > 0 && (
                <ListGroup className="autocomplete-dropdown">
                    {filteredOptions.map((option, index) => (
                        <ListGroup.Item
                            key={index}
                            action
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Form.Group>
    );
};

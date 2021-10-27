// TS incorrectly flags function declarations as unused variables
/* eslint-disable no-unused-vars */
import React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    SelectChangeEvent,
} from '@mui/material';

interface ProductVariantSelectProps {
    value: string;
    id: string;
    label: string;
    onChangeHandler(event: SelectChangeEvent<string>): void;
    valueList: string[];
}

const ProductVariantSelect: React.FC<ProductVariantSelectProps> = ({
    value,
    id,
    label,
    onChangeHandler,
    valueList,
}) => {
    return (
        <FormControl fullWidth sx={{ mr: 2 }} required>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value}
                label={label}
                onChange={onChangeHandler}
            >
                {valueList.map((v) => (
                    <MenuItem key={v} value={v}>
                        {v}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default ProductVariantSelect;

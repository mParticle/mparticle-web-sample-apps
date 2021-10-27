import React from 'react';
import { Container } from '@mui/material';

const Page: React.FC = ({ children }) => {
    return <Container maxWidth='lg'>{children}</Container>;
};

export default Page;

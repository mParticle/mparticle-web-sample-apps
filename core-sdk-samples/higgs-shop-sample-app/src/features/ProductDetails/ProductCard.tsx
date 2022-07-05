import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import theme from '../../contexts/theme';

interface ProductCardProps {
    id: string;
    label: string;
    altText: string;
    imageUrl: string;
    testId: string;
}
const ProductCard: React.FC<ProductCardProps> = ({
    id,
    label,
    altText,
    imageUrl,
    testId,
}) => {
    return (
        <Card sx={{ minWidth: 343, maxWidth: 566 }}>
            <CardActionArea
                component={Link}
                to={`/products/${id}`}
                data-testid={testId}
                sx={{
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <CardMedia
                    component='img'
                    height='361'
                    image={process.env.PUBLIC_URL + imageUrl}
                    alt={altText}
                />
                <CardContent
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography variant='h6'>{label}</Typography>
                    <ArrowForward sx={{ color: '#FFFFFF' }} />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ProductCard;

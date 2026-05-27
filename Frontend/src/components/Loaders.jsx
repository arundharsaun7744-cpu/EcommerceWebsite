import { Skeleton, Box } from '@mui/material';

/**
 * Skeleton loader for product cards
 */
export const ProductCardSkeleton = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Skeleton variant="rectangular" width="100%" height={160} sx={{ mb: 2 }} />
      <Skeleton width="80%" />
      <Skeleton width="100%" />
      <Skeleton width="60%" />
      <Skeleton width="40%" />
    </Box>
  );
};

/**
 * Skeleton loader grid
 */
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        p: 3,
      }}
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </Box>
  );
};

/**
 * Skeleton loader for product detail
 */
export const ProductDetailSkeleton = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={400} />
        <Box>
          <Skeleton width="100%" height={40} sx={{ mb: 2 }} />
          <Skeleton width="80%" height={30} sx={{ mb: 2 }} />
          <Skeleton width="60%" height={30} sx={{ mb: 3 }} />
          <Skeleton width="100%" height={100} sx={{ mb: 2 }} />
          <Skeleton width="150px" height={50} />
        </Box>
      </Box>
    </Box>
  );
};

import type { SxProps, Theme } from '@mui/material';

export const styles: Record<string, SxProps<Theme>> = {
  card: {
    width: '100%',
    borderRadius: 3,
    overflow: 'hidden',
    transition: 'transform 0.2s ease',

    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 5,
    },
  },

  image: {
    width: '100%',
    height: 200,
    objectFit: 'cover',
  },

  imagePlaceholder: {
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey.100',
  },

  content: {
    padding: 2,
  },
};
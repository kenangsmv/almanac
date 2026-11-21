import { Link as RouterLink } from 'react-router-dom';
import { Box, Skeleton, Typography } from '@mui/material';
import { Eyebrow } from '../../components/Eyebrow';

export interface TeaserCardProps {
  to: string;
  index: string;
  pill: string;
  eyebrow: string;
  headline: string;
  description: string;
  background: string;
  image?: string;
  loading?: boolean;
}

export function TeaserCard({
  to,
  index,
  pill,
  eyebrow,
  headline,
  description,
  background,
  image,
  loading,
}: TeaserCardProps) {
  return (
    <Box
      component={RouterLink}
      to={to}
      sx={{
        position: 'relative',
        display: 'block',
        height: { xs: 440, md: 600 },
        borderRadius: 3,
        overflow: 'hidden',
        textDecoration: 'none',
        color: 'text.primary',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
        transition: 'transform .45s cubic-bezier(.2,.7,.2,1), box-shadow .45s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow:
            '0 40px 80px rgba(124, 168, 255, 0.18), 0 20px 40px rgba(0, 0, 0, 0.6)',
        },
        '&:hover .teaser-arrow': { transform: 'translateX(8px)' },
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {image && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("${image}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      )}
      {loading && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ position: 'absolute', inset: 0, height: '100%', bgcolor: 'rgba(255, 255, 255, 0.06)' }}
        />
      )}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(8,11,20,.55) 0%, rgba(8,11,20,.05) 32%, rgba(8,11,20,.55) 62%, rgba(8,11,20,.96) 100%)',
        }}
      />
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          p: 3.5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 11,
            letterSpacing: '0.25em',
          }}
        >
          <span>{index}</span>
          <Box
            component="span"
            sx={{
              border: '1px solid rgba(245, 245, 245, 0.4)',
              px: 1.25,
              py: 0.5,
              borderRadius: 99,
              bgcolor: 'rgba(8, 11, 20, 0.35)',
              textTransform: 'uppercase',
            }}
          >
            {pill}
          </Box>
        </Box>
        <Box>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Typography
            variant="h4"
            sx={{
              mt: 1,
              mb: 1.5,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {headline}
          </Typography>
          <Typography variant="body2" sx={{ color: '#e3e5e9', mb: 2.5 }}>
            {description}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              pt: 2,
              borderTop: '1px solid rgba(245, 245, 245, 0.25)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.08em',
            }}
          >
            EXPLORE MORE
            <Box component="span" className="teaser-arrow" sx={{ transition: 'transform .4s' }}>
              →
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

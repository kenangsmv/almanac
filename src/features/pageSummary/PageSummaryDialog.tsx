import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Link,
  Skeleton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AsyncState } from '../../components/AsyncState';
import { usePageSummary } from './usePageSummary';

interface PageSummaryDialogProps {
  title: string | null;
  onClose: () => void;
}

const loading = (
  <>
    <Skeleton variant="rectangular" height={180} />
    <Skeleton />
    <Skeleton />
    <Skeleton width="80%" />
  </>
);

export function PageSummaryDialog({ title, onClose }: PageSummaryDialogProps) {
  const query = usePageSummary(title);

  return (
    <Dialog open={title != null} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pr: 6 }}>
        {title}
        <IconButton
          onClick={onClose}
          aria-label="Close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <AsyncState query={query} loading={loading}>
          {(page) => (
            <Box>
              {page.thumbnail && (
                <Box
                  component="img"
                  src={page.thumbnail.source}
                  alt=""
                  sx={{ width: '100%', borderRadius: 1, mb: 2, display: 'block' }}
                />
              )}
              <Typography variant="body2">{page.extract}</Typography>
              <Link
                href={page.content_urls.desktop.page}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ display: 'inline-block', mt: 2 }}
              >
                Read more on Wikipedia
              </Link>
            </Box>
          )}
        </AsyncState>
      </DialogContent>
    </Dialog>
  );
}

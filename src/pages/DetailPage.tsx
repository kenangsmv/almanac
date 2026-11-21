import { DetailLayout } from '../features/detail/DetailLayout';
import { HistoryView } from '../features/detail/HistoryView';
import { SkyView } from '../features/detail/SkyView';
import { WeatherView } from '../features/detail/WeatherView';
import type { DetailView } from '../features/detail/views';

interface DetailPageProps {
  view: DetailView;
}

const VIEWS = {
  sky: SkyView,
  weather: WeatherView,
  history: HistoryView,
};

export function DetailPage({ view }: DetailPageProps) {
  const View = VIEWS[view];

  return (
    <DetailLayout>
      <View />
    </DetailLayout>
  );
}

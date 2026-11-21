import { onThisDayCategoryQuery, useOnThisDayCategory } from './useOnThisDayCategory';

export function onThisDaySelectedQuery(date: string) {
  return onThisDayCategoryQuery('selected', date);
}

export function useOnThisDaySelected(date: string) {
  return useOnThisDayCategory('selected', date);
}

import { LoadingBar } from 'react-redux-loading-bar';
import { useAppSelector } from '../../states/hooks';

function Loading() {
  const loading = useAppSelector((state) => state.loadingBar.default ?? 0);

  return (
    <div className="loading">
      <LoadingBar loading={loading} className="loading__bar" />
    </div>
  );
}

export default Loading;
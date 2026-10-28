import { LoadingBar } from 'react-redux-loading-bar';
import { useAppSelector } from '../../states/hooks';

function Loading() {
  const loading = useAppSelector((state) => state.loadingBar.default ?? 0);

  return (
    <div className="fixed-top" style={{ zIndex: 1080 }}>
      <LoadingBar loading={loading} className="loading-bar" />
    </div>
  );
}

export default Loading;

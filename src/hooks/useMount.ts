import useEffectOnce from './useEffectOnce';

const useMount = (fn: () => void): void => {
  useEffectOnce(() => {
    fn();
  });
};

export default useMount;

function LoadingSkeleton({ num, styles = {} }) {
  const skeletons = [];
  for (let i = 0; i < num; i++) {
    skeletons.push(
      <div key={i} className="skeleton animate-pulse" style={styles}></div>
    );
  }
  return skeletons;
}

export default LoadingSkeleton;

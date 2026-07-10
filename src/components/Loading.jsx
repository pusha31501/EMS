const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin size-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      <span className="mt-4 block animate-pulse">Loading....</span>
    </div>
  );
};

export default Loading;

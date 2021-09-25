
const LoadingOverlay = () => {
  return (
    <div className="absolute top-0 left-0 z-50 flex flex-col items-center justify-center flex-1 w-full h-full bg-default-150">
      <div className="flex items-end animate-pulse">
        <h1 className="text-4xl text-default-900">Loading</h1>
        <svg className="ml-1 w-1.5 h-1.5 text-4xl fill-current text-default-900 animate-bounce animate-pulse" viewBox="-2 -1.5 24 24" preserveAspectRatio="xMinYMin">
          <path d="M10 20.565c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"></path>
        </svg>
        <svg className=" animation-delay-75 w-1.5 h-1.5 text-4xl fill-current text-default-900 animate-bounce animate-pulse" viewBox="-2 -1.5 24 24" preserveAspectRatio="xMinYMin">
          <path d="M10 20.565c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"></path>
        </svg>
        <svg className=" animation-delay-150 w-1.5 h-1.5 text-4xl fill-current text-default-900 animate-bounce animate-pulse" viewBox="-2 -1.5 24 24" preserveAspectRatio="xMinYMin">
          <path d="M10 20.565c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"></path>
        </svg>
      </div>
    </div>
  )
}

export default LoadingOverlay

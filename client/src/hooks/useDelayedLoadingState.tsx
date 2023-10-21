import { useState, useEffect } from "react"

/**
 * Custom hook to control the delayed display of a loading state, such as a Spinner or SpinnerOverlay
 *
 * @param isLoading - A boolean for the loading state.
 * @param delayTime - The delay time in milliseconds before showing the overlay when `isLoading` is true.
 *
 * @returns showLoadingState - A boolean value that determines whether the loading state should be displayed.
 *
 * This hook is useful for preventing the loading state from flashing for very short loading times.
 * It introduces a delay before displaying the overlay when `isLoading` is true, improving user experience.
 *
 * Example usage:
 *
 * ```jsx
 * const isLoading = true; // or false based on loading state
 * const show = useDelayedLoadingState(isLoading, 100); // Adjust the delay time as needed
 *
 * return (
 *   <>
 *     {show && <SpinnerOverlay label="Connecting" />}
 *   </>
 * );
 * ```
 */
const useDelayedLoadingState = (
  isLoading: boolean,
  delayTime: number
): boolean => {
  const [showLoadingState, setShowLoadingState] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined

    if (isLoading) {
      timeoutId = setTimeout(() => {
        setShowLoadingState(true)
      }, delayTime)
    } else {
      setShowLoadingState(false)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [isLoading, delayTime])

  return showLoadingState
}

export default useDelayedLoadingState

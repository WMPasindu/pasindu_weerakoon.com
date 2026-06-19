import { useScrollProgress } from '@/hooks/useScrollProgress'

/** Slim gradient bar pinned to the top edge that tracks reading progress. */
export function ScrollProgressBar() {
  const progress = useScrollProgress()
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress__bar"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  )
}

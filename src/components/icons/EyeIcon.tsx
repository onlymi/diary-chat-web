interface EyeIconProps {
  hidden: boolean
}

function EyeIcon({ hidden }: EyeIconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {hidden ? (
        <>
          <path d="m3 3 18 18" />
          <path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" />
          <path d="M9.9 4.2A10.6 10.6 0 0 1 12 4c5.5 0 9 5.2 9 5.2a13.5 13.5 0 0 1-2.1 2.6M6.6 6.6A14.9 14.9 0 0 0 3 9.2s3.5 5.2 9 5.2c1.2 0 2.3-.2 3.2-.6" />
        </>
      ) : (
        <>
          <path d="M3 12s3.5-5.2 9-5.2 9 5.2 9 5.2-3.5 5.2-9 5.2S3 12 3 12Z" />
          <circle cx="12" cy="12" r="2.3" />
        </>
      )}
    </svg>
  )
}

export default EyeIcon

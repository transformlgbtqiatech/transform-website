type Props = {
  svgProps?: React.SVGProps<SVGSVGElement>;
  keepFillColor?: boolean;
};

export const EyeIcon = (props: Props) => {
  const { svgProps, keepFillColor = true } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_3"
      data-name="Layer 3"
      viewBox="0 0 96.19 96.19"
      {...svgProps}
    >
      {keepFillColor ? (
        <defs>
          <style dangerouslySetInnerHTML={{ __html: ".cls-1{fill:#420a11}" }} />
        </defs>
      ) : null}
      <path
        d="M44.97 33.49c8.67-.96 17.83 1.93 24.08 8.09 5.51 5.43 6.23 7.59 1.45 13.77-9.32 12.06-24.85 15.45-37.61 6.44C30.36 60 22.04 51.43 22.54 48.46c.2-1.17 4.81-6.39 6-7.47 4.43-4.03 10.46-6.83 16.43-7.49Zm2.99 3.13c-15.23.49-14.65 25.56 2.92 23.02 12.88-1.87 11.87-23.49-2.92-23.02Zm-9.6 1.61c-3.2.21-12.79 8.02-12.87 10.71-.03.95 2.42 4.48 3.16 5.43 8.17 10.43 23.47 13.32 34.26 5.03 1.98-1.52 7.86-7.83 8.28-10.09.47-2.47-9.32-11.15-12.59-11.08 7.23 7.6 4.5 20.32-5.64 23.48-14.32 4.47-24.85-12.49-14.6-23.48Z"
        className="cls-1"
        fill="currentColor"
      />
      <path
        d="M42.04 48.66c5.21.72 7.09-1.79 5.83-6.76 16.17 3.22-.15 22.05-5.83 6.76Z"
        className="cls-1"
        fill="currentColor"
      />
    </svg>
  );
};

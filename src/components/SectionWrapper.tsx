interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  scrollTargetId?: string;
  scrollDirection?: 'up' | 'down';
  showIndicatorOnMobile?: boolean;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  children,
  className = '',
  maxWidth = 'max-w-screen-2xl',
}) => {
  return (
    <section
      id={id}
      className={`min-h-screen w-full flex flex-col items-center justify-start md:justify-center pt-32 pb-20 px-6 md:px-12 lg:px-16 overflow-hidden relative ${className}`}
    >
      <div
        className={`w-full ${maxWidth} mx-auto flex-1 flex flex-col justify-center`}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;

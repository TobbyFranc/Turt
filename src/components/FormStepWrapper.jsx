const FormStepWrapper = ({ title, children }) => (
  <div className="space-y-8 animate-fade-in">
    {title && (
      <h2 className="text-xl font-semibold text-[var(--primaryColor)] text-center">
        {title}
      </h2>
    )}
    {children}
  </div>
);

export default FormStepWrapper;

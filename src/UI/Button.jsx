function Button({ children, style, onClick }) {
  const mainStyle = 'px-5 py-2 md:px-8 md:py-4';

  const otherStyle = 'px-2 py-1 md:px-4 md:py-2';

  const fullStyle =
    'flex items-center justify-center rounded-lg bg-amber-300 font-semibold hover:bg-amber-400 ';

  return (
    <button
      onClick={onClick}
      className={fullStyle + (style === 'main' ? mainStyle : otherStyle)}
    >
      <p>{children}</p>
    </button>
  );
}

export default Button;

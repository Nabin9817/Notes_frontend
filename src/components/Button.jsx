export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", // primary, secondary, danger, outline
  className = "",
  disabled = false 
}) {
  
  const baseStyles = "px-6 py-2.5 rounded-xl font-bold transition-all duration-200 active:scale-95 disabled:opacity-50";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200",
    secondary: "bg-gray-800 text-white hover:bg-black",
    danger: "bg-red-500 text-white hover:bg-red-600",
    outline: "border-2 border-gray-200 text-gray-600 hover:border-blue-500 hover:text-blue-600"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
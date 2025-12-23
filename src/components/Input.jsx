export default function Input({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  error = "" 
}) {
  return (
    <div className="w-full mb-4">
      {label && <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full p-4 border-2 rounded-2xl outline-none transition-all ${
          error ? "border-red-400 focus:border-red-500" : "border-gray-100 focus:border-blue-500"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</p>}
    </div>
  );
}
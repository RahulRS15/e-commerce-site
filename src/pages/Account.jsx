function Account() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">My Account</h1>
      
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <div className="flex flex-col items-center">
          <div className="text-center mb-6">
            <h2 className="text-lg text-gray-600 mb-4">Created by:</h2>
            <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
              <img
                src="https://avatars.githubusercontent.com/u/1234567?v=4"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold">Carlos Eduardo Chavarria Centeno</h3>
            <a
              href="https://github.com/EdCenten0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center justify-center mt-2"
            >
              @EdCenten0 👋
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
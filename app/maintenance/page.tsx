import { FaTools } from 'react-icons/fa';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <div className="mb-8">
          <FaTools className="mx-auto h-16 w-16 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Under Maintenance
        </h1>
        <p className="text-gray-600 mb-6">
          We're currently performing scheduled maintenance to improve our services. 
          We'll be back shortly. Thank you for your patience.
        </p>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            Estimated completion time: 1 week
          </p>
        </div>
      </div>
    </div>
  );
} 
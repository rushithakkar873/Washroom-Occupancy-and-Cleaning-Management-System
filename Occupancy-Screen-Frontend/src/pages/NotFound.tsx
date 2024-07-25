import { Button } from '@/components/ui/button'; 
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Oops! We can't find that page.</p>
        <p className="mt-2 text-gray-500">Unfortunately, the page you were looking for does not exist.</p>
        <Button  
          className="mt-6"
          onClick={() => navigate('/')}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default NotFound;
